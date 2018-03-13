$(document).ready(function () {
    var button = document.getElementById('button');
    button.addEventListener('click',validate);
});
function validate(event) {
	var inpName = document.getElementById('name');
	var inpPhone = document.getElementById('phone');
	var inpMail = document.getElementById('mail');
	var inpText = document.getElementById('text');
	var err = document.getElementById('error');

	err.innerText = "";

	if(!/[а-яА-ЯёЁ\w]{2,20}/.test(inpName.value)){
		inpName.className = "error";
		err.innerText += "В поле имя должны быть буквы!\n";
        $("#name").effect("pulsate", 3000);
	}
	else inpName.className = "";
	if(!/\+7\(\d{3}\)\d{3}-\d{4}/.test(inpPhone.value)){
		inpPhone.className = "error";
		err.innerText += "Телефон не в формате +7(900)111-2222!\n";
        $("#phone").effect("pulsate", 3000);
	}
	else inpPhone.className = "";
	if(!/[\w\d\.-]{2,20}@[\w]+\.(ru|com|net)/.test(inpMail.value)){
		inpMail.className = "error";
		err.innerText += "Не правильно указана почта!\n";
        $("#mail").effect("pulsate", 3000);
	}
	else inpMail.className = "";
	if(!/[а-яА-ЯёЁ\w]{2,}/.test(inpText.value)){
		inpText.className = "error";
		err.innerText += "Не заполнен текст!\n";
        $("#text").effect("pulsate", 3000);
	}
	else inpText.className = "";

	if(err.innerText != "") event.preventDefault();

	if($("#error").text() != '') $("#error").dialog({
		closeText: "Закрыть",
		close: function () {
			$("form *").removeClass("error");
        }
	});
}
