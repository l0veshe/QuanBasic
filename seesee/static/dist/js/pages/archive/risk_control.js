var columns = [];
var currency = [];
var risk_table;
var balance_name = 0;
var editor;
var test;

function RiskControlTable() {

    risk_table = $('#risk_control_table').DataTable({
        "select": true,
        dom: 'tB',
        "scrollX": false,
        "pageLength": 100,
        "ajax": {
            url: 'request_risk_control_all',
        },
        "columns": [
            {"data": "balance_name"},
            {
                "data": null, render: function (data) {
                    var re_str_l = []
                    $.each(data['strats'], function (k, v) {
                        str =  v['strat_status_id'] + " " + v['host'] + "_" + v['strat_name'] + "_" + v['strat_pairs']
                        if (v['is_alive'] != 1) {
                            str = "<div class='text-red'><i class='fa fa-times-circle'></i> " + str + "</div>"
                        }else{
                            str = "<div class='text-black'>" + str + "</div>"
                        }
                        re_str_l.push(str)
                    })
                    var re_str = re_str_l.join(" ")
                    return re_str
                }
            },
            {"data": "listen"},

        ],
        "columnDefs": [],
        "initComplete": function () {
        },
        buttons: [
            {extend: "edit", editor: editor}
        ]

    });
}

function editorInitTable(){
    editor = new $.fn.dataTable.Editor( {
        ajax:  'request_risk_control',
        table: '#risk_control_table',
        idSrc:  'balance_name',
        fields: [
            {
                "label": "BalanceGroup",
                "name": "balance_name",
            },
            {
                "label": "RelatedStrategy",
                "name": "strats",
                "type": "select",
                "multiple": true,
            },
            {
                "label": "strats_hidden",
                "name": "strats_hidden",
            }
        ],
        i18n: {
            edit: {
                button: "编辑",
                title:  "更改 BalanceGroup 风控设置",
                submit: "Submit"
            },

        }
    } );

    editor.on( 'open', function ( e) {
        $(".DTE_Field_Name_strats_hidden").hide()
        $(".modal-content").css("width", "800px")
        $(".DTE DTE_Action_Edit").css("width", "800px")
        editor.field('balance_name').disable()

        $.ajax({
            url: "/request_strat_data",
            type: 'get',
            dataType: 'json',
            async: true,
            timeout: 10000,
            success: function (data) {
                var modifier = editor.modifier();
                var data_s = risk_table.row( modifier ).data();
                current_strats = []
                $.each(data_s['strats'], function(k,vs){
                    current_strats.push(Number(vs['strat_status_id']))
                })
                console.log(current_strats)

                if (data.success == true) {
                    var symbols = Array()
                    $.each(data.strat_data, function(k,v){
                        function in_array(arr, val) {
                            for( i in arr){
                                if (arr[i] == val){
                                    return true
                                }
                            }
                            return false
                        }
                        str =  v['Id'] + " " + v['host'] + "_" + v['strat_name'] + "_" + v['strat_pairs']
                        if (in_array(current_strats, v["Id"])){
                            $("#DTE_Field_strats").append($("<option selected='selected'></option>")
                                .attr("value", v['Id'])
                                .text(str));
                            $("#DTE_Field_strats_hidden").val($("#DTE_Field_strats").val())

                        }else{
                            $("#DTE_Field_strats").append($("<option></option>")
                                .attr("value", v['Id'])
                                .text(str));
                        }

                    })
                }
            },
            error: function (obj, info) {
                alert(obj.status + " " + obj.statusText)
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            }
        });


        $("#DTE_Field_strats").addClass("select2").css("width", "100%")
        $("#DTE_Field_strats").select2().on('change', function (e) {
            $("#DTE_Field_strats_hidden").val($("#DTE_Field_strats").val())
        })
    } );

    $("#DTE_Field_strats").on("change", function () {
        console.log($("#DTE_Field_strats").val())
    })

    editor.on( 'preSubmit', function ( e) {
        console.log(editor.field('balance_name').val())
        console.log($("#DTE_Field_strats").val())
    })

    editor.on('submitComplete', function(e){
        console.log(e)
        window.location.reload()
    })
}

function to_select2(){

}

$(document).ready(function () {
    console.log("risk_control_table")
    editorInitTable()
    RiskControlTable()

})


