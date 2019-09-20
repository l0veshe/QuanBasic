<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

        <!--
        <div class="user-panel">
            <div class="pull-left image">
                <img src="/static/dist/img/logo2.jpg" class="img-circle" alt="">
            </div>
            <div class="pull-left info">
                <p>{{ auth_s.user_info.name }}</p>
                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>

            </div>
        </div>-->


        <ul class="sidebar-menu" data-widget="tree">
            <!-- 首页
            <li><select class="region_select" style="">
                    <option class="region_option" {% ifequal region "HK" %}selected{% endifequal %}>HK</option>
                    <option class="region_option" {% ifequal region "Tokyo" %}selected{% endifequal %}>Tokyo</option>
                </select>
            </li>-->
            <li class="header">MAIN NAVIGATION</li>

            <li><a href="index"><i class="fa fa-book"></i> <span>首页</span></a></li>

            <li class="active treeview menu-open">
                <a href="#">
                    <i class="fa fa-dashboard"></i> <span>黑板</span>
                    <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
                </a>
                <ul class="treeview-menu">
                    <li><a href="dashboard1"><i class="fa fa-circle-o"></i> 黑板 1</a></li>
                    <li class="active"><a href="dashboard2"><i class="fa fa-circle-o"></i> 黑板 2</a></li>
                </ul>
            </li>




            <!-- <li class="treeview" id="balance-menu" >
                <a>
                    <i class="fa fa-rocket"></i>
                    <span style="color:#25eb12">Balance</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li><a href="balance?balance_name=june"><i class="fa fa-rocket"></i>june</a></li>
                    <li><a href="balance?balance_name=pp"><i class="fa fa-rocket"></i>pp</a></li>
                    <li><a href="balance?balance_name=hsl"><i class="fa fa-rocket"></i>hsl</a></li>
                    <li><a href="balance?balance_name=ctc"><i class="fa fa-rocket"></i>ctc</a></li>

                </ul>
            </li>-->




        </ul>
    </section>
</aside>
