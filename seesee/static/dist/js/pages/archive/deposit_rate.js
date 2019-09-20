
var columns = [
    {"data": "accountname", "title": "Account"},
    {"data": "exchange", "title": "Wallet"},
    {"data": "eth", "title": "ETH" },
    {"data": "eos", "title": "EOS"},
    {"data": "xrp", "title": "XRP"},
    {"data": "btc", "title": "BTC"},
    {"data": "usd", "title": "USD"},
    {"data": "husd", "title": "HUSD"},
    {"data": "pax", "title": "PAX"},
    {"data": "gusd", "title": "GUSD"},
    {"data": "tusd", "title": "TUSD"},
    {"data": "usdc", "title": "USDC"},
    {"data": "usdt", "title": "USDT"},
    {"data": "etc", "title": "ETC"},
    {"data": "ltc", "title": "LTC"},]

function init_columns(){
    var col=localStorage.getItem("columns");
    var col = JSON.parse(col)
    console.log("~~~~~~")
    console.log(col)
    if (col){
        if(col.length != columns.length){
            col = columns
            console.log(col)
            localStorage.setItem("columns" ,JSON.stringify(col))
        }
    }else{
        col = columns
        localStorage.setItem("columns" ,JSON.stringify(col))

    }
    return col
}

var rfresh_t
function refresh() {
    var col = init_columns()
    clearTimeout(rfresh_t)
    table.destroy();
    createTable(col);
    rfresh_t = setTimeout("refresh()", 1000*5*60)
}

function createTable(columns){

    table = $('#balance_table').DataTable({
        "dom": "frtip",
        "scrollX": false,
        "bAutoWidth": true,
        "ajax": {
            url: 'request_new_workers_load',
            dataSrc: 'data.workers_data'
        },
        "paging": false,
        "bLengthChange": false,
        "searching": false,
        "columns": columns,
        "fnInitComplete": function(oSettings, json) {
            var hl=localStorage.getItem("high_light");
            var hl_list = JSON.parse(hl)
            if (hl_list==null){
                hl_list = Array()
            }else{
                for(var i in hl_list){
                    console.log(hl_list[i])
                    row_name = hl_list[i].split("_")[1]
                    col_name = hl_list[i].split("_")[0]
                    col_ = $("#balance_table tr:eq(0) th:contains("+col_name+")").index()
                    row_ = $("#balance_table tr:contains("+row_name+")").index() + 2
                    $("#balance_table tr:eq("+row_+") td:eq("+ col_ +")").css("background", '#6495ED').css("color", 'white')
                }
            }


            $("#balance_table td").on(
                'click',function(){
                    $this=$(this)

                    var hl=localStorage.getItem("high_light");
                    var hl_list = JSON.parse(hl)
                    if (hl_list==null){
                        hl_list = Array()
                    }

                    var col_id = $this.index()
                    var row_id = $this.parent().index() + 2
                    var header = $("#balance_table tr:eq(0) th:eq("+ col_id +")").html()
                    var account = $("#balance_table tr:eq("+ row_id+") td:eq(0)").html()

                    if ($this.css("background").split(" ")[0] == "rgb(100,"){
                        $this.css("background", 'none')
                        $this.css("color", 'black')
                        var ts = header + "_" + account
                        if (hl_list.indexOf(ts) != -1){
                            hl_list.splice(hl_list.indexOf("ts"), 1)
                        }
                    }else{
                        $this.css("background", '#6495ED')
                        $this.css("color", 'white')
                        var col_id = $this.index()
                        var row_id = $this.parent().index() + 2
                        var header = $("#balance_table tr:eq(0) th:eq("+ col_id +")").html()
                        var account = $("#balance_table tr:eq("+ row_id+") td:eq(0)").html()

                        var ts = header + "_" + account
                        var has = false
                        for(var i in hl_list){
                            if (hl_list[i] == ts){
                                has = true
                            }
                        }
                        if (!has){
                            hl_list.push(header + "_" + account )
                        }
                    }
                    localStorage.setItem("high_light" ,JSON.stringify(hl_list))
            })

            $(".coin_v").on("click", function(){
                var $this = $(this)
                var col=localStorage.getItem("columns");
                var col = JSON.parse(col)
                var count = 0
                $.each(col, function(index,item){
                    if(item['title'] == $this.text()){
                        if(typeof(item['visible']) == "undefined"){
                            item['visible'] = true
                        }
                        item['visible'] = !item['visible']
                        table.columns([count]).visible(item['visible']);
                        return false
                    }
                    count = count + 1
                })
                localStorage.setItem("columns" ,JSON.stringify(col))

            })
        },


        "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;

            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };

        },

    });
}

$(document).ready(function () {
    var col = init_columns()
    createTable(col)
    rfresh_t = setTimeout("refresh()", 1000*5*60)


})
