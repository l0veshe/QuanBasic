
var columns = []
var currency = []
var table
var balance_name = 0
var myChart = echarts.init(document.getElementById('net_chart'));
var pnlChart = echarts.init(document.getElementById('pnl_chart'));
var alerts_table = []

$("#note_submiting").show()

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

var balance_name = GetQueryString("balance_name")
console.log(balance_name)

function echarts_option(_echart, btc_data, usdt_data) {
    option = {
        grid: {
            left: '1%',
            right: '1%',
            bottom: '9%',
            top: '3%',
            containLabel: true
        },
        dataZoom: [{
            type: 'inside',
            start: 90,
            end: 100,
        }, {
            type: 'slider',
            start: 90,
            end: 100,
        }],

        xAxis: {
            type: 'time',
        },
        yAxis: [{
            type: 'value',
            name: 'USDT',
            scale: true,
        }, {
            type: 'value',
            name: 'BTC',
            scale: true,

        }],
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            },

        },
        formatter: function (params) {
            var dt = params[0]['axisValueLabel']
            console.log(params);
            var usdt = null;
            var btc = null;
            for(var i=0;i<params.length;i++){
                if (params[i]['seriesName'] == "USDT Net value"){
                    usdt = params[i]['data'][1]
                }
                if (params[i]['seriesName'] == "BTC Net value"){
                    btc = params[i]['data'][1]
                }
            }

            //var usdt = params[1]['data'][1]
            //var btc = params[0]['data'][1]
            var html_inner = "DATE:" + dt + "<br> USDT: " + usdt + "<br> BTC: " + btc
            return html_inner

        },

        series: [
            {
                name: 'BTC Net value',
                type: 'line',
                showSymbol: false,
                smooth: false,
                itemStyle: {
                    color: 'rgb(255,124,124)'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(240,255,255)'
                    }, {
                        offset: 1,
                        color: 'rgb(255,124,124)'
                    }])
                },
                yAxisIndex: 0,
                hoverAnimation: true,
                data: btc_data
            },

            {
                name: 'USDT Net value',
                type: 'line',
                showSymbol: false,
                smooth: false,
                itemStyle: {
                    color: 'rgb(96,172,252)'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(240,255,255)'
                    }, {
                        offset: 1,
                        color: 'rgb(96,172,252)'
                    }])
                },
                yAxisIndex: 1,
                hoverAnimation: true,
                data: usdt_data
            },
        ],

        splitLine: { //网格线
            show: false
        }
    };

    _echart.setOption(option);
}

function init_columns() {
    $("#title_balance_name").text(balance_name)
    $.ajax({
        url: "/request_currency",
        data: {
            'balance_name': balance_name
        },
        type: 'get',
        dataType: 'json',
        async: true,
        timeout: 10000,
        success: function (data) {
            if (data.success == true) {
                currency = data.data
                balance_table_tr_up = $("#balance_table_tr_up").html()
                balance_table_tr_btm = $("#balance_table_tr_btm").html()
                for (id in currency) {
                    balance_table_tr_up = balance_table_tr_up + "<th>" + currency[id] + "</th>"
                    balance_table_tr_btm = balance_table_tr_btm + "<th class=\"" + currency[id] + "_symbol\">" + currency[id] + "</th>"
                }
                $("#balance_table_tr_up").html(balance_table_tr_up)
                $("#balance_table_tr_btm").html(balance_table_tr_btm)

                columns = [
                    {"data": "Account", "title": "Account"},
                    {"data": "Wallet", "title": "Wallet"},
                    {"data": "State", "title": "State"},
                    {"data": "Recordtime", "title": "Recordtime"}]
                for (currency_id in data.data) {
                    columns.push({"data": data.data[currency_id], "title": data.data[currency_id].toUpperCase()})
                }
                /**
                 console.log(columns)
                 var col=localStorage.getItem("columns");
                 var col = JSON.parse(col)
                 if (col){
                    if(col.length != columns.length){
                        col = columns
                        //console.log(col)
                        localStorage.setItem("columns" ,JSON.stringify(col))
                    }
                }else{
                    col = columns
                    localStorage.setItem("columns" ,JSON.stringify(col))

                }
                 console.log(col) **/
                createTable(columns)
            } else {
                alert(data.msg)
            }
        },
        error: function (obj, info) {
            alert(obj.status + " " + obj.statusText)
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
        }
    });
}

var rfresh_t

function refresh() {
    var col = init_columns()
    clearTimeout(rfresh_t)
    table.destroy();
    createTable(columns);
    rfresh_t = setTimeout("refresh()", 1000 * 5 * 60)
}

function createTable(columns) {

    table = $('#balance_table').DataTable({
        "dom": "frtip",
        "scrollX": false,
        "bAutoWidth": true,
        "ajax": {
            url: 'balance_json',
            dataSrc: 'data.data',
            type: 'post',
            data: {
                'balance_name': balance_name,
            }
        },
        "paging": false,
        "bLengthChange": false,
        "searching": false,
        "columns": columns,
        "fnInitComplete": function (oSettings, ajax_data) {
            var hl = localStorage.getItem("high_light");
            var hl_list = JSON.parse(hl)
            if (hl_list == null) {
                hl_list = Array()
            } else {
                for (var i in hl_list) {
                    //console.log(hl_list[i])
                    row_name = hl_list[i].split("_")[1]
                    col_name = hl_list[i].split("_")[0]
                    col_ = $("#balance_table tr:eq(0) th:contains(" + col_name + ")").index()
                    row_ = $("#balance_table tr:contains(" + row_name + ")").index() + 2
                    $("#balance_table tr:eq(" + row_ + ") td:eq(" + col_ + ")").css("background", '#6495ED').css("color", 'white')
                    //var $this_item =  $("#balance_table tr:eq(" + row_ + ") td:eq(" + col_ + ")")
                    //$this_item.html("<i class=\"fa fa-fw fa-bell-o\">" + $this_item.text() + "</i>")
                    //console.log(row_name, col_, row_name, row_)
                }
            }

            function table_find_row_num(table_jq, first, second, third) {
                var row_null = -1
                var row_num = 0
                var match = false
                table_jq.find("tr").each(function () {
                    var tdArr = $(this).children();
                    var first_colum = tdArr.eq(0).text()
                    var second_colum = tdArr.eq(1).text()
                    var third_colum = tdArr.eq(2).text()
                    //console.log(first_colum , first , second_colum,second , third_colum,third)
                    if (first_colum == first && second_colum==second && third_colum==third){
                        match = true
                        return false;
                    }
                    row_num = row_num + 1
                });
                if (!match){
                    row_num = row_null
                }
                return row_num
            }

            // 加过报警的加标记
            alerts_table = ajax_data['data']['alerts']
            //console.log(ajax_data['data']['alerts'])
            for(var one_alert in ajax_data['data']['alerts']){

                var $temp_this = ajax_data['data']['alerts'][one_alert]
                var col_ = $("#balance_table tr:eq(0) th:contains(" + $temp_this['symbol'].toUpperCase()  + ")").index()
                var row_num = table_find_row_num($("#balance_table"), $temp_this['account_name'], $temp_this["wallet"], $temp_this["state"])
                if (row_num != -1){
                    var $this_item =  $("#balance_table tr:eq(" + row_num + ") td:eq(" + col_ + ")")
                    $this_item.html("<i class=\"fa fa-fw fa-bell-o\"></i>" + $this_item.text())
                }
            }


            // 鼠标点击 高亮 + 左键alert
            $("#balance_table td").on(
                'click', function (event) {
                    $this = $(this)

                    var hl = localStorage.getItem("high_light");
                    var hl_list = JSON.parse(hl)
                    if (hl_list == null) {
                        hl_list = Array()
                    }

                    var col_id = $this.index()
                    var row_id = $this.parent().index() + 2
                    var header = $("#balance_table tr:eq(0) th:eq(" + col_id + ")").text()
                    var account = $("#balance_table tr:eq(" + row_id + ") td:eq(0)").text()
                    var wallet = $("#balance_table tr:eq(" + row_id + ") td:eq(1)").text()
                    var state = $("#balance_table tr:eq(" + row_id + ") td:eq(2)").text()
                    var value_curr = $("#balance_table tr:eq(" + row_id + ") td:eq(" + col_id + ")").text()

                    if(event.altKey){
                        var coin = header.toLowerCase()
                        console.log(coin, account, balance_name, wallet, state, value_curr)
                        $("#alarm-bgroup").val(balance_name)
                        $("#alarm-account").val(account)
                        $("#alarm-wallet").val(wallet)
                        $("#alarm-state").val(state)
                        $("#alarm-symbol").val(coin)
                        $("#alarm-val").val(value_curr)
                        $(".alarm-list").html("<tr>\n" +
                            "                                <th style=\"width: 10px\">#</th>\n" +
                            "                                <th>Bgroup</th>\n" +
                            "                                <th>Account</th>\n" +
                            "                                <th>Wallet</th>\n" +
                            "                                <th>State</th>\n" +
                            "                                <th>Symbol</th>\n" +
                            "                                <th>Ops</th>\n" +
                            "                                <th>Val</th>\n" +
                            "                                <th>Group</th>\n" +
                            "                                <th>M</th>\n" +
                            "                            </tr>")

                        $.each(alerts_table, function (key, val) {
                            console.log(alerts_table[key], alerts_table[val])
                            var this_alarm = alerts_table[key]
                            if (this_alarm['balance_name'] == balance_name && this_alarm['account_name'] == account &&
                            this_alarm['wallet'] == wallet && this_alarm['state'] == state){
                                $(".alarm-list").append("<tr>" +
                                    "<td>"+ this_alarm['id'] + "</td>" +
                                    "<td>"+ balance_name + "</td>" +
                                    "<td>"+ account + "</td>" +
                                    "<td>"+ wallet + "</td>" +
                                    "<td>"+ state + "</td>" +
                                    "<td>"+ this_alarm['symbol'] + "</td>" +
                                    "<td>"+ this_alarm['ops'] + "</td>" +
                                    "<td>"+ this_alarm['val'] + "</td>" +
                                    "<td>"+ this_alarm['alert_group'] + "</td>" +
                                    "<td><button class=\"btn btn-block btn-danger btn-xs del-alarm-button \" onclick=\"delAlarmButton("+this_alarm['id']+")\" >DEL</button></td>" +
                                    "</tr>")
                            }
                        })

                        $.ajax({
                            url: "/request_alerting_setting",
                            type: 'get',
                            dataType: 'json',
                            async: true,
                            timeout: 10000,
                            success: function (data) {
                                $("#alarm-alertgroup").empty()
                                if (data.success) {
                                    var itemList = [];
                                    for (item in data.alerting_data) {
                                            temp_group = data.alerting_data[item]["groupname"]
                                            $("#alarm-alertgroup").append("<option value='"+temp_group+"'>"+temp_group+"</option>");
                                    }
                                }
                            },
                            error: function (obj, info) {
                                alert(obj.status + " " + obj.statusText)
                            },
                            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                            }
                        });

                        $("#balance-alert-add").modal()
                        return false
                    }

                    if ($this.css("background").split(" ")[0] == "rgb(100,") {
                        $this.css("background", 'none')
                        $this.css("color", 'black')
                        var ts = header + "_" + account
                        if (hl_list.indexOf(ts) != -1) {
                            hl_list.splice(hl_list.indexOf("ts"), 1)
                        }
                    } else {
                        $this.css("background", '#6495ED')
                        $this.css("color", 'white')
                        var col_id = $this.index()
                        var row_id = $this.parent().index() + 2
                        var header = $("#balance_table tr:eq(0) th:eq(" + col_id + ")").html()
                        var account = $("#balance_table tr:eq(" + row_id + ") td:eq(0)").html()

                        var ts = header + "_" + account
                        var has = false
                        for (var i in hl_list) {
                            if (hl_list[i] == ts) {
                                has = true
                            }
                        }
                        if (!has) {
                            hl_list.push(header + "_" + account)
                        }
                    }
                    localStorage.setItem("high_light", JSON.stringify(hl_list))
                })

            $(".coin_v").on("click", function () {
                var $this = $(this)
                var col = localStorage.getItem("columns");
                var col = JSON.parse(col)
                var count = 0
                $.each(col, function (index, item) {
                    if (item['title'] == $this.text()) {
                        if (typeof(item['visible']) == "undefined") {
                            item['visible'] = true
                        }
                        item['visible'] = !item['visible']
                        table.columns([count]).visible(item['visible']);
                        return false
                    }
                    count = count + 1
                })
                localStorage.setItem("columns", JSON.stringify(col))

            })
        },


        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;

            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };
            for (id in currency) {
                val = api.column(intVal(id) + 4, {page: 'current'})
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                $("." + currency[id] + "_symbol").html(val)
            }


        },

    });
}

function modalReady() {
    //$('#balance-setting').on('shown.bs.modal', function () {
    $.ajax({
        url: "/request_balance_wallet",
        data: {'balance_name': balance_name},
        //data: {
        //    'target': $("#target_file_select option:selected").text(),
        //    'ip': $("#server_select option:selected").text().split(" ")[0]
        //},
        type: 'get',
        dataType: 'json',
        async: true,
        timeout: 10000,
        success: function (data) {
            if (data.success) {
                var itemList = [];
                for (item in data.data) {
                    itemList.push({
                        id: data.data[item]["wallet_group"],
                        value: data.data[item]["wallet_group"],
                        text: data.data[item]["wallet_group"],
                        selected: data.data[item]["selected"],
                        disabled: data.data[item]["disabled"]
                    })
                }

                $("#wallet_select").html("")

                $("#wallet_select").select2({
                    "data": itemList,
                    placeholder: 'Please select',//默认文字提示
                    language: "zh-CN",
                    tags: true,//允许手动添加
                    allowClear: true,//允许清空
                    escapeMarkup: function (markup) {
                        return markup;
                    }, // 自定义格式化防止xss注入
                    //minimumInputLength: 1,//最少输入多少个字符后开始查询
                    formatResult: function formatRepo(repo) {
                        return repo.text;
                    }, // 函数用来渲染结果
                    formatSelection: function formatRepoSelection(repo) {
                        return repo.text;
                    } //
                })


            } else {
                $("#symbol_select").html("")
            }
        },
        error: function (obj, info) {
            alert(obj.status + " " + obj.statusText)
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
        }
    });

    $.ajax({
        url: "/request_balance_currency",
        //data: {
        //    'target': $("#target_file_select option:selected").text(),
        //    'ip': $("#server_select option:selected").text().split(" ")[0]
        //},
        data: {"balance_name": balance_name},
        type: 'get',
        dataType: 'json',
        async: true,
        timeout: 10000,
        success: function (data) {
            if (data.success) {
                var itemList = [];
                for (item in data.data) {
                    itemList.push({
                        id: data.data[item]["symbol"],
                        value: data.data[item]["symbol"],
                        text: data.data[item]["symbol"],
                        selected: data.data[item]["selected"],
                        disabled: data.data[item]["disabled"]
                    })
                }

                $("#currency_select").html("")

                $("#currency_select").select2({
                    "data": itemList,
                    placeholder: 'Please select',//默认文字提示
                    language: "zh-CN",
                    tags: true,//允许手动添加
                    allowClear: true,//允许清空
                    escapeMarkup: function (markup) {
                        return markup;
                    }, // 自定义格式化防止xss注入
                    //minimumInputLength: 1,//最少输入多少个字符后开始查询
                    formatResult: function formatRepo(repo) {
                        return repo.text;
                    }, // 函数用来渲染结果
                    formatSelection: function formatRepoSelection(repo) {
                        return repo.text;
                    } //
                })

            } else {
                $("#currency_select").html("")
            }
        },
        error: function (obj, info) {
            alert(obj.status + " " + obj.statusText)
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
        }
    });

    $.ajax({
        url: "/request_balance_note",
        //data: {
        //    'target': $("#target_file_select option:selected").text(),
        //    'ip': $("#server_select option:selected").text().split(" ")[0]
        //},
        data: {"balance_name": balance_name},
        type: 'get',
        dataType: 'json',
        async: true,
        timeout: 10000,
        success: function (data) {
            if (data.success) {
                $('.note_balance').val(data.data).wysihtml5({
                    "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
                    "emphasis": true, //Italics, bold, etc. Default true
                    "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
                    "html": false, //Button which allows you to edit the generated HTML. Default false
                    "link": true, //Button to insert a link. Default true
                    "image": true, //Button to insert an image. Default true,
                    "color": false //Button to change color of font
                });
                $("#note_submiting").hide()

            } else {
                $("#currency_select").html("(数据获取失败)")
            }
        },
        error: function (obj, info) {
            alert(obj.status + " " + obj.statusText)
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
        }
    });

    //})
}

function settingSaveReady() {
    $('.setting-save').on('click', function () {
        wallet_groups = $('#wallet_select').val().join(",")
        currency_groups = $('#currency_select').val().join(",")
        $.ajax({
            url: "/request_balance",
            data: {
                'balance_name': balance_name,
                'wallet_groups': wallet_groups,
                'currency_groups': currency_groups
            },
            type: 'get',
            dataType: 'json',
            async: true,
            timeout: 10000,
            success: function (data) {
                if (data.success == true) {
                    location.reload()
                } else {
                    alert(data.msg)
                }
            },
            error: function (obj, info) {
                alert(obj.status + " " + obj.statusText)
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            }
        });
    });
}

function addBalance() {
    $("#add-banlance-group").on("click", function () {
        if ($("#add-banlance-group-input").val().replace(" ", "") == "") {
            return false
        } else {
            window.open("balance?balance_name=" + $("#add-banlance-group-input").val().replace(" ", ""))
        }
    })
}

function SubmitNote() {
    $("#SubmitNote").on("click", function () {

        $("#SubmitNote").attr("disabled", true);
        $("#note_submiting").show()

        $.ajax({
            url: "/request_balance_note",
            data: {
                "balance_name": balance_name,
                "content": $(".note_balance").val(),
            },
            type: 'post',
            dataType: 'json',
            async: true,
            timeout: 10000,
            success: function (data) {
                if (data.success) {

                } else {
                    $("#SubmitNote").attr("disabled", false);
                    $("#note_submiting").hide()
                    alert("服务器错误 \n" + data.msg)
                }
            },
            error: function (obj, info) {
                alert(obj.status + " " + obj.statusText + " \n 服务器错误" + "\n" + info)
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                $("#SubmitNote").attr("disabled", false);
                $("#note_submiting").hide()
            }
        });

    })
}

function netvalue(type="netvalue") {
    $.ajax({
        type: "GET",
        dataType: 'json',
        data: {
            "balance_name": balance_name,
            "type": type
        },

        url: 'request_balance_netvalue',
        success: function (data) {
            if (data.success == true) {
                var btc_last = data['btc_data'][0][1];
                var usdt_last = data['usdt_data'][0][1];
                var dt_last = data['usdt_data'][0][0];
                var d = new Date(dt_last);    //根据时间戳生成的时间对象
                var date = (d.getFullYear()) + "-" +
                    (d.getMonth() + 1) + "-" +
                    (d.getDate()) + " " +
                    (d.getHours()) + ":" +
                    (d.getMinutes()) + ":" +
                    (d.getSeconds());

                $(".netv-title").html("Net Value &nbsp; <span style='font-size: 14px;color:rgb(255,124,124)'>BTC: " + btc_last + "</span>&nbsp; " +
                    "<span style='font-size: 14px;color:rgb(96,172,252)'>USDT: " + usdt_last + "</span>&nbsp; " +
                    "<span style='font-size: 14px;color:rgb(0,0,0)'>" + date + "</span>")
                echarts_option(myChart ,data['btc_data'], data['usdt_data'])

            } else {
                console.log(data.message);
                alert("没有数据")
            }
        },
        error: function (obj, info) {
            alert(obj.status + " " + obj.statusText + " \n 服务器错误" + "\n" + info)
        },

    });
}

function pnlvalue(type="pnlvalue") {
    $.ajax({
        type: "GET",
        dataType: 'json',
        data: {
            "balance_name": balance_name,
            "type": type
        },

        url: 'request_balance_netvalue',
        success: function (data) {
            if (data.success == true) {
                var btc_last = data['btc_pnl_data'][0][1];
                var usdt_last = data['usdt_pnl_data'][0][1];
                var dt_last = data['usdt_pnl_data'][0][0];
                var d = new Date(dt_last);    //根据时间戳生成的时间对象
                var date = (d.getFullYear()) + "-" +
                    (d.getMonth() + 1) + "-" +
                    (d.getDate()) + " " +
                    (d.getHours()) + ":" +
                    (d.getMinutes()) + ":" +
                    (d.getSeconds());

                $(".pnlv-title").html("PNL Value &nbsp; <span style='font-size: 14px;color:rgb(255,124,124)'>BTC: " + btc_last + "</span>&nbsp; " +
                    "<span style='font-size: 14px;color:rgb(96,172,252)'>USDT: " + usdt_last + "</span>&nbsp; " +
                    "<span style='font-size: 14px;color:rgb(0,0,0)'>" + date + "</span>")
                echarts_option(pnlChart, data['btc_pnl_data'], data['usdt_pnl_data'])

            } else {
                console.log(data.message);
                alert("没有数据")
            }
        },
        error: function (obj, info) {
            alert(obj.status + " " + obj.statusText + " \n 服务器错误" + "\n" + info)
        },

    });
}

function redirectWorker(){
    $("#balance-worker").on("click", function () {
        window.open("new_workers?balance_name=" + balance_name);
    })
    $("#balance-worker-statement").on("click", function () {
        window.location.href = "balance?balance_name=" + balance_name +"&statement=T"
    })
}

function changeTitle(){
    $("#balance_title").text($("#balance_title").text() + ": "+ balance_name)
}

function alarmSubmit(){
    $("#alarm-submit").on("click",function () {
        var alarmBgroup = $("#alarm-bgroup").val()
        var alarmAccount = $("#alarm-account").val()
        var alarmWallet = $("#alarm-wallet").val()
        var alarmState = $("#alarm-state").val()
        var alarmSymbol = $("#alarm-symbol").val()
        var alarmOps= $("#alarm-ops").val()
        var alarmVal = $("#alarm-val").val()
        var alarmAlertgroup = $("#alarm-alertgroup").val()
        console.log(alarmBgroup, alarmAccount, alarmWallet, alarmState, alarmSymbol, alarmOps, alarmVal, alarmAlertgroup)
        $.ajax({
            url: "/request_alerts_add",
            data:{
                alarmBgroup:alarmBgroup,
                alarmAccount:alarmAccount,
                alarmWallet:alarmWallet,
                alarmState:alarmState,
                alarmSymbol:alarmSymbol,
                alarmOps:alarmOps,
                alarmVal:alarmVal,
                alarmAlertgroup:alarmAlertgroup
            },
            type: 'get',
            dataType: 'json',
            async: true,
            timeout: 10000,
            success: function (data) {
                if (data.success) {
                    alert("Success")
                    console.log(data)
                    $(".alarm-list").append("<tr>" +
                        "<td>" + data.data['id'] + "</td>" +
                        "<td>" + data.data['alarmBgroup'] + "</td>" +
                        "<td>" + data.data['alarmAccount'] + "</td>" +
                        "<td>" + data.data['alarmWallet'] + "</td>" +
                        "<td>" + data.data['state'] + "</td>" +
                        "<td>" + data.data['symbol'] + "</td>" +
                        "<td>" + data.data['ops'] + "</td>" +
                        "<td>" + data.data['val'] + "</td>" +
                        "<td>" + data.data['alert_group'] + "</td>" +
                        "<td><button class=\"btn btn-block btn-danger btn-xs del-alarm-button \" onclick=\"delAlarmButton("+data.data['id']+")\" >DEL</button></td>" +
                        "</tr>>")
                } else {
                    alert("Failed")
                }
            },
            error: function (obj, info) {
                alert(obj.status + " " + obj.statusText)
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            }
        });
    })
}

function delAlarmButton(del_id){
    console.log(del_id)
    $.ajax({
        url: "/request_alerts_del",
        data:{
          del_id: del_id,
        },
        type: 'get',
        dataType: 'json',
        async: true,
        timeout: 10000,
        success: function (data) {
            if (data.success) {
                alert("success")
                table_del_by_id($(".alarm-list"), del_id)

            }
        },
        error: function (obj, info) {
            alert(obj.status + " " + obj.statusText)
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
        }
    });
}

function table_del_by_id(table, r_id) {
    var row = 0
    table.find("tr").each(function () {
        var tdArr = $(this).children();
        var first_colum = tdArr.eq(0).text()
        if (first_colum == r_id){
            table.find("tr:eq(\"" + row + "\")").remove()
        }
        row = row + 1
    });
}


$(document).ready(function () {
    changeTitle()
    redirectWorker()
    modalReady()
    settingSaveReady()
    SubmitNote()
    netvalue()
    pnlvalue()
    alarmSubmit()

    var col = init_columns()
    //rfresh_t = setTimeout("refresh()", 1000*5*60)
    addBalance()
})


