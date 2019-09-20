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
                Consensus - Contec
                <small>Development and management platform</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li class="active">Dashboard</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <!-- Small boxes (Stat box) -->

            <div class="row">
                <!--
                    {% for map in web_map %}
                    <div class="col-md-3 col-sm-6 col-xs-12">
                        <div class="info-box" onclick="window.open('{{ map.url }}')">
                            <span class="info-box-icon bg-blue"><i class="fa  {{ map.icon }}"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-text">{{ map.region }}</span>
                                <span class="info-box-number">{{ map.name }}</span>
                            </div>
                            <!-- /.info-box-content
                        </div>
                    <!-- /.info-box
                    </div>
                    {% endfor %} -->

                <div class="col-md-10">

                        {% for map_key, map_val in web_map.items %}

                        <div class="box-header">
                            <h3 class="box-title">{{map_key}} </h3>
                        </div>
                        <div class="box-body">

                            {% for map in map_val %}
                            <a class="btn btn-app" onclick="window.open('{{ map.url }}')" style="width:130px;background-color: white">
                                <i class="fa {{ map.icon }}"></i> {{ map.name }}
                            </a>
                            {% endfor %}


                            <!--
                            <a class="btn btn-app">
                                <i class="fa fa-edit"></i> Edit
                            </a>
                            <a class="btn btn-app">
                                <i class="fa fa-play"></i> Play
                            </a>-->
                        </div>
                        <!-- /.box-body -->
                        {% endfor %}

                </div>


            </div>


            <!-- /.row (main row) -->

        </section>
        <!-- /.content -->
    </div>
{% endblock %}

{% block footer %}
{% endblock %}