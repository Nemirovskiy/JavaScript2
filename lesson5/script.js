
$(document).ready(function(){
    getGoods();
    showCart();
    $("#goods").on("click","button",toCart);
    $("#cart").on("click","button",delGood);
});

function delGood() {
    console.log($(this).attr("data-id"));
    $.ajax({
        url: "http://localhost:3000/cart/" + $(this).attr('data-id'),
        method: "DELETE",
        dataType: "json",
        success:  showCart
    })
}

function showCart() {
    $.ajax({
        url: "http://localhost:3000/cart",
        dataType: "json",
        success:  function (data) {
            $("#cart").empty();
            if(data.length > 0){
                var list = $("<ul/>");
                var price = 0;
                data.forEach(function (value) {
                    var item = $("<li/>").text(value.name + " - " + value.price);
                    $("<button/>").text("X").attr("data-id",value.id).appendTo(item);
                    item.appendTo(list);
                    price += parseInt(value.price);
                });
                $("<li/>").text("Итого " + price + " руб.").appendTo(list);
            }
            else{
                var list = $("<p/>").text("Ваша корзина пуста");
            }
            $("#cart").append(list);
        }
    })
}

function toCart() {
    $.ajax({
        url: "http://localhost:3000/cart",
        method: "POST",
        data: {
            "name": $(this).attr('data-name'),
            "price": $(this).attr('data-price'),
            "id": $(this).attr('data-id')
        },
        dataType: "json",
        success:  showCart
    })
}
function getGoods() {
    $.ajax({
        url: "http://localhost:3000/goods",
        dataType: "json",
        success:  renderGoods
    })
}

function renderGoods(data) {
    $("#goods").empty();
    data.forEach(function (value) {
        var item = $("<div/>").addClass('item');
        $("<h3/>").text(value.name).appendTo(item);
        $("<h4/>").text(value.price).appendTo(item);
        $("<button/>").attr({
            'data-id': value.id,
            'data-name': value.name,
            'data-price': value.price
        }).text('to cart').appendTo(item);
        item.appendTo( "#goods");
    });
}