var wait_status = {}
var table
var editor
//var onshow_show_sub_data_modal = false

//var test


$(document).ready(function () {


    table = $('#process_tab').DataTable({
        "dom": "frtip",
        lengthChange: true,
        searching   : true,
        ordering    : true,
        info        : true,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        autoWidth:true,
        iDisplayLength: 100,
        "scrollX": false,
        "ajax": {
            url: 'request_service_dict',
            dataSrc: 'service_dict'
        },
        "paging": false,
        "searching": false,
        "columns": [
            {"data": "server_name"},
            {"data": "ip"},
            {"data": "user"},
            {"data": "process_id"},
            {"data": "cpu"},
            {"data": "mem"},
            {"data": "cmd"},
        ],
        "columnDefs": [
            { "width": "20%", "targets": 0 }
        ]
    });


})

