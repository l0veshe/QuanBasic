
function plots_show(date_str, http_addr) {
    console.log(date_str)
    $(".plots_show").html("")
    $.ajax({
        type: "GET",
        dataType:'json',
        url: 'https://' + http_addr +'/plots_show',
        data: {
            'date': date_str
        },
        success: function(data){
            console.log(data)
            $(".plots_show").html(data.content)
        },
        error: function (e) {
            console.log(e)
        }

    })


}