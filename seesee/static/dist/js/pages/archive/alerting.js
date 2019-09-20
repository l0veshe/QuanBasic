
var table
var editor

$(document).ready(function () {

    table = $('#alerting_table').DataTable({
        "dom": "frtip",
        "scrollX": false,
        "bAutoWidth": true,
        "ajax": {
            url: 'request_alerting_setting',
            dataSrc: 'alerting_data'
        },
        "paging": false,
        "bLengthChange": false,
        "searching": false,
        "columns": [
            {"data": "id"},
            {"data": "groupname"},
            {
                "data": null,
                render: function (data, type, row) {
                    if (data['level'] == 'WARN'){
                        return ' <span class=\"label label-warning\">WARN</span>'
                    }
                        return data['level']
                }
            },
            {
                "data": null,
                render: function (data, type, row) {
                    var temp_arr = data['maillist'].split(';')
                    return temp_arr.join('<br>')
                }
            },
            {
                "data": null,
                render: function (data, type, row) {
                    var temp_arr = data['ddwebhooklist'].split(';')
                    return temp_arr.join('<br>')
                }
            },
            {
                "data": null,
                render: function (data, type, row) {
                    var temp_arr = data['yunpian'].split(';')
                    return temp_arr.join('<br>')
                }
            },

        ],
    });
})
