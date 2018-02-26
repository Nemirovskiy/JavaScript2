// кол-во покемонов = целое от высота экрана / 120 px
// выведем 9 колонок, кол-во строк - 2 высоты экрана
var pokeCount = parseInt( window.innerHeight / 120 * 2) * 9;
var pokePage = 0;
var employed = false;
// не понял как можно удалить eventLister метод указанный
// в разных местах - вынес функцию отдельно
function info() {
    // проверяем есть ли блок информации
    // если нет  - добавляем и посылаем запрос
	var flag = false;
    for (var i = 0; i < this.children.length; i++) {
		if(this.children[i].className == 'info'){
            flag = true;
		}
		// если есть блок ошибок - убераем его
		else if(this.children[i].className == 'infoErr'){
            this.children[i].remove();
		}
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
                    elem.removeEventListener('click', info);
                    // вот тут хотел убирать метод info объекта PokeItem
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
function PokeItem() {
    this.render = function() {
        var item = document.createElement('li');
        item.id = this.id;
        var pokeName = document.createElement('p');
        pokeName.innerText = this.name;
        pokeName.style.lineHeight = '20px';
        var pokeImg = document.createElement('img');
        pokeImg.alt = this.name;
        pokeImg.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + this.id + '.png';
        item.appendChild(pokeName);
        item.appendChild(pokeImg);
        item.addEventListener('click', info);
        return item;
    }
}

function getPocemons() {
    // поставим флаг занято, что б одновременно не было несколько запросов
	employed = true;
	// выполнить только в первый раз
	if(pokePage == 0){
        var ul = document.createElement('ul');
        var err = document.createElement('span');
        var loading = document.createElement('li');
        var body = document.body;
        ul.id = 'pokeList';
        err.id = 'error';
        ul.className = 'pokeList';
        // заставка
        loading.innerText = 'Загружаю...';
        loading.className = 'loading';
        ul.appendChild(loading);
        ul.style.width = (96 * 9) + 'px';
        body.appendChild(ul);
        body.appendChild(err);
	}
	else{
		var ul = document.getElementById('pokeList');
		var err = document.getElementById('error');
	}
	var xhr = new XMLHttpRequest();
	xhr.open('GET',"https://pokeapi.co/api/v2/pokemon/" +
		"?offset=" + (pokeCount * pokePage++) + "&limit=" + pokeCount);
	xhr.timeout = 5000;
	xhr.ontimeout = function(){
	    err.innerText = 'Время вышло!';
        // время запроса вышло - снимаем флаг занято
        employed = false;
	};
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200){
	          JSON.parse(xhr.responseText).results.forEach(
					function(item){
						var poke = new PokeItem();
						poke.id = item.url.slice(34,-1);
						poke.name = item.name;
						// если есть заставка - уберем её
						if(loading) loading.remove();
						ul.appendChild(poke.render());
                        err.innerText = '';
                    }
				);
	        }
	      else err.innerText = 'ошибка запроса';
			// запрос окончен - снимаем флаг занято
            employed = false;
	    }
	}
}

window.onscroll = function () {
    // подгузим ещё 2 экрана пока просматривается предпоследний экран
	if (window.scrollY >= document.body.offsetHeight - window.innerHeight + 120 - (parseInt(pokeCount / 9)*120)){
        if(!employed) getPocemons();
	}
}