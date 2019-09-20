/**
 * Created by hank on 2018/8/16.
 */

var wait_status = {}
var table
var editor
var rfresh_t
function refresh() {
    console.log(11111)
    clearTimeout(rfresh_t)
    table.destroy();
    createTable();
    rfresh_t = setTimeout("refresh()", 1000*30)
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

var balance_name = GetQueryString("balance_name")


function add_wait() {
    var tr = table.rows()[0]
    $.each(tr, function (item) {
        var td = table.row(tr[item]).data()
        if ('cmd' in td){
            if (td['cmd'] != 0) {
                wait_status['m_' + td['id']] = [td.account, td.ip]
            }
        }

    })
}


function createTable(){

    if(!balance_name){balance_name=""}

    table = $('#workers_table').DataTable({
        "dom": "Bfrtip",
        "scrollX": false,
        "bAutoWidth": true,
        "ajax": {
            url: 'request_new_workers_data',
            data:{
                balance_name:balance_name,
            },
            dataSrc: 'workers_data',
        },
        "paging": false,
        "bLengthChange": false,
        "searching": true,
        "columns": [
            {"data": "id"},
            {
                "data": null,
                render: function (data, type, row) {
                    //return "<p class=\"text-info\"><strong>" + data['exchange'] + "</strong></p>"
                    if(data['exn']){
                        return data['exn']
                    }else{
                        return ""
                    }
                }
            },
            {"data": "account"}, /**
             {
                "data": null,
                "className": "subws",
                render: function (data, type, row) {
                    /**
                    if (data['sub_mesg']) {
                        return data['sub_mesg']
                    } else {
                        //console.log(data)
                        if (data['status'] == 0) {
                            return "<p class=\"text-info\"><strong>Stopped</strong></p>"
                        } else {
                            return "<p class=\"text-warning\"><strong>No_recv</strong></p>"

                        }
                    }
                    return "Null"
                }
            },
             {
                "data": null,
                render: function (data, type, row) {
                    if (data['status'] == 1) {
                        return "Running"
                    } else {
                        return "Stopped"
                    }
                }
            }**/
            {"data": "ip"},
            {"data": "hostname"},
            {
                "data": null,
                render: function (data, type, row) {
                    if (data['co_alive'] == 1){
                        return "<p class=\"text-info\"><strong>" + data['co_orders'] +"</strong></p>"
                    }else{
                        return "<p class=\"text-warning\"><strong>" + data['co_orders'] +"</strong></p>"
                    }

                }
            },
            {
                "data": null,
                render: function (data, type, row) {
                    if (data['fo_alive'] == 1){
                        return "<p class=\"text-info\"><strong>" + data['fo_orders'] +"</strong></p>"
                    }else{
                        return "<p class=\"text-warning\"><strong>" + data['fo_orders'] +"</strong></p>"
                    }

                }
            },
            {
                "data": null,
                render: function (data, type, row) {
                    if (data['oo_alive'] == 1){
                        return "<p class=\"text-info\"><strong>" + data['oo_orders'] +"</strong></p>"
                    }else{
                        return "<p class=\"text-warning\"><strong>" + data['oo_orders'] +"</strong></p>"
                    }

                }
            },
            {
                "data": null,
                render: function (data, type, row) {
                    if (data['po_alive'] == 1){
                        return "<p class=\"text-info\"><strong>" + data['po_orders'] +"</strong></p>"
                    }else{
                        return "<p class=\"text-warning\"><strong>" + data['po_orders'] +"</strong></p>"
                    }

                }
            },
            {
                "data": null,
                render: function (data, type, row) {
                    if (data['client_alive'] == 1){
                        return "<p class=\"text-info\"><strong>" + data['client_orders'] +"</strong></p>"
                    }else{
                        return "<p class=\"text-warning\"><strong>" + data['client_orders'] +"</strong></p>"
                    }

                }
            },
            {
                "data": null,
                render: function (data, type, row) {
                    if (data['snapshot_alive'] == 1){
                        return "<p class=\"text-info\"><strong>" + data['snapshot_orders'] +"</strong></p>"
                    }else{
                        return "<p class=\"text-warning\"><strong>" + data['snapshot_orders'] +"</strong></p>"
                    }

                }
            },
            {"data": "updated_at"},
        ],
        "columnDefs": [{
            "targets": [12],
            "render": function (data, type, row) {
                var re_str = ""
                if (row['cmd'] == 0) {
                    re_str = '<button type="button" id="reboot_target" class="btn btn-block btn-sm btn-primary">Reboot</button>'
                } else if (row['cmd'] == 5) {
                    re_str = '<button type="button" id="reboot_target" class="btn btn-block btn-sm btn-primary" disabled>Waitting ANS</button>'
                } else if (row['cmd'] == 4) {
                    re_str = '<button type="button" id="reboot_target" class="btn btn-block btn-sm btn-primary" disabled>Rebooting</button>'
                } else if (row['cmd'] == 3) {
                    re_str = '<button type="button" id="reboot_target" class="btn btn-block btn-sm btn-primary" >Reboot Done</button>'
                } else if (row['cmd'] == 2) {
                    re_str = '<button type="button" id="reboot_target" class="btn btn-block btn-sm btn-primary" disabled>异常</button>'
                } else {
                    re_str = '<button type="button" id="reboot_target" class="btn btn-block btn-sm btn-primary" disabled>未注册</button>'
                }
                return re_str
            }
        },
        ],
        "initComplete": function () {
            add_wait()
        },
        select: true,
        buttons: [
        ],
    });
}

//var onshow_show_sub_data_modal = false

//var test

function redirectBalance(){
    $("#balance-balance").on("click", function () {
        window.open("balance?balance_name=" + balance_name);

    })
}

$(document).ready(function () {

    redirectBalance()

    $(".select2").select2()


    createTable()
    //rfresh_t = setTimeout("refresh()", 1000*30)

    $('#workers_table tbody').on('click', 'button', function () {
        button = $(this)
        console.log(button.attr('id'))
        if (button.attr('id') == 'reboot_target'){
            this_row = table.row($(this).parents('tr')).index();
            button.attr('disabled', true)
            button.text('Sending CMD')
            send_reboot_status(button, this_row)
        }
    });

    function send_reboot_status(button, row_index) {


        $.ajax({
            'url': "request_new_worker_send_reboot",
            'data': {
                'account': table.row(row_index).data().account,
                'ip': table.row(row_index).data().ip
            },
            'datatype': 'get',
            'beforeSend': function () {
                console.log("before send")    // Handle the beforeSend event
            },
            'success': function (e) {
                wait_status['m_' + row_index]  = [table.row(row_index).data().account, table.row(row_index).data().ip]
            },
            'error': function (e) {
            },
            'ajaxComplete': function (e) {
            }
        })
    }


    var webst = Wbs()

    webst.on_mesg_func(on_mesg_change_one_row_status, table)

    webst.wsconn(ws_addr, "/ws/ws_status?task=new_worker_status")

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
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    };


    function on_mesg_change_one_row_status(table, mesg_data) {
        if (mesg_data['ws_send_type'] == "oooo") {
            table.rows().every(
                function (rowIdx, tableLoop, rowLoop) {
                    var d = this.data();
                    if (d.ip == mesg_data['ip'] && d.accountname == mesg_data['account']) {
                        var date = new Date(mesg_data['timestamp'] * 1000);
                        var hours = date.getHours();
                        var minutes = "0" + date.getMinutes();
                        var seconds = "0" + date.getSeconds();
                        d.sub_mesg = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                        temp = '<div class=\"tooltip\" role=\"tooltip\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\">'+ JSON.stringify(mesg_data, null, 2)+ '</div></div>'
                        table.row(rowIdx).data(d).draw()
                        var this_ev = $("#show_sub_data_modal")
                        if (this_ev.attr('data-ip') == mesg_data['ip'] && this_ev.attr('data-account') == mesg_data['account'] && $("#show_sub_data_modal").is(':visible')){
                            var str = $("#show_sub_data_modal #ws_content").html()
                            var show_ws_str = function(dict){
                                var task = dict['task']
                                var time = dict['tm']
                                delete dict['tm']
                                delete dict['task']
                                var temp_str =JSON.stringify(dict, null, "<br>").replace("{", "").replace("}", "");
                                time = formatDateTime(time)
                                temp_str = "<br>------ " + time + " ------" + temp_str + "<br>" + JSON.stringify(task, null, 2)
                                return temp_str
                            }
                            str = show_ws_str(mesg_data['data']) + str
                            $("#show_sub_data_modal #ws_content").html(str)
                        }
                        return true;
                    }
                }
            )
        }

        $("#workers_table td").unbind('click')
        $("#workers_table td").bind('click', click_sub_data)
    }


    function click_sub_data() {
        that = $(this)
        if (that.hasClass("subws")){
            var that_parent = that.parent()
            var account = that_parent.find("td:eq(2)").html()
            var ip = that_parent.find("td:eq(5)").html()
            var exchange = that_parent.find("td:eq(1)").text()
            $("#show_sub_data_modal").modal()
            $("#show_sub_data_modal").attr('data-account',account)
            $("#show_sub_data_modal").attr('data-ip', ip)
            $("#show_sub_data_modal").attr('data-exchange', exchange)
            $("#modal-title-id").text(exchange + " | " + account + " | " + ip)
            $("#modal-title-id").text(exchange + " | " + account + " | " + ip)
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
            function( settings, data, dataIndex ) {
                var serverFilter= $(".serverFilter").val()
                var accountFilter= $(".accountFilter").val()
                var statusFilter= $(".statusFilter").val()

                var server_ip = data[5]
                var status = data[4]
                var account = data[2]

                console.log(server_ip)
                console.log(status)
                console.log(account)


                var server_ok = false
                if(serverFilter.length == 0){
                    server_ok = true
                }else {
                    for (i in serverFilter){
                        if (serverFilter[i] == server_ip){
                            server_ok = true
                            break
                        }
                    }
                }

                var account_ok = false
                if(accountFilter.length == 0){
                    account_ok = true
                }else{
                    for (i in accountFilter){
                        if (accountFilter[i] == account){
                            account_ok = true
                            break
                        }
                    }
                }

                var status_ok = false
                if(statusFilter.length == 0){
                    status_ok = true
                }else {
                    for (i in statusFilter){
                        if (statusFilter[i] == status){
                            status_ok = true
                            break
                        }
                    }
                }

                return server_ok && status_ok && account_ok;
            }
        );
        table.draw();
        return true
    })


})

function get_reboot_status(row_index, account, ip) {
    console.log(account, ip)
    $.ajax({
        'url': "request_new_worker_get_reboot_status",
        'data': {
            'account': account,
            'ip': ip
        },
        'datatype': 'get',
        'success': function (e) {
            var d = table.row(row_index).data()
            console.log(e)
            d.cmd = e['cmd']
            table.row(row_index).data(d).draw()
            if (d.cmd == 3) {
                reboot_done(row_index, account, ip)
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

function reboot_done(row_index, account, ip) {
    $.ajax({
        'url': "request_new_worker_reboot_done",
        'data': {
            'account': account,
            'ip': ip
        },
        'datatype': 'get',
        'success': function (e) {
            delete wait_status["m_" + String(row_index)]
            var d = table.row(row_index).data()
            d.cmd = 0
            table.row(row_index).data(d).draw()

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
    console.log(wait_status)
    clearTimeout(s)
    for (i in wait_status) {
        console.log("~~~~~~~")
        console.log(i)
        row_index = i.split("_")[1]
        account = wait_status[i][0]
        ip = wait_status[i][1]
        get_reboot_status(row_index, account, ip)
    }
    var s = setTimeout("check_status()", 5000)
}

check_status()

