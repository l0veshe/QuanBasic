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
<link rel="stylesheet" href="/static/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">

<style>
    .text-right{
        text-align:center
    }
</style>

{% endblock %}


{% block content %}
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            <a id="balance_statement_title">Statement(Balance)</a>

            <small>
                <button type="button" class="btn btn-info btn-sm" data-toggle="modal" id="balance-back"><i
                            class="fa fa-caret-left"> Back</i>
                </button>
            </small>
        </h1>

        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">balance</li>

        </ol>
    </section>

    <section class="content">
        <div class="row">
            <div class="col-md-4">

                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">期初

                        </h3>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body no-padding table-responsive">
                        <table class="table table-hover cell-border" id="total_position_table">
                            <thead>
                            <tr>
                                <th style="width: 20px">Symbol</th>
                                <th>Amount</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                    <!-- /.box-body -->
                </div>
            </div>
            <div class="col-md-4">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">转入/转出

                        </h3>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body no-padding table-responsive">
                        <table class="table table-hover cell-border" id="position_table">
                            <thead>
                            <tr>
                                <th style="width: 8px">C</th>
                                <th style="width: 10px">Symbol</th>
                                <th>Amount</th>
                                <th>Remark</th>
                                <th>InsertedDate</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                    <!-- /.box-body -->
                </div>
            </div>
        </div>
    </section>

</div>
{% endblock %}

{% block footer %}

<script src="/static/bower_components/echarts/js/echarts.min.js"></script>

<!-- baidu echarts
<script src="/static/bower_components/echarts/js/echarts.min.js"></script>-->

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
<script src="/static/bower_components/moment/moment.js"></script>

<script src="/static/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>

<script>

</script>
<!-- char -->
<script src="/static/dist/js/pages/archive/balance_statement.js"></script>

{% endblock %}
