// установки
var control = '#control';   // контролируемый список вкладок
var text = '#detail';         // список с описанием
var number = 3;             // активная вкадка при загрузке страницы

$(document).ready(function () {
    // если номер активной вкладки больше чем вкладок - установим 1
    number = (number >= $(control).children().length) ? 1 : number-1;
    // находим указанную вкладку и устанавливаем активность
    $($(control).children()[number]).addClass('active');
    //$(text).children().hide();
    $($(text).children()[number]).show();

    // вешаем на событие нажатия - функцию
    $(control).on('click','li',function () {
        // сохраним нажатый элемент в переменную
        var element = this;
        // установим счетчик в 0
        var i =0;
        // сохраним список детей
        var arr = $(text).children();
        // запустим обработку детей контролируемого блока
        $(control).children().each(
            function () {
                // если нет описания для этой вкадки - скопируем название вкаладки и установим как текст
                if(arr[i] === undefined){
                    $(this).clone().appendTo(text);
                    // пересчитаем детей
                    arr = $(text).children();
                }
                // если нажатый элемент = перебираемому, то установим класс активности
                // нажатой вкадке и такому же по счету элементу из описания
                if(this === element) {
                    $(this).addClass('active');
                    //$(arr[i]).addClass('active');
                    $(arr[i]).show();
                }
                // иначе - снимем у остальных класс активности
                else {
                    $(this).removeClass('active');
                    //$(arr[i]).removeClass('active');
                    $(arr[i]).hide();
                }
                i++; // увеличим счетчик
            }
        )
    })
});