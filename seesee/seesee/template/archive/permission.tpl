{% extends "./layouts/master.tpl" %}

{% block title %}
cmadmin
{% endblock %}

{% block head %}

<!-- Select2 -->
<link rel="stylesheet" href="/static/bower_components/select2/dist/css/select2.min.css">

{% endblock %}


{% block content %}


<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            Permission
            <small></small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Index</li>
        </ol>
    </section>

    <!-- Main content -->
    <section class="content">
        <!-- Small boxes (Stat box) -->
        <div class="row">

            <div class="col-md-5">
                <div class="form-group" id="target_file_form" hidden="hidden">
                    <label>Target_file</label>
                    <select class="form-control select2" id="target_file_select" style="width: 100%;">
                        <option></option>
                    </select>
                </div>

                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">User Permission Manage</h3>
                    </div>

                    <div class="box-body">
                        <div class="form-group">
                            <label>User</label>
                            <select class="form-control select2" id="auth_user_select" style="width: 100%;">
                                <option></option>
                            </select>
                        </div>
                    </div>

                    <div class="box-header with-border">
                        <h3 class="box-title">Page Rule</h3>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="box-body">
                                <div class="form-group">
                                    <label>Unselected</label>
                                    <select multiple="" class="form-control" id="page_unselected" style="height:200px">

                                    </select>
                                </div>

                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="box-body">
                                <div class="form-group">
                                    <label>Selected</label>
                                    <select multiple="" class="form-control" id="page_selected" style="height:200px">

                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>



                    <div class="box-header with-border">
                        <h3 class="box-title">Account Rule</h3>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="box-body">
                                <div class="form-group">
                                    <label>Unselected</label>
                                    <select multiple="" class="form-control" id="account_unselected" style="height:200px">

                                    </select>
                                </div>

                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="box-body">
                                <div class="form-group">
                                    <label>Selected</label>
                                    <select multiple="" class="form-control" id="account_selected" style="height:200px">

                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div class="box-footer">
                        <button type="button" class="btn btn-block btn-primary pull-right" id="permission_sub">
                            Change
                        </button>
                    </div>
                    <!-- /.box-body -->
                </div>

            </div>

            <div class="col-md-3">
                <div class="form-group" id="target_file_form" hidden="hidden">
                    <label>Gen Passwd</label>
                    <select class="form-control select2" id="target_file_select" style="width: 100%;">
                        <option></option>
                    </select>
                </div>

                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">Gen Passwd</h3>
                    </div>

                    <div class="box-body">
                        <div class="form-group">
                            <label>Text</label>
                            <input type="text" class="form-control" placeholder="Enter ..." id="gen_pass_str">
                        </div>

                        <div class="form-group">
                            <label>Salt</label>
                            <input type="text" class="form-control" placeholder="Enter ..." id="gen_pass_salt">
                        </div>

                        <div class="form-group">
                            <label>Result Hash</label>
                            <input type="text" class="form-control" placeholder="" id="gen_pass_hash" disabled>
                        </div>
                    </div>

                    <div class="box-footer">
                        <button type="button" class="btn btn-block btn-primary pull-right" id="gen_pass">
                            Change
                        </button>
                    </div>


                    <!-- /.box-body -->
                </div>

            </div>


        </div>


        <!-- /.row (main row) -->

    </section>
</div>


{% endblock %}

{% block footer %}
<!--md5-->
<script src="/static/bower_components/md5/md5.min.js"></script>

<!-- Select2 -->
<script src="/static/bower_components/select2/dist/js/select2.full.min.js"></script>
<!-- baidu echarts -->
<script src="/static/bower_components/echarts/js/echarts.min.js"></script>

<!-- char -->
<script src="/static/dist/js/pages/archive/permission.js"></script>
{% endblock %}
