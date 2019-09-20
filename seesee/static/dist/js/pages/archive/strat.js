/**
 * Created by hank on 2018/8/16.
 */

var wait_status = {}
var table
var editor
var rfresh_t
function refresh() {
    clearTimeout(rfresh_t)
    table.destroy();
    createTable();
    rfresh_t = setTimeout("refresh()", 1000*30)
}

function createTable(){
    table = $('#strat_table').DataTable({
        "dom": "Bfrtip",
        "scrollX": false,
        "bAutoWidth": true,
        "ajax": {
            url: 'request_strat_data',
            dataSrc: 'strat_data'
        },
        "paging": false,
        "bLengthChange": false,
        "searching": true,
        "columns": [
            {"data": "Id"},
            {"data": "host"},
            {"data": "strat_name"},
            {"data": "strat_pairs"},
            {"data": "status"},
            {"data": "is_alive"},
            {
                "data": null,
                render: function (data, type, row) {
                    var otime = parseInt(data['otime'])
                    var n_ts = (new Date()).valueOf()/1000;
                    return "<p class=\"text-info\"><strong>" + parseInt(n_ts - otime) + "</strong></p>"
                }
            },
            {
                "data": null,
                render: function (data, type, row) {
                    var otime = parseInt(data['ftime'])
                    var n_ts = (new Date()).valueOf()/1000;
                    return "<p class=\"text-info\"><strong>" + parseInt(n_ts - otime) + "</strong></p>"
                }
            },
            {
                "data": null,
                "className": "display",
                "render": function (data, type, row) {
                    if (typeof(data['progress']) == "string"){
                        var show_str = "<p data-display='"+data['progress'] +"' style='color:white;background-color: #178bff;width:100%'>" + data['display'] + "</p>"
                    }else{
                        var show_str = "<p data-display='"+data['progress'] +"'>" + data['display'] + "</p>"
                    }
                    return show_str
                }
            },
            {"data": null,
                "render": function (data, type, row) {
                    var re_str = ""
                    if (data['status'] == 1) {
                        re_str = '<button type="button" id="stop_strat" class="btn btn-block btn-sm btn-primary">Stop</button>'
                    } else if (data['status'] == 0) {
                        re_str = ''
                    }
                    return re_str
                }}
        ],
        select: false,
        buttons: [
        ],
        "fnInitComplete": function(oSettings, json) {
            $("table #stop_strat").on("click", function(){
                $this = $(this)
                var strat_id = $this.parent().parent().find("td:first").text()
                $.ajax({
                    'url': "request_strat_send_stop",
                    'data': {
                        'strat_id': strat_id,
                    },
                    'dataType': "json",
                    'datatype': 'get',
                    'beforeSend': function () {
                        console.log("before send")    // Handle the beforeSend event
                    },
                    'success': function (data) {
                        if (data['success']){
                            console.log("success")
                            refresh()
                        }else{
                            console.log(data['msg'])
                            alert(data['msg'])
                        }
                    },
                    'error': function (e) {
                        console.log("Code error")
                    },
                    'ajaxComplete': function (e) {
                    }
                })
            })

            $("#strat_table td").unbind('click')
            $("#strat_table td").bind('click', click_sub_data)
        }
    });
}

function click_sub_data() {
    that = $(this)
    var progress = that.find("p").attr("data-display")
    if (progress != "null"){
        $("#show_sub_data_modal").modal()
        $("#ws_content").html(progress)
    }
}


//var onshow_show_sub_data_modal = false

//var test

$(document).ready(function () {

    $(".select2").select2()

    /**
    editor = new $.fn.dataTable.Editor({
            input: {
                style: 'api'
            },
            ajax: {
                edit: {
                    type: 'POST',
                    url: 'request_workers_data',
                    data: function(data){
                        return(data);
                    }
                }
            },
            table: "#workers_table",
            idSrc: "id",
            fields: [
                {
                    label: "ID",
                    name: "id",
                }, {
                    label: "Constraint",
                    name: "constraint_params",
                }, {
                    label: "Status",
                    name: "status",
                }, {
                    label: "Grain",
                    name: "grain"
                }, {
                    label: "Is Master",
                    name: "ismaster"
                }
            ]
        })

    editor.on('initCreate', function (e, json, data) {
    });

    editor.on('initEdit', function (e, json, data) {
        editor.field('id').disable()
    })

    editor.on('preSubmit', function (e, json, data) {

    })**/

    createTable()
    rfresh_t = setTimeout("refresh()", 1000*30)

    $("#show_sub_data_modal").on("show.bs.modal", function () {
        $("#show_sub_data_modal #ws_content").html("")
    })

    $("#show_sub_data_modal").on("hide.bs.modal", function () {
        $("#show_sub_data_modal #ws_content").html("")
    })


    /**
    $('#exchange_server_table tbody').on('click', 'button', function () {
        button = $(this)
        this_row = table.row($(this).parents('tr')).index();

        button.attr('disabled', true)
        button.text('Sending CMD')
        send_reboot_status(button, this_row)
    });**/

    function send_reboot_status(button, row_index) {

        $.ajax({
            'url': "request_send_reboot_status",
            'data': {
                'target': table.row(row_index).data().target_file,
                'ip': table.row(row_index).data().ip
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
        var tr = table.rows()[0]
        $.each(tr, function (item) {
            var td = table.row(tr[item]).data()
            if (td['cmd'] != 0) {
                wait_status['m_' + td['id']] = tr[item]
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

function get_reboot_status(mlm_id, row_index) {
    $.ajax({
        'url': "request_get_reboot_status",
        'data': {
            'mlm_id': mlm_id
        },
        'datatype': 'get',
        'success': function (e) {
            var d = table.row(row_index).data()
            d.cmd = e['data']['cmd']
            table.row(row_index).data(d).draw()
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

/**
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
**/