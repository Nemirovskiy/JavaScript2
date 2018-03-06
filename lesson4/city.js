var urlCity = 'https://api.vk.com/api.php?oauth=1&method=database.getCities&v=5.5&need_all=0&count=10&country_id=1&q=';
var option;
$(document).ready(function(){
  $('#city').on('input',function () {
      if(this.value.length >= 3){
        getCity(this.value)
      }
  });
  $('#citylist').on('click','li',function () {
     $('#city').val($(this).text());
     $('#citylist').empty();
     var text = 'Выбран город '+ $(this).text() ;
     text += ($(this).attr('title') === undefined)?'':' ('+ $(this).attr('title')+')';
     $('#result').text(text);
  });
    }
);

function getCity(name) {
    $.ajax({
        url: urlCity + name,
        dataType: "jsonp",
        success: function (data){
            $('#citylist').empty();
            data.response.items.forEach(function (value) {
                option = document.createElement('li');
                option.innerText = value.title;
                option.title = (value.area === undefined)?'':value.area;
                option.title += (value.region === undefined)?'': ' - '+ value.region;
                $(option).attr('data-city',value.id);
                $(option).appendTo($('#citylist'));
            });
        }
    })
}
