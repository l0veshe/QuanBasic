var columns = [];
var currency = [];
var tableInit;
var tableTotal;
var balance_name = 0;
var editor;

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

balance_name = GetQueryString("balance_name")
console.log(balance_name)


function redirectWorker() {
    $("#balance-back").on("click", function () {
        window.location.href = "balance?balance_name=" + balance_name
    })
}

function createInitTable() {

    if (!balance_name) {
        balance_name = ""
    }

    tableInit = $('#position_table').DataTable({
        "select": true,
        "dom": "tB",
        "scrollX": false,
        "pageLength": 100,
        "ajax": {
            url: 'request_balance_statement_init_postitions',
            data: {
                balance_name: balance_name,
                statement: "T",
            },
            dataSrc: 'data',
        },
        "columns": [
            {
                "data": "change",
                className: 'text-right'
            },
            {"data": "symbol"},
            {"data": "amount"},
            {"data": "remark"},
            {"data": "created_at"},
        ],
        "columnDefs": [],
        "initComplete": function () {
        },
        buttons: [
            {extend: "create", editor: editor},
            {extend: "remove", editor: editor}
        ]

    });
}

function createTotalTable() {

    if (!balance_name) {
        balance_name = ""
    }

    tableTotal = $('#total_position_table').DataTable({
        "select":true,
        "dom": "",
        "scrollX": false,
        "pageLength": 100,
        "order": [[ 1, "desc" ]],
        "ajax": {
            url: 'request_balance_statement_init_postitions',
            data: {
                balance_name: balance_name,
                statement: "T",
            },
            dataSrc: 'total',
        },
        "columns": [
            {"data": "symbol"},
            {"data": "amount"},
        ],
        "columnDefs": [],
        "initComplete": function () {
        },
    });
}


function editorInitTable(){
    editor = new $.fn.dataTable.Editor( {
        ajax:  'request_balance_statement_init_postitions',
        table: '#position_table',
        idSrc:  'id',
        fields: [
            {
                "label": "余额组",
                "name": "balance_name",
            },
            {
                "label": "转入/出",
                "name": "change",
                "type": "select",
                "options": [
                    { label: "转入", value: "+" },
                    { label: "转出", value: "-" },
                ]
            },
            {
                "label": "Symbol",
                "name": "symbol",
                "type": "select",
            },
            {
                "label": "Amount",
                "name": "amount",
            },
            {
                "label": "Date",
                "name": "created_at",
                "type":  'datetime',
                "format": "YYYY-MM-DD HH:mm",
                "def":   function () { return new Date(); }
            },
            {
                "label": "Remark",
                "name": "remark",
            },
        ],
        i18n: {
            create: {
                button: "增加",
                title:  "转入出记账",
                submit: "Submit"
            },
            remove: {
                button: "移除",
            },
            error: {
                system: ""
            },
        }
    } );

    editor.on( 'initCreate', function ( e ) {
        $.ajax({
            url: "/request_balance_netvalue_symbols",
            type: 'get',
            dataType: 'json',
            async: true,
            timeout: 10000,
            success: function (data) {
                if (data.success == true) {
                    var symbols = Array()
                    $.each(data.data, function(k,v){
                        console.log(k,v)
                        symbols.push(v['symbols'].toUpperCase())
                    })
                    symbols.sort()
                    editor.field('symbol').update(symbols)
                }
            },
            error: function (obj, info) {
                alert(obj.status + " " + obj.statusText)
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            }
        });
        editor.field('balance_name').set(balance_name).disable()
        editor.field('symbol').update([1,2,3,4])
    } );
}

function changeTitle(){
    $("#balance_statement_title").text(balance_name + " - " +$("#balance_statement_title").text() )
}


$(document).ready(function () {
    console.log("balance_statement")
    changeTitle()
    redirectWorker()
    editorInitTable()
    createInitTable()
    createTotalTable()
})


