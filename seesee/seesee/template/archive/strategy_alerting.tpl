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
                Strategy_Alerting
                <small></small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li class="active">Altering</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <!-- Small boxes (Stat box) -->

            <div class="row">
                <div class="col-md-12">
                    <!-- The time line -->
                    <ul class="timeline">


                            {% for key, map in a_g_sended_dict.items %}
                        <!-- timeline time label -->
                        <li class="time-label">

                            <span class="bg-red">
                                {{ key }}
                            </span>
                        </li>
                        <!-- /.timeline-label -->

                            {% for one in map %}

                        <!-- timeline item -->
                        <li>
                            <i class="fa fa-user bg-aqua"></i>

                            <div class="timeline-item">
                                <span class="time"><i class="fa fa-clock-o"></i> {{ one.sended_time }}</span>
                                <h3 class="timeline-header no-border">
                                    <span class="label label-warning">{{ one.level }}</span>
                                    <a>{{ one.title }}</a>&nbsp;{{ one.content }}</h3>
                            </div>
                        </li>
                        <!-- END timeline item -->

                            {% endfor %}



                            {% endfor %}

                    </ul>
                </div>
                <!-- /.col -->
            </div>


            <!-- /.row (main row) -->
        </section>
        <!-- /.content -->
    </div>
{% endblock %}

{% block footer %}
{% endblock %}