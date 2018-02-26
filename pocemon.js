// кол-во покемонов = целое от высота экрана / 120 px
var pokeCount = parseInt( window.innerHeight / 120 * 2) * 9;
var pokePage = 0;
var employed = false;
function PokeItem() {
    this.render = function() {
        var item = document.createElement('li');
        item.id = this.id;
        var pokeName = document.createElement('p');
        pokeName.innerText = this.name;
        pokeName.style.lineHeight = '20px';
        var pokeImg = document.createElement('img');
        pokeImg.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + this.id + '.png';
        item.appendChild(pokeName);
        item.appendChild(pokeImg);
        var detail = new PokeDetail();
        detail.id = this.id;
        item.addEventListener('click', detail.info);
        return item;
    }
}
function PokeDetail() {
	this.info = function () {
		// проверяем есть ли блок информации
		// если нет  - добавляем и посылаем запрос
        for (var i = 0; i < this.children.length; i++) {
            console.log(this.children[i].className == 'info');
            var flag = this.children[i].className == 'info';
        }
        if (!flag) {
            this.style.cursor = 'wait';
            var detail = document.createElement('span');
            this.appendChild(detail);
			var elem = this;
			var xhr = new XMLHttpRequest();
			xhr.open('GET', "https://pokeapi.co/api/v2/pokemon/" + this.id);
			xhr.timeout = 5000;
			xhr.ontimeout = function () {
				detail.className = 'infoErr';
				detail.innerText = 'Время вышло!\n попробуйте ещё раз';
				elem.style.cursor = '';
			};
			xhr.send();
			xhr.onreadystatechange = function () {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200) {
						var result = JSON.parse(xhr.responseText);
						detail.innerText = 'id: ' + result.id + '\n weight: ' + result.weight + '\n height: ' +
							result.height + '\n moves: ' + result.moves.length;
                        detail.className = 'info';
						elem.style.cursor = '';
					}
					else {
                        detail.className = 'infoErr';
                        detail.innerText = 'Не получилось!\n попробуйте ещё раз';
                        elem.style.cursor = '';
					}
				}
			}
		}
    }
}

function getPocemons() {
	employed = true;
	if(pokePage == 0){
        var ul = document.createElement('ul');
        var err = document.createElement('span');
        var body = document.body;
        ul.id = 'pokeList';
        err.id = 'error';
        ul.className = 'pokeList';
        ul.style.width = (96 * 9) + 'px';
        body.appendChild(ul);
        body.appendChild(err);
	}
	else{
		var ul = document.getElementById('pokeList');
		var err = document.getElementById('error');
	}
	var xhr = new XMLHttpRequest();
	//https://pokeapi.co/api/v2/pokemon/?offset=20&limit=50
	xhr.open('GET',"https://pokeapi.co/api/v2/pokemon/" +
		"?offset=" + (pokeCount * pokePage++) + "&limit=" + pokeCount);
	xhr.timeout = 5000;
	xhr.ontimeout = function(){err.innerText = 'Время вышло!'};
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200){
	          var arr = JSON.parse(xhr.responseText);
	          arr.results.forEach(
					function(item){
						var poke = new PokeItem();
						poke.id = item.url.slice(34,-1);
						poke.name = item.name;
						var pokeLi = poke.render();
						ul.appendChild(pokeLi);
                        err.innerText = '';
                    }
				);
	        }
	      else err.innerText = '\n ошибка запроса';
            employed = false;
	    }
	}

}

window.onscroll = function () {
	if (window.scrollY >= document.body.offsetHeight - window.innerHeight + 120 - (parseInt(pokeCount / 9)*120)){
        if(!employed) getPocemons();
	}
}