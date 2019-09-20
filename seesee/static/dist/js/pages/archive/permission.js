function auth_user_rest() {
    $('#auth_user_select').select2({
        placeholder: 'Please select user',//默认文字提示
        ajax: {
            type: 'GET',
            url: '/request_auth_user',
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
                    var status = ""
                    var isadmin = ""
                    if(data[item]["admin"] == 1){
                        isadmin = "管理员"
                    }else{
                    }
                    if(data[item]["status"] == 1){
                        status = "Enable"
                    }else{
                        status = "Disable"
                    }
                    var tail = " (" + status + " " + isadmin + ")"
                    itemList.push({
                        id: data[item]['id'],
                        text: data[item]["name"] +  tail
                    })
                })
                server_list = itemList
                return {
                    results: itemList,//itemList
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

function page_select_dbclick(){
    $('#page_unselected option').dblclick(function () {
        $("#page_unselected option:selected").each(function () {
            var new_v = $(this).val();
            $("#page_selected").append("<option value='"+new_v+"'>"+new_v+"</optionva>");
            page_select_dbclick();
            $("#page_unselected option:selected").remove()
        });
    })

    $('#page_selected option').dblclick(function () {
        $("#page_selected option:selected").each(function () {
            var new_v = $(this).val();
            $("#page_unselected").append("<option value='"+new_v+"'>"+new_v+"</optionva>");
            page_select_dbclick();
            $("#page_selected option:selected").remove()
        });
    })
}


function account_select_dbclick(){
    $('#account_unselected option').dblclick(function () {
        $("#account_unselected option:selected").each(function () {
            var new_v = $(this).val();
            $("#account_selected").append("<option value='"+new_v+"'>"+new_v+"</optionva>");
            account_select_dbclick()
            $("#account_unselected option:selected").remove()
        });
    })

    $('#account_selected option').dblclick(function () {
        $("#account_selected option:selected").each(function () {
            var new_v = $(this).val();
            $("#account_unselected").append("<option value='"+new_v+"'>"+new_v+"</optionva>");
            account_select_dbclick()
            $("#account_selected option:selected").remove()
        });
    })
}

function auth_user_change(){
    $('#auth_user_select').on("change", function (e) {

        $("#page_unselected").empty();
        $("#page_selected").empty();
        $("#account_unselected").empty();
        $("#account_selected").empty();

        var select_id = $('#auth_user_select').val().trim()
        if(select_id == ""){
            return false
        }else{
            console.log(select_id)

            $.ajax({
                url: "/request_auth_path",
                data: {
                    'id': select_id,
                },
                type: "post",
                async: true,
                timeout: 25000,
                dataType: "json",
                success: function (data) {
                    $.each(data['data']['unselected'], function(k,v){
                        $("#page_unselected").append("<option>"+v+"</option>");

                    })
                    $.each(data['data']['selected'], function(k,v){
                        $("#page_selected").append("<option value='"+v+"'>"+v+"</optionva>");
                    })

                    page_select_dbclick()

                    //$("#sub_and_ana").click()
                    if (!data.success){
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
                }
            });

            $.ajax({
                url: "/request_auth_account",
                data: {
                    'id': select_id,
                },
                type: "post",
                async: true,
                timeout: 25000,
                dataType: "json",
                success: function (data) {
                    $.each(data['data']['unselected'], function(k,v){
                        $("#account_unselected").append("<option>"+v+"</option>");

                    })
                    $.each(data['data']['selected'], function(k,v){
                        $("#account_selected").append("<option value='"+v+"'>"+v+"</optionva>");
                    })

                    account_select_dbclick()

                    //$("#sub_and_ana").click()
                    if (!data.success){
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
                }
            });

        }
    })
}

function permission_sub_click(){
    $('#permission_sub').on("click", function (e) {
        var select_id = $('#auth_user_select').val().trim()
        if (select_id==""){
            return false
        }
        var page_selected = []
        $.each($('#page_selected option'), function (k,v) {
            page_selected.push($(v).text())
        })
        var account_selected = []
        $.each($('#account_selected option'), function (k,v) {
            account_selected.push($(v).text())
        })
        console.log(select_id)
        console.log(page_selected)
        console.log(account_selected)

        $.ajax({
            url: "/request_auth_user",
            data: {
                'id': select_id,
                'page_selected': page_selected,
                'account_selected':account_selected,
            },
            type: "post",
            async: true,
            timeout: 25000,
            dataType: "json",
            success: function (data) {


                if (data['success']){
                    alert('Success!')
                }else{
                    alert(data.msg)
                }
            },
            error: function (obj, info) {
                alert(obj.status + " " + obj.statusText)
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                if (status == 'timeout') {//超时,status还有success,error等值的情况
                    ajaxTimeOut.abort(); //取消请求
                    alert("请求超时");
                }
            }
        });
    })
}


function passgen_click() {
    $('#gen_pass').on("click", function (e) {
        var passwd = $("#gen_pass_str").val() + $("#gen_pass_salt").val();
        var hash = md5(window.btoa(passwd));
        $("#gen_pass_hash").val(hash)
        console.log(hash)

    })
}

$(document).ready(function () {

    passgen_click()
    auth_user_rest()
    auth_user_change()
    permission_sub_click()
})
