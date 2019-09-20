{% extends "./layouts/master.tpl" %}

{% block title %}
cmadmin
{% endblock %}

{% block head %}
<!-- Select2 -->
<link rel="stylesheet" href="/static/bower_components/select2/dist/css/select2.min.css">

<!-- DataTables -->
<link rel="stylesheet" href="/static/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">

<link rel="stylesheet" href="/static/bower_components/datatables/css/select.dataTables.min.css">
<link rel="stylesheet" href="/static/bower_components/datatables/css/buttons.dataTables.min.css">
<link rel="stylesheet" href="/static/bower_components/editor/css/dataTables.editor.css">
<link rel="stylesheet" href="/static/bower_components/editor/css/editor.bootstrap.css">

{% endblock %}


{% block content %}
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            Plots
            <small>plots</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="/index"><i class="fa fa-dashboard"></i> Plots</a></li>
        </ol>
    </section>

    <!-- Main content -->
    <section class="content">


        <!-- Small boxes (Stat box) -->
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Select Date</h3> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select class="select2" style="width:100px"></select>

                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title=""
                            data-original-title="Collapse">
                        <i class="fa fa-minus"></i></button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title=""
                            data-original-title="Remove">
                        <i class="fa fa-times"></i></button>
                </div>
            </div>
            <div class="box-body plots_show">
                Start creating your amazing application!
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
                Footer
            </div>
            <!-- /.box-footer-->
        </div>


        <!-- /.row (main row) -->

    </section>
    <!-- /.content -->
</div>


<div class="modal modal-info fade" id="show_sub_data_modal" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="modal-title-id">Sub Data</h4>
            </div>
            <div class="modal-body" id="ws_content">
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>


{% endblock %}

{% block footer %}
<script>
    var ws_addr = "{{ ws_url }}"
    var http_addr = "{{ http_url }}"


    $(document).ready(function (){

        $.ajax({
            type: "GET",
            dataType:'json',
            url: 'https://' + http_addr +'/plots_all_date',

            success: function(data){
                if(data.success == true){

                    $(".select2").select2({
                        placeholder: 'Select an option',
                        data: data.data
                    })

                    if(data.data.length > 0){
                        plots_show(data.data[0]['text'], http_addr)
                    }
                }else{
                    console.log(data.message);
                }
            }
        });

        $(".select2").on("change", function(){
            plots_show($(".select2 option:selected").text(), http_addr)
        })

    })

</script>
<!-- Select2 -->
<script src="/static/bower_components/select2/dist/js/select2.full.min.js"></script>

<!-- DataTables -->
<script src="/static/bower_components/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="/static/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>

<!-- DataTables -->
<script src="/static/bower_components/datatables/js/dataTables.buttons.min.js"></script>
<script src="/static/bower_components/datatables/js/buttons.bootstrap.min.js"></script>
<script src="/static/bower_components/datatables/js/dataTables.select.min.js"></script>
<!--
<script src="https://cdn.datatables.net/buttons/1.5.1/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.bootstrap.min.js"></script>
<script src="https://cdn.datatables.net/select/1.2.5/js/dataTables.select.min.js"></script>
-->
<script src="/static/bower_components/editor/js/dataTables.editor2.js"></script>
<script src="/static/bower_components/editor/js/editor.bootstrap.js"></script>


<!-- contec_web -->
<script src="/static/dist/js/pages/archive/plots.js"></script>
{% endblock %}
