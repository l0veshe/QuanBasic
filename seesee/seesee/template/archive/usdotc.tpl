{% extends "./layouts/master.tpl" %}

{% block title %}
    cmadmin
{% endblock %}

{% block head %}
{% endblock %}


{% block content %}
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                USD OTC
                <small></small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li class="active">usdotc</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <!-- Small boxes (Stat box) -->

            <!-- Main row
            <div class="row">
                <!-- Left col
                <section class="col-lg-8 connectedSortable">
                    <!-- Custom tabs (Charts with tabs)
                    <div class="nav-tabs-custom">
                        <!-- Tabs within a box
                        <ul class="nav nav-tabs pull-right">
                            <li class="active"><a href="#revenue-chart" data-toggle="tab">USD</a></li>
                            <li><a href="#sales-chart" data-toggle="tab">Other</a></li>
                            <li class="pull-left header"><i class="fa fa-inbox"></i> Example</li>
                        </ul>
                        <div class="tab-content no-padding">
                            <!-- Morris chart - Sales
                            <div class="chart tab-pane active" id="usdotc_table" style="position: relative; height: 500px;"></div>
                            <div class="chart tab-pane" id="usd_chart" style="position: relative; height: 500px;">
                                <table>
                                    <tr>
                                        <td>dfdf</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- /.nav-tabs-custom
                </section>
            </div> -->

            <div class="row">
                <div class="col-md-10">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title">USD OTC TABLE  &nbsp;&nbsp;&nbsp; 许氏: {{xsotc_usd_bid}}/{{xsotc_usd_ask}}&nbsp; &nbsp;&nbsp;HB_USDT: {{hbotc_usdt_bid}}/{{hbotc_usdt_ask}}&nbsp; &nbsp;&nbsp;HB_GUSD: {{hbotc_husd_bid}}/{{hbotc_husd_ask}} &nbsp; &nbsp;&nbsp;CBP_USDC: {{cbpotc_usdc_bid}}/{{cbpotc_usdc_ask}} </h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <table class="table table-bordered">
                                <tr>
                                    <td>bid\ask</td>
                                    <th>XS_USD</th>
                                    <th>HB_USDT</th>
                                    <th>BF_USDT</th>
                                    <th>BA_USDT</th>
                                    <th>BA_TUSD</th>
                                    <th>BA_PAX</th>
                                    <th>HB_GUSD</th>
                                    <th>CBP_USDC</th>
                                </tr>
                                <tr>
                                    <th>XS_USD</th>
                                    {% for item in usd_otc_list.XS_USD %}
                                    <td> {{ item.bid }} / {{ item.ask }} </td>
                                    {% endfor %}
                                </tr>
                                <tr>
                                    <th>HB_USDT</th>
                                    {% for item in usd_otc_list.HB_USDT %}
                                    <td> {{ item.bid }} / {{ item.ask }} </td>
                                    {% endfor %}
                                </tr>
                                <tr>
                                    <th>BF_USDT</th>
                                    {% for item in usd_otc_list.BF_USDT %}
                                    <td> {{ item.bid }} / {{ item.ask }} </td>
                                    {% endfor %}
                                </tr>
                                <tr>
                                    <th>BA_USDT</th>
                                    {% for item in usd_otc_list.BA_USDT %}
                                    <td> {{ item.bid }} / {{ item.ask }} </td>
                                    {% endfor %}
                                </tr>
                                <tr>
                                    <th>BA_TUSD</th>
                                    {% for item in usd_otc_list.BA_TUSD %}
                                    <td> {{ item.bid }} / {{ item.ask }} </td>
                                    {% endfor %}
                                </tr>
                                <tr>
                                    <th>BA_PAX</th>
                                    {% for item in usd_otc_list.BA_PAX %}
                                    <td> {{ item.bid }} / {{ item.ask }} </td>
                                    {% endfor %}
                                </tr>
                                <tr>
                                    <th>HB_GUSD</th>
                                    {% for item in usd_otc_list.HB_GUSD %}
                                    <td> {{ item.bid }} / {{ item.ask }} </td>
                                    {% endfor %}
                                </tr>
                                <tr>
                                    <th>CBP_USDC</th>
                                    {% for item in usd_otc_list.CBP_USDC %}
                                    <td> {{ item.bid }} / {{ item.ask }} </td>
                                    {% endfor %}
                                </tr>

                            </table>
                        </div>
                    </div>
                    <!-- /.box -->
                </div>
                <!-- /.col -->

                <div class="col-md-4">
                    <!-- Horizontal Form -->
                    <div class="box box-info">
                        <div class="box-header with-border">
                            <h3 class="box-title">手记汇率</h3>&nbsp;&nbsp <a href="https://g.alphaconsensus.com/d/TM0Zghfmk/usd_otc?orgId=1" target="_blank">Grafana</a>
                        </div>
                        <!-- /.box-header -->
                        <!-- form start -->
                        <form class="form-horizontal" action="usdotc_handle_add" method="post">
                            <div class="box-body">

                                <div class="form-group">
                                    <label for="inputPassword3" class="col-sm-3 control-label">汇率Bid    </label>

                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="handle_otc" name="handle_otc">
                                    </div>

                                    <div class="col-sm-2">
                                        <label>{{hand_usd_bid_dt_str}} {{hand_usd_bid}}</label>
                                    </div>
                                </div>

                            </div>
                            <!-- /.box-body -->
                            <div class="box-footer">
                                <button type="submit" class="btn btn-info pull-right">Submit</button>
                            </div>
                            <!-- /.box-footer -->
                        </form>
                    </div>
                    <!-- /.box -->
                </div>
            </div>
            <!-- /.row -->


            <!-- /.row (main row) -->
        </section>
        <!-- /.content -->
    </div>
{% endblock %}

{% block footer %}
    <!-- baidu echarts -->
    <script src="/static/bower_components/echarts/js/echarts.min.js"></script>

    <!-- char -->
    <script src="/static/dist/js/pages/index.js"></script>
{% endblock %}