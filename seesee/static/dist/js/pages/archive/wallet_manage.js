$(document).ready(function () {

    var myTable;
    BindItemTable();
    PopulateItemsTable();
    function BindItemTable() {
        myTable = $("#transfer_table").DataTable({
            "deferRender": true,
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "info": true,
            "autoWidth": false,
            "sDom": 'lfrtip',
            "fnCreatedRow": function( nRow, aData, iDataIndex ) {
                console.log(nRow,aData,iDataIndex);
                if (aData[6] === 'pending')
                {
                    $('td:eq(-1)', nRow).append("<button class='confirm_status btn btn-block btn-primary' value="+aData[12]+">确认到账</button>");
                }
            },
            oLanguage: {
                "sProcessing": "正在加载中......",
                "sLengthMenu": "_MENU_",
                "sZeroRecords": "无记录",
                "sEmptyTable": "表中无数据存在！",
                "sInfo": "当前显示 _START_ 到 _END_ 条，共 _MAX_  条记录",
                "sInfoEmpty": "没有数据",
                "sInfoFiltered": "数据表中共为 _TOTAL_ 条记录",
                "sSearch": " ",
                "oPaginate": {
                    "sFirst": " 首页 ",
                    "sPrevious": " 上一页 ",
                    "sNext": " 下一页 ",
                    "sLast": " 末页 "
                }
            },
        });
    }

    function PopulateItemsTable() {
        $.ajax({
            type: "get",
            url: "/transfer_records",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res){
                var jsonObject = JSON.parse(res.transfers);
                var result = jsonObject.map(function (item) {
                    var result = [];
                    console.log(item.fields.okex_account);
                    result.push(item.fields.okex_account);
                    result.push(item.fields.from_account);
                    result.push(item.fields.to_account);
                    result.push(item.fields.currency);
                    result.push(item.fields.amount);
                    result.push(item.fields.instrument_id);
                    result.push(item.fields.status);
                    result.push(item.fields.operator);
                    result.push(item.fields.created_at);
                    result.push(item.fields.updated_at);
                    result.push(item.fields.comment);
                    result.push(item.fields.response);
                    result.push(item.pk);
                    result.push('');
                    return result;
                });
                myTable.rows.add(result);
                myTable.draw();
                listen_status_btn();
            },

            failure: function() {
                $("#transfer_table").append(" Error when fetching data please contact administrator");
            }
        });
    }

    $("#account_from").change(function () {
        transfer_account = {"1":"币币", "3":"交割合约", "5":"币币杠杆", "6":"资金账户", "9":"永续合约"};
        from = $("#account_to").parents().find("#account_from").find("option:selected").val();
        sorted_accounts = Object.keys(transfer_account).sort();
        $("#account_to").empty();
        for (var index in sorted_accounts)
        {
            if (sorted_accounts[index] ===from)
                continue;
            var opt = document.createElement('option');
            opt.value = sorted_accounts[index];
            opt.text = transfer_account[sorted_accounts[index]];
            document.getElementById("account_to").appendChild(opt);
        }
        if (from==='5')
        {
            document.getElementById("instrument").style.display = "block"
        }else
        {
            document.getElementById("instrument").style.display = "none"
        }
    });

    $("#account_to").change(function () {
       account_to = $("#account_to").find("option:selected").val();
        from = $("#account_to").parents().find("#account_from").find("option:selected").val();
       if (account_to === '5'||from === '5')
       {
           document.getElementById("instrument").style.display = "block"
       }else {
           document.getElementById("instrument").style.display = "none"
       }
    });


    $("#transfer_currency").on('click', function () {
        okex_account = $("#user_account").find("option:selected").val();
        currency = $("#currency").val();
        account_from = $("#account_from").val();
        account_to = $("#account_to").val();
        amount = $("#transfer_amount").val();
        instrument_id = $("#instrument").find("#instrument_id").val();
        operator = $("#operator").find("#operator_name").val();
        comment = $("#comment").find("#comment_input").val();
        if (okex_account == null || currency === "" || account_from == null || account_to === ""|| amount === null) {
            alert('参数不能为空')
        }

        if (okex_account === '') {
            alert('请选择账号！')
        }

        if (account_from === '5' || account_to === '5')
        {
            if (instrument_id === "")
            {
                alert('杠杆币币账户必须填写币对');
                return
            }
        }else {
            instrument_id = ''
        }



        if (account_from === '0' || account_to === '0')
        {

        }
        $.ajax({
            url:'/transfer',
            method: 'post',
            data:{
                'account': okex_account,
                'currency': currency,
                'from': account_from,
                'to': account_to,
                'amount':amount,
                'sub_account':'',
                'instrument_id':instrument_id,
                'operator':operator,
                'comment':comment
            },
            success:function (res) {
                if (res.code === 200)
                {
                    alert(res.msg);
                    PopulateItemsTable();

                }else {
                    alert(res.msg)
                }
            }
        })
    });
    function listen_status_btn()
    {
        $(".confirm_status").on('click', function () {
            console.log('click confirm status');
            var id = $(".confirm_status").val();
            $.ajax({
                url:'/transfer_status',
                method:'post',
                data:{
                    'id':id
                },
                success:function (res) {
                    if (res.code===200)
                    {
                        alert('更新状态成功');
                        window.location.reload()
                    }else {
                        alert('更新失败')
                    }

                }
            })

        })
    }


});

