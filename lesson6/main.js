$(document).ready(
    function () {
        $("#brdate").datepicker({
            dayNames: ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],
            monthNames: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
            dayNamesMin: ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],
            dateFormat: "dd.mm.yy",
            firsDay: 1
        });
        $(".item").draggable({revert: true});
        var price = 0;
        $(".cart").droppable({
            over: function (e,i) {
                console.log($(i.draggable[0]).attr("data-name"));
                $("<li/>").text(
                    $(i.draggable[0]).attr("data-name") +
                    " - " + $(i.draggable[0]).attr("data-price")
                ).appendTo($("#cart"));
                // $(i.draggable[0]).remove();
                price += parseInt($(i.draggable[0]).attr("data-price"));
                if(price >0) {
                    $("#price").text("Итого: " + price);
                }
            }
        });
    }
);

