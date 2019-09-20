/**
 * Created by hank on 2018/8/16.
 */

var wait_status = {}
var datatable

var status_global = {}

var test
var pair_data = {}
var show_last_ts = 0

function get_pair_data() {
    $.ajax({
        'url': "v1/channel?type=all&head=exn",
        'data': {},
        'datatype': 'get',
        'success': function (data) {
            if (data['data'] && data['data']['channel_data']) {
                pair_data = data['data']['channel_data']
                /**
                 coinbene: - {
  172.31.141.0: - {
    depth: - [
      "depth_coinbene_usdt_coni"
    ]
  }
},
                 **/
                for (exn in pair_data) {
                    for (ip in pair_data[exn]) {
                        for (chan in pair_data[exn][ip]) {
                            var lens = pair_data[exn][ip][chan].length
                            pair_data[exn][ip][chan] = {}
                            pair_data[exn][ip][chan]['now'] = 0
                            pair_data[exn][ip][chan]['total'] = lens
                            pair_data[exn][ip][chan]['mesg'] = []


                        }

                    }
                }
            }
        },
    })
}

function formatDateTime(timeStamp) {
    var date = new Date();
    date.setTime(timeStamp * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};

$(document).ready(function () {
    get_pair_data()

    $('.select2').select2()

    datatable = $('#exchange_server_table').DataTable({
        "dom": "lfrti",
        "scrollX": false,
        "bAutoWidth": true,
        "ajax": 'request_all_exchange',
        "paging": false,
        "bLengthChange": false,
        "columns": [{"data": "id"},
            {"data": "ip"},
            {"data": "hostname"},
            {"data": "target_file"},
            {
                "data": null,
                "className": "subws",
                render: function (data, type, row) {
                    if (data['sub']) {
                        return data['sub']
                    } else {
                        if (data['status'] == 0) {
                            return "<p class=\"text-info\"><strong>Stopped</strong></p>"

                        } else {
                            return "<p class=\"text-warning\"><strong>No_recv</strong></p>"
                        }
                    }

                    //return "<p class=\"text-warning\"><strong></strong></p>"
                    //console.log(data)
                }
            },
            {"data": "status"},
            {"data": "symbol"},
            {"data": "update_at"},
            {"data": "cmd"},
        ],
        "columnDefs": [{
            "targets": [9],
            "render": function (data, type, row) {
                var re_str = ""
                if (row['cmd'] == 0) {
                    re_str = '<button type="button" id="reboot_target" class="btn btn-block btn-sm btn-primary">Reboot</button>'
                } else if (row['cmd'] == 2) {
                    re_str = '<button type="button" id="reboot_target" class="btn btn-block btn-sm btn-primary" disabled>Waitting ANS</button>'
                } else if (row['cmd'] == 3) {
                    re_str = '<button type="button" id="reboot_target" class="btn btn-block btn-sm btn-primary" disabled>Rebooting</button>'
                } else if (row['cmd'] == 1) {
                    re_str = '<button type="button" id="reboot_target" class="btn btn-block btn-sm btn-primary" >Reboot Done</button>'
                }
                return re_str
            }
        },
        ],
        "initComplete": function () {
            add_wait()
        },

    });

    $('#exchange_server_table tbody').on('click', 'button', function () {
        button = $(this)
        this_row = datatable.row($(this).parents('tr')).index();

        button.attr('disabled', true)
        button.text('Sending CMD')
        send_reboot_status(button, this_row)
    });

    function send_reboot_status(button, row_index) {

        $.ajax({
            'url': "request_send_reboot_status",
            'data': {
                'target': datatable.row(row_index).data().target_file,
                'ip': datatable.row(row_index).data().ip
            },
            'datatype': 'get',
            'beforeSend': function () {
                console.log("before send")    // Handle the beforeSend event
            },
            'success': function (e) {
                wait_status['m_' + String(e.mlm_id)] = row_index
            },
            'error': function (e) {
            },
            'ajaxComplete': function (e) {
            }
        })
    }

    function add_wait() {
        var tr = datatable.rows()[0]
        $.each(tr, function (item) {
            var td = datatable.row(tr[item]).data()
            if (td['cmd'] != 0) {
                wait_status['m_' + td['id']] = tr[item]
            }
        })
    }

    var webst = Wbs()
    webst.on_mesg_func(on_mesg_change_one_row_status, datatable)
    webst.wsconn(ws_addr, "ws/ws_status?task=exchange_ws")


    function on_mesg_change_one_row_status2(datatable, mesg_data) {
        if (mesg_data['ws_send_type'] == "exchange_ws") {
            if (JSON.stringify(pair_data) == "{}") {
                return false
            }

            datatable.rows().every(
                function (rowIdx, tableLoop, rowLoop) {
                    var d = this.data();
                    // console.log(mesg_data)
                    var status = {
                        'depth': {
                            'online': 0,
                            'total': 0,
                            'msg': []
                        },
                        'trade': {
                            'online': 0,
                            'total': 0,
                            'msg': []
                        },
                        'kline1min': {
                            'online': 0,
                            'total': 0,
                            'msg': []
                        },
                        'ip': "",
                        'exchange': ""

                    }
                    var now = new Date().getTime() / 1000
                    // depth
                    type = 'depth'
                    var stype = mesg_data['channel']
                    var sip = mesg_data['ip']
                    // for (chan_one in mesg_data['data'][type]){
                    var temp_pair_data = {}
                    if (mesg_data['channel'] == type) {
                        if (d.ip == mesg_data['ip']) {
                            temp_pair_data[ip] = {}
                            status['ip'] = d.ip
                            for (one_key in mesg_data['data']) {
                                var h_one_key_arr = one_key.substring(6).split("_")
                                if (h_one_key_arr[0] == 'rfinex') {
                                    h_one_key_arr[0] = 'rf'
                                }
                                var exn = h_one_key_arr[0]


                                if (h_one_key_arr[0] == d.target_file.split(" ")[1]) {
                                    status['exchange'] = h_one_key_arr[0]
                                    if (now - mesg_data['data'][one_key] < 600) {
                                        status[type]['online'] = status[type]['online'] + 1
                                    } else {
                                        temp_str = mesg_data['data']
                                        if ((now - mesg_data['data'][one_key]) / 60 > 60 * 24 * 10) {
                                            temp_str = "No Data"
                                        } else {
                                            temp_str = " : " + formatDateTime(mesg_data['data'][one_key])
                                        }
                                        status[type]['msg'].push(one_key + " " + temp_str)

                                    }
                                    status[type]['total'] = status[type]['total'] + 1
                                }
                            }

                        }


                        if (status[type]['total'] != 0) {
                            d.sub = String(status['depth']['online']) + "/" + String(status['depth']['total'])
                            datatable.row(rowIdx).data(d).draw()
                        }

                    }


                    d.sub = String(status['depth']['online']) + "/" +
                        String(status['kline1min']['online']) + "/" +
                        String(status['trade']['online']) + "-" + String(status['depth']['total'])
                    datatable.row(rowIdx).data(d).draw()

                    var this_ev = $("#show_sub_data_modal")
                    if (this_ev.attr('data-ip') == status['ip'] && this_ev.attr('data-exchange') == status['exchange'] && $("#show_sub_data_modal").is(':visible')) {
                        var str = $("#show_sub_data_modal #ws_content").html()
                        var show_ws_str = function (status) {
                            var temp_str = ""
                            temp_str = "depth: " + String(status['depth']['online']) + "/" + String(status['depth']['total']) + "<br>"
                            temp_str = temp_str + "kline1min: " + String(status['kline1min']['online']) + "/" + String(status['kline1min']['total']) + "<br>"
                            temp_str = temp_str + "trade: " + String(status['trade']['online']) + "/" + String(status['trade']['total']) + "<br>"
                            if (status['depth']['msg'].length > 0) {
                                temp_str = temp_str + status['depth']['msg'].join("<br>") + "<br>"
                            }
                            if (status['kline1min']['msg'].length > 0) {
                                temp_str = temp_str + status['kline1min']['msg'].join("<br>") + "<br>"
                            }
                            if (status['trade']['msg'].length > 0) {
                                temp_str = temp_str + status['trade']['msg'].join("<br>")
                            }
                            time = String(new Date().getTime() / 1000)
                            temp_str = "<br>------ " + formatDateTime(time) + " ------<br>" + temp_str + "<br>"
                            return temp_str
                        }
                        str = show_ws_str(status) + str
                        $("#show_sub_data_modal #ws_content").html(str)
                    }
                }
            )

        }

        $("#exchange_server_table td").unbind('click')
        $("#exchange_server_table td").bind('click', click_sub_data)
    }

    function on_mesg_change_one_row_status(datatable, mesg_data) {
        /**
         *
         pair_data: 接口数据

         pair_data[ip][exn][chan] = {}
         pair_data[ip][exn][chan]['now'] = 0
         pair_data[ip][exn][chan]['total'] = lens

         mesg_data: ws 传回数据

         {'channel':'depth', 'ip':'1.2.3.4', 'data':{
            'depth_hbp_eth_xmr': 1557975229.1615644, ...
            }
         }

         */
        if (mesg_data['ws_send_type'] == "exchange_ws") {
            if (JSON.stringify(pair_data) == "{}") {
                return false
            }

            var now = new Date().getTime() / 1000
            var ws_channel = mesg_data['channel']
            var ws_ip = mesg_data['ip']
            // 本行 ws_channel ws_ip匹配
            var temp_ip_pair_data = {}
            var ws_exns = []

            for (var ws_one_key in mesg_data['data']) {
                var ws_one_key_arr = ws_one_key.split("_")
                // 一些更改, 可能无用
                if (ws_one_key_arr[1] == 'rfinex') {
                    ws_one_key_arr[1] = 'rf'
                }
                var ws_exn = ws_one_key_arr[1]
                if (ws_exns.indexOf(ws_exn) < 0) {
                    ws_exns.push(ws_exn)
                }

                if (!temp_ip_pair_data.hasOwnProperty(ws_exn)) {
                    temp_ip_pair_data[ws_exn] = {}
                    temp_ip_pair_data[ws_exn][ws_channel] = {}
                    temp_ip_pair_data[ws_exn][ws_channel]['current'] = 0
                    temp_ip_pair_data[ws_exn][ws_channel]['mesg'] = {}
                }

                // 到此此行已经完全匹配
                if (now - mesg_data['data'][ws_one_key] < 600) {
                    temp_ip_pair_data[ws_exn][ws_channel]['current'] = temp_ip_pair_data[ws_exn][ws_channel]['current'] + 1
                } else {
                    if ((now - mesg_data['data'][ws_one_key]) / 60 > 60 * 24 * 10) {
                        temp_ip_pair_data[ws_exn][ws_channel]['mesg'][ws_one_key] = "No Data"
                    } else {
                        temp_ip_pair_data[ws_exn][ws_channel]['mesg'][ws_one_key] = formatDateTime(mesg_data['data'][ws_one_key])
                    }
                }
            }

            for (var item in ws_exns) {
                pair_data[ws_exns[item]][ws_ip][ws_channel]['current'] = temp_ip_pair_data[ws_exns[item]][ws_channel]['current']
                pair_data[ws_exns[item]][ws_ip][ws_channel]['mesg'] = temp_ip_pair_data[ws_exns[item]][ws_channel]['mesg']
            }


            if (now - show_last_ts > 5) {

                console.log(pair_data)
                $("#exchange_server_table td").unbind('click')
                $("#exchange_server_table td").bind('click', click_sub_data)

                show_last_ts = now

                datatable.rows().every(
                    function (rowIdx, tableLoop, rowLoop) {
                        var this_data = this.data();
                        var this_exn = this_data.target_file.split(" ")[1]

                        if (this_exn == 'rfinex') {
                            this_exn = 'rf'
                        }

                        // 当前行显示
                        var data_show = []
                        if(pair_data.hasOwnProperty(this_exn) && pair_data[this_exn].hasOwnProperty(this_data.ip)){
                            for (var channel in pair_data[this_exn][this_data.ip]) {
                                data_show.push(String(pair_data[this_exn][this_data.ip][channel]['current']) + "/" + String(pair_data[this_exn][this_data.ip][channel]['total']))
                            }
                        }
                        this_data.sub = data_show.join("<br>")
                        datatable.row(rowIdx).data(this_data).draw()


                        // 点开弹出框具体情况展示
                        var this_ev = $("#show_sub_data_modal")
                        if ($("#show_sub_data_modal").is(':visible') && this_ev.attr('data-ip') == this_data.ip && this_ev.attr('data-exchange') == this_exn) {
                            console.log("exn:", this_ev.attr('data-exchange'), this_exn, "ip:", this_ev.attr('data-ip'), this_data.ip)
                            var str = $("#show_sub_data_modal #ws_content").html()
                            var show_ws_str = function (pair_data) {
                                /**
                                 pair_data[ip][exn][chan] = {}
                                 pair_data[ip][exn][chan]['now'] = 0
                                 pair_data[ip][exn][chan]['total'] = lens
                                 pair_data[ip][exn][chan]['msg'] = []
                                 **/
                                var title = formatDateTime(now)
                                var str1 = []
                                var str2 = []
                                for (var channel in pair_data) {
                                    str1.push(channel + ": " + String(pair_data[channel]['current']) + "/" + String(pair_data[channel]['total']))
                                    var temp_str = []
                                    for (var one_key in pair_data[channel]['mesg']) {
                                        temp_str.push(one_key + ": " + pair_data[channel]['mesg'][one_key])
                                    }

                                    str2.push(temp_str.join("<br>"))
                                }
                                var str1_nums = str1.join("<br>")
                                var str2_msg = str2.join("<br>")

                                return " --------- " + title + " --------- " + "<br>" + str1_nums + str2_msg + "<br><br>"
                            }
                            // 每5秒更新现实
                            str = show_ws_str(pair_data[this_exn][this_data.ip]) + str
                            $("#show_sub_data_modal #ws_content").html(str)
                        }

                    })
            }

        }
    }

    function click_sub_data() {
        that = $(this)
        if (that.hasClass("subws")) {
            var that_parent = that.parent()
            var ip = that_parent.find("td:eq(1)").html()
            var server = that_parent.find("td:eq(2)").html()
            var exchange = that_parent.find("td:eq(3)").html().split(" ")[1]
            var symbol = that_parent.find("td:eq(5)").text()
            $("#show_sub_data_modal").modal()
            $("#show_sub_data_modal").attr('data-ip', ip)
            $("#show_sub_data_modal").attr('data-server', server)
            $("#show_sub_data_modal").attr('data-exchange', exchange)
            $("#show_sub_data_modal").attr('data-symbol', symbol)
            $("#modal-title-id").html(ip + " | " + server + " | " + exchange + " <br> " + symbol)
        }
    }

    $("#show_sub_data_modal").on("show.bs.modal", function () {
        $("#show_sub_data_modal #ws_content").html("")
    })

    $("#show_sub_data_modal").on("hide.bs.modal", function () {
        $("#show_sub_data_modal #ws_content").html("")
    })

    // search
    $(".serverSubmit").click(function () {
        $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
                var serverFilter = $(".serverFilter").val()
                var targetFilter = $(".targetFilter").val()
                var statusFilter = $(".statusFilter").val()
                var symbolFilter = $(".symbolFilter").val()

                var server_ip = data[1]
                var target = data[3]
                var status = data[5]
                var symbol = data[6]


                var server_ok = false
                if (serverFilter.length == 0) {
                    server_ok = true
                } else {
                    for (i in serverFilter) {
                        if (serverFilter[i] == server_ip) {
                            server_ok = true
                            break
                        }
                    }
                }

                var target_ok = false
                if (targetFilter.length == 0) {
                    target_ok = true
                } else {
                    for (i in targetFilter) {
                        if (targetFilter[i] == target) {
                            target_ok = true
                            break
                        }
                    }
                }


                var status_ok = false
                if (statusFilter.length == 0) {
                    status_ok = true
                } else {
                    for (i in statusFilter) {
                        if (statusFilter[i] == status) {
                            status_ok = true
                            break
                        }
                    }
                }

                var symbol_ok = false
                if (symbolFilter.length == 0) {
                    symbol_ok = true
                } else {
                    for (i in symbolFilter) {
                        var temp_symbol_arr = symbol.split(" ")
                        for (m in temp_symbol_arr) {
                            if (symbolFilter[i] == temp_symbol_arr[m]) {
                                symbol_ok = true
                                break
                            }
                        }
                    }

                }

                return server_ok && target_ok && status_ok && symbol_ok;
            }
        );
        datatable.draw();
        return true
    })


})

function get_reboot_status(mlm_id, row_index) {
    $.ajax({
        'url': "request_get_reboot_status",
        'data': {
            'mlm_id': mlm_id
        },
        'datatype': 'get',
        'success': function (e) {
            var d = datatable.row(row_index).data()
            d.cmd = e['data']['cmd']
            datatable.row(row_index).data(d).draw()
            if (d.cmd == 1) {
                reboot_done(mlm_id, row_index)
            }
        },
        'error': function (e) {
            console.log("error")
        },
        'ajaxComplete': function (e) {
            console.log("ajax")
        }
    })
}

function reboot_done(mlm_id, row_index) {
    $.ajax({
        'url': "request_done_reboot_status",
        'data': {
            'mlm_id': mlm_id
        },
        'datatype': 'get',
        'success': function (e) {
            delete wait_status["m_" + String(row_index)]

        },
        'error': function (e) {
            console.log("error")
        },
        'ajaxComplete': function (e) {
            console.log("ajax")
        }
    })

}

function check_status() {
    clearTimeout(s)
    for (i in wait_status) {
        var mlm_id = i.split("_")[1]
        get_reboot_status(mlm_id, wait_status[i])
    }
    var s = setTimeout("check_status()", 5000)
}

check_status()


