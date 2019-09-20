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
                Balance
                <small></small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li class="active">DepositRate</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <!-- Small boxes (Stat box) -->

            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title"> Balance </h3> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <a class="coin_v">ETH</a>,<a class="coin_v">EOS</a>,<a class="coin_v">XRP</a>,
                            <a class="coin_v">BTC</a>,<a class="coin_v">USD</a>,<a class="coin_v">HUSD</a>,
                            <a class="coin_v">PAX</a>,<a class="coin_v">GUSD</a>,<a class="coin_v">TUSD</a>,
                            <a class="coin_v">USDC</a>,<a class="coin_v">USDT</a>, <a class="coin_v">ETC</a>,
                            <a class="coin_v">LTC</a>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body table-responsive no-padding">
                            <table class="table table-hover" id="balance_table">
                                <thead>
                                <tr>
                                    <th>Account</th>
                                    <th>Exchange</th>
                                    <th>eth</th>
                                    <th>eos</th>
                                    <th>xrp</th>
                                    <th>btc</th>
                                    <th>usd</th>
                                    <th>husd</th>
                                    <th>pax</th>
                                    <th>gusd</th>
                                    <th>tusd</th>
                                    <th>usdc</th>
                                    <th>usdt</th>
                                    <th>etc</th>
                                    <th>ltc</th>
                                </thead>
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th>Account</th>
                                    <th>Exchange</th>
                                    <th>eth</th>
                                    <th>eos</th>
                                    <th>xrp</th>
                                    <th>btc</th>
                                    <th>usd</th>
                                    <th>husd</th>
                                    <th>pax</th>
                                    <th>gusd</th>
                                    <th>tusd</th>
                                    <th>usdc</th>
                                    <th>usdt</th>
                                    <th>etc</th>
                                    <th>ltc</th>
                                </tr>
                                </tfoot>

                            </table>
                        </div>
                    </div>
                    <!-- /.box -->
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->


            <!-- /.row (main row) -->

        </section>
        <!-- /.content -->
    </div>
{% endblock %}

{% block footer %}
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

    <!-- char -->
    <script src="/static/dist/js/pages/archive/deposit_rate.js"></script>

{% endblock %}
