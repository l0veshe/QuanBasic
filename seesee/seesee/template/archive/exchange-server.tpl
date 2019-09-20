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
            Exchange-server
            <small>manage exchange server</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="/index"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Exchange-server</li>
        </ol>
    </section>

    <!-- Main content -->
    <section class="content">


        <!-- SELECT2 -->
        <div class="box box-default">
            <div class="box-header with-border">
                <h3 class="box-title">Conditional filtering</h3>

                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                    </button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-remove"></i>
                    </button>
                </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <div class="row">
                    <div class="col-md-6">
                        <!-- server -->
                        <div class="form-group">
                            <label>Server</label>
                            <select class="form-control select2 serverFilter" multiple="multiple"
                                    data-placeholder="Select one or more servers"
                                    style="width: 100%;">
                                {% for one in server_arr_dict %}
                                <option value="{{one.ip}}">{{ one.ip }} {{one.hostname}}</option>
                                {% endfor %}

                            </select>
                        </div>

                        <!-- target file-->
                        <div class="form-group">
                            <label>TargetFile</label>
                            <select class="form-control select2 targetFilter" multiple="multiple"
                                    data-placeholder="Select one or more TargetFile"
                                    style="width: 100%;">
                                {% for one in target_file_arr %}
                                <option value="{{one}}">{{ one }}</option>
                                {% endfor %}
                            </select>
                        </div>

                    </div>


                    <!-- /.col -->
                    <div class="col-md-6">
                        <!-- model-->
                        <div class="form-group">
                            <label>Status</label>
                            <select class="form-control select2 statusFilter" multiple="multiple"
                                    data-placeholder="Select the state"
                                    style="width: 100%;">
                                <option>0</option>
                                <option>1</option>
                            </select>
                        </div>
                        <!-- /.form-group -->

                        <!-- symbol -->
                        <div class="form-group">
                            <label>Symbol</label>
                            <select class="form-control select2 symbolFilter" multiple="multiple"
                                    data-placeholder="Select one or more symbols"
                                    style="width: 100%;">
                                {% for one in symbol_pairs_arr %}
                                <option value="{{one}}">{{ one }}</option>
                                {% endfor %}

                            </select>
                        </div>

                    </div>
                    <!-- /.col -->

                </div>
                <!-- /.row -->

                <div class="box-footer">
                    <div class="col-md-4 col-md-offset-4">
                        <button type="button" class="btn btn-block btn-default serverSubmit">提交</button>
                    </div>
                </div>

            </div>
        </div>


        <!-- Small boxes (Stat box) -->
        <div class="row">
            <div class="col-xs-12">

                <div class="box">


                    <div class="box-header">
                        <h3 class="box-title">All Exchange Server & Target</h3>

                        <div class="box-tools">
                            <div class="input-group input-group-sm" style="width: 150px;">
                                <input type="text" name="table_search" class="form-control pull-right"
                                       placeholder="Search">

                                <div class="input-group-btn">
                                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body table-responsive no-padding">
                        <table class="table table-hover" id="exchange_server_table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Server IP</th>
                                <th>Hostname</th>
                                <th>TargetFile</th>
                                <th>Sub</th>
                                <th>Status</th>
                                <th>Symbol</th>
                                <th>Update</th>
                                <th>Cmd</th>
                                <th>Reboot</th>
                            </tr>
                            </thead>
                            </tbody>
                            <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Server IP</th>
                                <th>Hostname</th>
                                <th>TargetFile</th>
                                <th>Sub</th>
                                <th>Status</th>
                                <th>Symbol</th>
                                <th>Update</th>
                                <th>Cmd</th>
                                <th>Reboot</th>
                            </tr>
                            </tfoot>

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


<div class="modal modal-danger fade" id="symbol_edit_modal" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span></button>
                <h4 class="modal-title">Exchange-server</h4>
            </div>
            <div class="modal-body">
                <p id="edit_symble_ip"></p>
                <p id="edit_symble_target"></p>
                <p id="edit_symble_add_symbol"></p>
                <p id="edit_symble_sub_symbol"></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline pull-left" data-dismiss="modal"
                        id="result_del_submit_close">Close
                </button>
                <button type="button" class="btn btn-outline" id="edit_symble_submit">Submit</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
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
</script>
<!-- Select2 -->
<script src="/static/bower_components/select2/dist/js/select2.full.min.js"></script>

<!-- DataTables -->
<script src="/static/bower_components/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="/static/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>

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
<script src="/static/dist/js/pages/archive/exchangeserver.js?id=1"></script>
{% endblock %}
