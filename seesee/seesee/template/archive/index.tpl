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
            Index
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
            <!-- Main content -->
            <section class="content">
                <div class="row">
                    <div class="col-md-4">
                        <div class="box">
                            <div class="box-header with-border">
                                <h3 class="box-title">USD OTC TABLE</h3>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body">
                                <table class="table table-bordered">
                                    <tr>
                                        <td>bid\ask</td>
                                        <th>USD</th>
                                        <th>USDT</th>
                                        <th>GUSD</th>
                                    </tr>
                                    <tr>
                                        <th>USD</th>
                                        <td>1</td>
                                        <td>{{ usdt_usd }}</td>
                                        <td>{{ gusd_usd }}</td>
                                    </tr>
                                    <tr>
                                        <th>USDT</th>
                                        <td>{{ usd_usdt }}</td>
                                        <td>1</td>
                                        <td>{{ gusd_usdt }}</td>
                                    </tr>
                                    <tr>
                                        <th>GUSD</th>
                                        <td>{{ usd_gusd }}</td>
                                        <td>{{ usdt_gusd }}</td>
                                        <td>1</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <!-- /.box -->

                    </div>
                    <!-- /.col -->

                </div>
                <!-- /.row -->

                <div class="row">
                    <div class="col-md-10">
                        <div class="box">
                            <div class="box-header with-border">
                                <h3 class="box-title">USD OTC TABLE  &nbsp;&nbsp;&nbsp; 许氏: {{xsotc_usd_bid}}/{{xsotc_usd_ask}}&nbsp;&nbsp;HB_USDT: {{hbotc_usdt_bid}}/{{hbotc_usdt_ask}}&nbsp;&nbsp;HB_GUSD: {{hbotc_husd_bid}}/{{hbotc_husd_ask}}</h3>
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

                                </table>
                            </div>
                        </div>
                        <!-- /.box -->
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->

            </section>
            <!-- /.content -->
        </div>
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