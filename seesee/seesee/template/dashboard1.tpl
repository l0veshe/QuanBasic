{% extends "./layouts/master.tpl" %}

{% block title %}
HQuant
{% endblock %}

{% block head %}
{% endblock %}


{% block content %}
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            黑板1
            <small></small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">黑板1</li>
        </ol>
    </section>

    <!-- Main content -->
    <section class="content">
        <!-- Small boxes (Stat box) -->

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
