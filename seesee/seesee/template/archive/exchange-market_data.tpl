{% extends "./layouts/master.tpl" %}

{% block title %}
    cmadmin
{% endblock %}

{% block head %}
    <!-- Select2 -->
    <link rel="stylesheet" href="/static/bower_components/select2/dist/css/select2.min.css">
{% endblock %}


{% block content %}
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                Market Data
                <small>manage market data process</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="/index"><i class="fa fa-dashboard"></i> Home</a></li>
                <li class="active">Dashboard</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <!-- Small boxes (Stat box) -->
            <div class="row">

                <div class="col-md-5">


                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Market Data Edit</h3>
                        </div>

                        <div class="box-body">
                            <div class="form-group">
                                <label>Server</label>
                                <select class="form-control select2" id="server_select" style="width: 100%;">
                                    <option></option>
                                </select>
                            </div>

                            <div class="form-group" id="target_file_form" hidden="hidden">
                                <label>Target_file</label>
                                <select class="form-control select2" id="target_file_select" style="width: 100%;">
                                    <option></option>
                                </select>
                            </div>

                            <div class="form-group" id="symbol_from" hidden="hidden">
                                <label>Symbol can be added</label>
                                <select class="form-control select2" id="symbol_select" style="width: 100%;" multiple="multiple" data-placeholder="Select a State" style="width: 100%;" >
                                    <option></option>
                                </select>
                            </div>

                            <div class="box-footer">
                                <button type="button" class="btn btn-block btn-primary pull-right" id="sub_and_ana">
                                    修改
                                </button>
                            </div>

                        </div>
                        <!-- /.box-body -->
                    </div>

                </div>
            </div>



            <!-- /.row (main row) -->

        </section>
        <!-- /.content -->
    </div>


    <div class="modal modal-success fade in" id="modal_new_server" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">Add Host</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>IP mask:</label>

                        <div class="input-group">
                            <div class="input-group-addon">
                                <i class="fa fa-laptop"></i>
                            </div>
                            <input type="text" class="form-control" data-inputmask="'alias': 'ip'" data-mask id="modal_new_server_ip">
                        </div>
                        <!-- /.input group -->
                    </div>

                    <div class="form-group">
                        <label>Hostname</label>
                        <input type="text" class="form-control" placeholder="Enter ..." id="modal_new_server_hostname">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-outline" id="modal_new_server_ip_submit">Submit</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

    <div class="modal modal-danger fade" id="symbol_edit_modal" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">Add or subtract symbols</h4>
                </div>
                <div class="modal-body">
                    <p id="edit_symble_ip"></p>
                    <p id="edit_symble_target"></p>
                    <p id="edit_symble_add_symbol"></p>
                    <p id="edit_symble_sub_symbol"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline pull-left" data-dismiss="modal" id="result_del_submit_close">Close</button>
                    <button type="button" class="btn btn-outline" id="edit_symble_submit">Submit</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>



{% endblock %}

{% block footer %}
    <!-- Select2 -->
    <script src="/static/bower_components/select2/dist/js/select2.full.min.js"></script>

    <!-- InputMask -->
    <script src="/static/plugins/input-mask/jquery.inputmask.js"></script>
    <script src="/static/plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
    <script src="/static/plugins/input-mask/jquery.inputmask.extensions.js"></script>

    <!-- contec_web -->
    <script src="/static/dist/js/pages/archive/marketdata.js"></script>
{% endblock %}
