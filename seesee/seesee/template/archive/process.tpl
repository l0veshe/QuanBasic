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
                Process
                <small></small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Process</a></li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <!-- Small boxes (Stat box) -->

            <!-- Small boxes (Stat box) -->
            <div class="row">

                <div class="col-xs-12">

                    <div class="box">

                        <div id="workers_ws_recv" class="alert alert-info alert-dismissible" hidden="hidden">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                            Info alert preview. This alert is dismissable.
                        </div>


                        <div class="box-header">
                            <h3 class="box-title">All processes</h3>

                            <div class="box-tools">
                                <div class="input-group input-group-sm" style="width: 150px;">
                                    <input type="text" name="table_search" class="form-control pull-right" placeholder="Search">

                                    <div class="input-group-btn">
                                        <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body table-responsive no-padding">
                            <table class="table table-hover table-bordered" id="process_tab">
                                <thead>
                                <tr>
                                    <th>Server</th>
                                    <th>IP</th>
                                    <th>User</th>
                                    <th>Process_id</th>
                                    <th>CPU</th>
                                    <th>MEM</th>
                                    <th>CMD</th>
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>


            </div>


            <!-- /.row (main row) -->
        </section>
        <!-- /.content -->
    </div>
{% endblock %}

{% block footer %}

<script>
    var ws_addr = "{{ ws_url }}"
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
<script src="/static/dist/js/pages/archive/wb_status.js"></script>
<script src="/static/dist/js/pages/archive/process.js"></script>
{% endblock %}
