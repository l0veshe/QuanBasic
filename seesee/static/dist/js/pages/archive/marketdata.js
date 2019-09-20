/**
 * Created by hank on 2018/8/9.
 */

$(document).ready(function () {

    Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    }
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };


    //Money Euro
    $('[data-mask]').inputmask()

    $('#symbol_select').select2()

    // symbol global
    var EDIT_SERVER = ""
    var EDIT_TARGET = ""
    var EDIT_SYMBOL = []
    var NOW_ADD_SYMBOL= []
    var NOW_SUB_SYMBOL= []

    var server_list = []

    //$(".select2").select2();
    function server_select_rest(){
        $('#server_select').select2({
            placeholder: 'Please select',//默认文字提示
            ajax: {
                type: 'GET',
                url: '/request_server',
                dataType: 'json',
                /*data: function (params) {
                 return {
                 q: params.term, // search term 请求参数 ， 请求框中输入的参数
                 page: params.page
                 };
                 },*/
                processResults: function (data, params) {
                    params.page = params.page || 1;
                    var itemList = [];
                    data = data.data
                    $.each(data, function (item) {
                        itemList.push({
                            id: data[item]["id"],
                            text: data[item]["ip"] + " " + data[item]["hostname"]
                        })
                    })
                    server_list = itemList
                    console.log(server_list)
                    return {
                        results: itemList,//itemList
                        pagination: {
                            more: (params.page * 30) < data.total_count
                        }
                    };

                }
            },

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
            }, // 函数用于呈现当前的选择

        });
    }

    server_select_rest()



    $('#server_select').on("change", function (e) {
        if ($("#server_select").val() == null){
            $("#target_file_form").hide()
            $("#symbol_from").hide()
            $("#target_file_select").empty().trigger('chagne')
            $("#symbol_select").empty().trigger('chagne')

        }

        selected_show(false)
        $("#symbol_select").html("")
        $("#symbol_select").trigger("change")
        console.log($("#server_select").val());
        var selected_server = $("#server_select").val()
        var selected_new = false
        $.each(server_list, function (i, item) {
            if (selected_server == server_list[i]['text']) {
                selected_new = true
            }
        })
        if (selected_new && $("#server_select").val() != null) {
            add_server()
        } else {
            selected_show(true)
            if ($.trim($('#target_file_select').val()) != ""){
                console.log("------------------")
                $('#target_file_select').trigger('change')

            }
        }
    });

    // 添加服务器
    function add_server() {
        $("#modal_new_server").modal("show")
        var selected_server = $("#server_select").val()
        selected_server_list = selected_server.split(" ")
        if (selected_server_list.length == 2) {
            $("#modal_new_server_ip").val(selected_server_list[0])
            $("#modal_new_server_hostname").val(selected_server_list[1])
        } else if (selected_server_list.length == 1) {
            $("#modal_new_server_hostname").val(selected_server_list[0])
        }
    }

    // 提交添加服务器
    $("#modal_new_server_ip_submit").on("click", function () {
        var new_server_ip = $("#modal_new_server_ip").val()
        var new_server_hostname = $("#modal_new_server_hostname").val()
        $.ajax({
            url: "/request_add_server",
            data: {
                'ip': new_server_ip,
                'hostname': new_server_hostname
            },
            type: "post",
            async: true,
            timeout: 25000,
            success: function (data) {
                console.log(data)
                if (data.success) {
                    alert("添加成功")
                    $("#modal_new_server").modal("hide")
                    $("#modal_new_server_ip").val("")
                    $("#modal_new_server_hostname").val("")
                } else {
                    alert("添加失败 \r" + data.msg)
                }
            },
            error: function (obj, info) {
                alert(obj.status + " " + obj.statusText)
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            }
        });
    })

    //选择host后显示
    function selected_show(show) {
        if (show) {
            $("#target_file_form").show()
        } else {
            $("#target_file_form").hide()
        }
    }

    // 显示所有targetfile
    $('#target_file_select').select2({
        ajax: {
            type: 'POST',
            url: '/request_target_file_by_server',
            dataType: 'json',
            data: function (params) {
                return {
                    'ip': $("#server_select option:selected").text().split(" ")[0]
                };
            },
            processResults: function (data, params) {
                console.log(data)
                params.page = params.page || 1;
                var itemList = [];
                for (item in data.data) {
                    itemList.push({id: item, text: data.data[item]["target_file"], selected: true})
                }
                server_list = itemList
                return {
                    results: itemList,//itemList
                    pagination: {
                        more: (params.page * 30) < data.total_count
                    }
                };

            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                //target_file_select_change()
            },

        },

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
        } // 函数用于呈现当前的选择
    });


    // listen target_file_select
    $('#target_file_select').on("change", function (e) {
    //function target_file_select_change() {
        $('#symbol_from').show()
        if ($("#target_file_select option:selected").text() == "") {
            return false;
        }

        $.ajax({
            url: "/request_symbol_by_targetfile_and_server",
            data: {
                'target': $("#target_file_select option:selected").text(),
                'ip': $("#server_select option:selected").text().split(" ")[0]
            },
            type: 'post',
            dataType: 'json',
            async: true,
            timeout: 10000,
            success: function (data) {
                console.log(data)
                if(data.success){
                    var itemList = [];
                    for (item in data.data) {
                        itemList.push({id: item,
                            value:data.data[item]["symbol"],
                            text: data.data[item]["symbol"],
                            selected: data.data[item]["selected"],
                            disabled: data.data[item]["disabled"]} )
                    }

                    $("#symbol_select").html("")

                    $("#symbol_select").select2({
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

                    symbol_global(server = $("#server_select option:selected").text().split(" ")[0],
                        target = $("#target_file_select option:selected").text(),
                        symbol = $("#symbol_select").select2('data'))
                }else{
                    console.log(data.msg)
                    $("#symbol_select").html("")
                }
            },
            error: function (obj, info) {
                alert(obj.status + " " + obj.statusText)
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            }
        });
    })


    // symbol global edit
    function symbol_global(server, target, symbol){
        EDIT_SERVER = server
        EDIT_TARGET = target
        symbol_list = []
        $.each(symbol, function (item) {
            symbol_list.push(symbol[item]['text'])
        })
        EDIT_SYMBOL = symbol_list
        console.log(EDIT_SYMBOL)
    }

    // symbol clear
    function symbol_global_clear(){
        EDIT_SERVER = ""
        EDIT_TARGET = ""
        EDIT_SYMBOL = []

    }

    // sub_and_ana listen click
    $("#sub_and_ana").on("click", function () {


        var now_symbol = $("#symbol_select").select2('data')
        var now_symbol_list = []
        $.each(now_symbol, function (item) {
            now_symbol_list.push(now_symbol[item]['text'])
        })
        EDIT_NOW_SYMBOL = now_symbol_list
        temp_EDIT_SYMBOL = EDIT_SYMBOL.concat()
        now_add_symbol = []
        now_min_symbol = []
        var temp_edit_symbol = EDIT_SYMBOL
        for(i in EDIT_NOW_SYMBOL){
            var exist = false
            for(m in EDIT_SYMBOL){
                if(EDIT_NOW_SYMBOL[i] == EDIT_SYMBOL[m]){
                    exist = true
                    temp_edit_symbol.remove(EDIT_NOW_SYMBOL[i])
                    break
                }
            }
            if (exist != true){
                now_add_symbol.push(EDIT_NOW_SYMBOL[i])
            }
        }
        EDIT_SYMBOL = temp_EDIT_SYMBOL.concat()
        now_min_symbol = temp_edit_symbol
        NOW_ADD_SYMBOL = now_add_symbol
        NOW_SUB_SYMBOL = now_min_symbol

        $("#edit_symble_ip").html("IP: " + EDIT_SERVER)
        $("#edit_symble_target").html("TARGET: " + EDIT_TARGET)
        $("#edit_symble_add_symbol").html("Add symbol: " + now_add_symbol.join(","))
        $("#edit_symble_sub_symbol").html("Sub symbol: " + now_min_symbol.join(","))
        $("#symbol_edit_modal").modal("show")
    })

    // listen edit_symble_submit
    $("#edit_symble_submit").on("click", function () {
        $.ajax({
            url: "/request_edit_symble_submit",
            data: {
                'ip': EDIT_SERVER,
                'target': $("#target_file_select option:selected").text(),
                'add_symbol': JSON.stringify(NOW_ADD_SYMBOL),
                'sub_symbol': JSON.stringify(NOW_SUB_SYMBOL),
            },
            type: "post",
            async: true,
            timeout: 25000,
            dataType: "json",
            success: function (data) {
                console.log(data)
                //$("#sub_and_ana").click()
                if (data.success){
                    alert("修改成功!")
                } else{
                    alert(data.msg)
                }
            },
            error: function (obj, info) {
                alert(obj.status + " " + obj.statusText)
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                $("#result_del_submit_close").click()
                if (status == 'timeout') {//超时,status还有success,error等值的情况
                    ajaxTimeOut.abort(); //取消请求
                    alert("请求超时");
                }

                $("#server_select").empty().trigger('change')



                //$("#server_select").html("").trigger("change")
                //$("#target_file_select").html("")
                //$("#symbol_from").hide()
                // do sth reload

            }
        });
    })


        // set target_file_select val
    /*function set_target_file_select() {
        var ip = $("#server_select option:selected").text().split(" ")[0]
        var target = $("#target_file_select option:selected").text()

        $.ajax({
            url: "/request_symbol_by_targetfile_and_server",
            data: {
                'ip': ip,
                'target': target
            },
            type: 'post',
            async: true,
            timeout: 25000,
            success: function (data) {
                console.log(data)
                $("#server_select").select
            },
            error: function (obj, info) {
                alert(obj.status + " " + obj.statusText)
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数

            }
        });


    }*/

    // symbol
    //$('#symbol_select').select2();

    /*function get_server() {
     $.ajax({
     url: "/request_server",
     data: {
     },
     async: true,
     timeout: 25000,
     success: function (data) {
     console.log(data)
     $("#server_select").select
     },
     error: function (obj, info) {
     alert(obj.status + " " + obj.statusText)
     },
     complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数

     }
     });

     }*/

})
