var body = document.body;
var str = "Тима: 'Привет, Костик'\nКостик: 'Салют, Тима! Пойдем в мою комнату быстрее!'\nТима: 'Ну, показывай, показывай нового любимца!'\nКостик: 'Вот, знакомься. Его зовут Асус.'\nТима: 'Египтянин, что ли?'\nКостик: 'Шутник ты, Тимофей. Китайская сборка.'\nТима: 'И что он умеет делать?'\nКостик:'Ну, принимать флешки, выходить в Интернет. Вообще, он умеет все, что умеет любой компьютер.'\nТима: 'А веб-камера у него есть?'\nКостик:'Ага. Буду теперь с Витькой из Питера переговариваться. А еще с Волгоградом, с дядей и бабушкой.'\nТима: 'А играть в игры на нем можно?'\nКостик:'Можно, в любые. И по сети можно. У него мощный процессор и три гигабайта оперативной памяти.'\nТима: 'Это много?'\nКостик: 'Это нормально. Хватит на все. Давай сейчас «Мир танков» запустим и посмотришь.'\nТима: 'Давай, я только за.'\n";

var output1 = document.getElementById('unit1');
output1.innerText += "Начальный текст\n\n";
output1.innerText += str;
output1.innerText += "\nОбработанный текст\n\n";
output1.innerText += str.replace(/(.)?'(.)?/g,"$1\"$2");

var button = document.getElementById('button');

button.addEventListener('click',validate);
function validate() {
	var inpName = document.getElementById('name');
	var inpPhone = document.getElementById('phone');
	var inpMail = document.getElementById('mail');
	var inpText = document.getElementById('text');
	var err = document.getElementById('error');

	err.innerText = "";

	if(!/[а-яА-ЯёЁ\w]{2,20}/.test(inpName.value)){
		inpName.className = "error";
		err.innerText += "Не заполнено Имя!\n";
	}
	else inpName.className = "";
	if(!/\+7\(\d{3}\)\d{3}-\d{4}/.test(inpPhone.value)){
		inpPhone.className = "error";
		err.innerText += "Не заполнено Телефон!\n";
	}
	else inpPhone.className = "";
	if(!/[\w\d\.-]{2,20}@[\w]+\.(ru|com|net)/.test(inpMail.value)){
		inpMail.className = "error";
		err.innerText += "Не заполнено Почта!\n";
	}
	else inpMail.className = "";
	if(!/[а-яА-ЯёЁ\w]{2,}/.test(inpText.value)){
		inpText.className = "error";
		err.innerText += "Не заполнено Текст!\n";
	}
	else inpText.className = "";
}
