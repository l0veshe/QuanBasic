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


{% endblock %}


{% block content %}
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            <a id="balance_title">Balance</a>
            <small>
                <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#balance-add"><i
                            class="fa fa-plus"></i>
                </button>
            </small>
            <small>
                <button type="button" class="btn btn-info btn-sm" id="balance-worker">Worker
                </button>
            </small>
            <small>
                <button type="button" class="btn btn-info btn-sm" id="balance-worker-statement">Statement <i class="fa fa-caret-right"></i>
                </button>
            </small>

        </h1>

        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">balance</li>

        </ol>
    </section>

    <!-- Main content -->
    <section class="content">
        <!-- Small boxes (Stat box) -->

        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header with-border">

                        <h3 class="box-title" id="title_balance_name"> Balance </h3> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp;

                        <!--
                        <a class="coin_v">ETH</a>,<a class="coin_v">EOS</a>,<a class="coin_v">XRP</a>,
                        <a class="coin_v">BTC</a>,<a class="coin_v">USD</a>,<a class="coin_v">HUSD</a>,
                        <a class="coin_v">PAX</a>,<a class="coin_v">GUSD</a>,<a class="coin_v">TUSD</a>,
                        <a class="coin_v">USDC</a>,<a class="coin_v">USDT</a>, <a class="coin_v">ETC</a>,
                        <a class="coin_v">LTC</a>,<a class="coin_v">BNB</a> -->

                        <div class="pull-right box-tools">
                            <!-- button with a dropdown -->
                            <button type="button" class="btn btn-info btn-sm" data-toggle="modal"
                                    data-target="#balance-setting"><i class="fa fa-wrench"></i>
                            </button>
                        </div>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body table-responsive no-padding">
                        <table class="table table-hover" id="balance_table">
                            <thead>
                            <tr id="balance_table_tr_up">
                                <th>Account</th>
                                <th>Wallet</th>
                                <th>State</th>
                                <th>Recordtime</th>

                            </thead>
                            </tbody>
                            <tfoot>
                            <tr id="balance_table_tr_btm">
                                <th>Account</th>
                                <th>Wallet</th>
                                <th>State</th>
                                <th>Recordtime</th>

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

        <div class="modal modal-info fade in" id="balance-setting" style="display: none; padding-right: 15px;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span></button>
                        <h4 class="modal-title">Setting</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group" id="wallet_from">
                            <label>Wallet_Group</label>
                            <select class="form-control select2" id="wallet_select" style="width: 100%;"
                                    multiple="multiple" data-placeholder="Select a State" style="width: 100%;">
                                <option></option>
                            </select>
                        </div>

                        <div class="form-group" id="symbol_from">
                            <label>Currency</label>
                            <select class="form-control select2" id="currency_select" style="width: 100%;"
                                    multiple="multiple" data-placeholder="Select a State" style="width: 100%;">
                                <option></option>
                            </select>
                        </div>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-outline setting-save">Save changes</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>


        <div class="modal modal-info fade in" id="balance-add" style="display: none; padding-right: 15px;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span></button>
                        <h4 class="modal-title">Add Balance Group Name</h4>
                    </div>
                    <div class="modal-body">
                        <div class="input-group">
                            <input class="form-control" id="add-banlance-group-input"
                                   placeholder="New Balance Group Name">
                            <div class="input-group-btn">
                                <button type="button" class="btn btn-success" id="add-banlance-group"><i
                                            class="fa fa-plus"></i></button>
                            </div>
                        </div>


                    </div>

                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

        <div class="modal modal-info fade in" id="balance-alert-table" style="display: none; padding-right: 15px;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span></button>
                        <h4 class="modal-title">Add an alarm</h4>
                    </div>
                    <div class="modal-body">
                        <div class="input-group">
                            <input class="form-control" id=""
                                   placeholder="New Balance Group Name">
                            <div class="input-group-btn">
                                <button type="button" class="btn btn-success" id="add-banlance-group"><i
                                            class="fa fa-plus"></i></button>
                            </div>
                        </div>


                    </div>

                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

        <div class="modal modal-info fade in" id="balance-alert-add" style="display: none; padding-right: 15px;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span></button>
                        <h4 class="modal-title">Add an alarm</h4>
                    </div>

                    <div class="modal-body">
                        <table class="table " >
                            <tbody class="alarm-list">
                            <tr>
                                <th style="width: 10px">#</th>
                                <th>Bgroup</th>
                                <th>Account</th>
                                <th>Wallet</th>
                                <th>State</th>
                                <th>Symbol</th>
                                <th>Ops</th>
                                <th>Val</th>
                                <th>Group</th>
                                <th>M</th>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="modal-body">

                        <form class="form-horizontal">
                            <div class="box-body">

                                <div class="form-group">
                                    <label for="alarm-bgroup" class="col-sm-2 control-label">BGroup</label>
                                    <div class="col-sm-6">
                                        <input type="input" class="form-control" id="alarm-bgroup">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="alarm-account" class="col-sm-2 control-label">Account</label>
                                    <div class="col-sm-6">
                                        <input type="input" class="form-control" id="alarm-account">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="alarm-wallet" class="col-sm-2 control-label">Wallet</label>
                                    <div class="col-sm-6">
                                        <select class="form-control" id="alarm-wallet">
                                            <option>
                                                spot
                                            </option>
                                            <option>
                                                future
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="alarm-state" class="col-sm-2 control-label">State</label>
                                    <div class="col-sm-6">
                                        <select class="form-control" id="alarm-state">
                                            <option>
                                                frozen
                                            </option>
                                            <option>
                                                available
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="alarm-symbol" class="col-sm-2 control-label">Symbol</label>
                                    <div class="col-sm-6">
                                        <input type="input" class="form-control" id="alarm-symbol">
                                    </div>
                                </div>


                                <div class="form-group">
                                    <label for="alarm-ops" class="col-sm-2 control-label">Ops</label>
                                    <div class="col-sm-6">
                                        <select class="form-control" id="alarm-ops">
                                            <option>
                                                <
                                            </option>
                                            <option>
                                                >
                                            </option>
                                        </select>

                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="alarm-val" class="col-sm-2 control-label">Val</label>
                                    <div class="col-sm-6">
                                        <input type="input" class="form-control" id="alarm-val">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="alarm-alertgroup" class="col-sm-2 control-label">AlertGroup</label>
                                    <div class="col-sm-6">
                                        <select class="form-control" id="alarm-alertgroup">
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </form>

                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-outline" id="alarm-submit">Save changes</button>
                    </div>

                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>


    </section>

    <!-- Main content -->
    <section class="content">
        <div class="row">

            <div class="col-md-6">

                <div class="box box-primary" style="height: 350px">
                    <div class="box-header with-border">
                        <h3 class="box-title netv-title">Net value <span></span></h3>

                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                        </div>
                    </div>
                    <div class="box-body plots_show" style="height: 100%">
                        <div id="net_chart" style="width: 100%;height: 80%"></div>
                    </div>
                </div>

                <div class="box box-primary" style="height: 350px">
                    <div class="box-header with-border">
                        <h3 class="box-title pnlv-title">PNL value <span></span></h3>

                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                        </div>
                    </div>
                    <div class="box-body plots_show" style="height: 100%">
                        <div id="pnl_chart" style="width: 100%;height: 80%"></div>
                    </div>
                </div>

            </div>

            <div class="col-md-6">
                <div class="box">
                    <div class="box-header">
                        <!--<h3 class="box-title">Bootstrap WYSIHTML5
                            <small>Simple and fast</small>
                        </h3>-->
                        <!-- tools box -->
                        <div class="pull-right box-tools">
                            <button type="button" class="btn btn-default btn-sm" data-widget="collapse"
                                    data-toggle="tooltip"
                                    title="Collapse">
                                <i class="fa fa-minus"></i></button>
                            <button type="button" class="btn btn-default btn-sm" data-widget="remove"
                                    data-toggle="tooltip"
                                    title="Remove">
                                <i class="fa fa-times"></i></button>
                        </div>
                        <!-- /. tools -->
                    </div>
                    <!-- /.box-header -->

                    <div class="box-body pad">
                        <form>
                        <textarea class="textarea note_balance" placeholder="Place some text here"
                                  style="width: 100%; height: 200px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
                        </form>
                    </div>
                    <div class="box-footer clearfix">
                        <button type="button" class="pull-right btn btn-default" id="SubmitNote">Send
                            <i class="fa fa-arrow-circle-right"></i></button>
                    </div>
                    <div class="overlay" id="note_submiting" hidden="hidden">
                        <i class="fa fa-refresh fa-spin"></i>
                    </div>
                </div>
                <!-- ./row -->
            </div>

            <div class="col-md-6" style="margin-top: 6px">
                <div class="box" style="height: 350px">
                    <div class="box-header">
                        <h3>Wallet Transfer</h3>
                    </div>
                    <div class="box-body pad">
                        <div class="row">
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>UserAccount</label>
                                    <select class="form-control select2" id="user_account" style="width: 200px;">
                                        <!--<option selected="selected"></option>-->
                                        <option selected="selected">ABTconsensus</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2" style="margin-left: 50px">
                                <div class="form-group">
                                    <label>From</label>
                                    <select class="form-control select2" id ="account_from" style="width: 200px;">
                                        <option selected="selected" value="1">币币</option>
                                        <option selected="selected" value="3">交割合约</option>
                                        <option selected="selected" value="5">币币杠杆</option>
                                        <option selected="selected" value="6">资金账户</option>
                                        <option selected="selected" value="9">永续合约</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2" style="margin-left: 50px">
                                <div class="form-group">
                                    <label>To</label>
                                    <select class="form-control select2" id="account_to" style="width: 200px;">
                                        <option selected="selected"></option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2" id="instrument" style="display: none;margin-left: 50px">
                                <div class="form-group">
                                    <label>instrument_id</label>
                                    <input class="form-control select2" id="instrument_id" style="width: 200px;">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Currency</label>
                                    <input class="form-control select2" id="currency" style="width: 200px;"/>
                                </div>
                            </div>
                            <div class="col-md-2" style="margin-left: 50px">
                                <div class="form-group">
                                    <label> Amount </label>
                                    <input class="form-control select2" id="transfer_amount"/>
                                </div>
                            </div>
                            <div class="col-md-2" id="operator" style="margin-left: 50px">
                                <div class="form-group">
                                    <label>Operator</label>
                                    <input class="form-control select2" id="operator_name" style="width: 200px;">
                                </div>
                            </div>
                            <div class="col-md-2" id="comment" style="margin-left: 50px">
                                <div class="form-group">
                                    <label>Comment</label>
                                    <input class="form-control select2" id="comment_input" style="width: 200px;">
                                </div>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <button class="btn btn-block btn-primary" id="transfer_currency">划转</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
    <!-- /.content -->
    <div class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">Transfer Tables</h3>
                    </div>
                    <div class="box-body">
                        <div id="example2_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
                            <div class="row">
                                <div class="col-xs-12">
                                    <table id="transfer_table" class="table table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th>okex_account</th>
                                            <th>from</th>
                                            <th>to</th>
                                            <th>currency</th>
                                            <th>amount</th>
                                            <th>instrument_id</th>
                                            <th>status</th>
                                            <th>operator</th>
                                            <th>created_at</th>
                                            <th>updated_at</th>
                                            <th>comment</th>
                                            <th>response</th>
                                            <th>id</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
{% endblock %}

{% block footer %}

<script src="/static/bower_components/echarts/js/echarts.min.js"></script>

<script>

    var Base64 = {
        // private property
        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        // public method for encoding
        encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = Base64._utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }
            return output;
        },
        // public method for decoding
        decode : function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = Base64._utf8_decode(output);
            return output;
        },
        // private method for UTF-8 encoding
        _utf8_encode : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        },
        // private method for UTF-8 decoding
        _utf8_decode : function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while ( i < utftext.length ) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    }

    function make_base_auth(user, password) {
        var tok = user + ':' + password;
        var hash = Base64.encode(tok);
        return "Basic " + hash;
    }
    var auth = make_base_auth('contec', 'contec2018');

</script>

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

<script src="/static/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>

<script>

</script>
<!-- char -->
<script src="/static/dist/js/pages/archive/balance.js?id=2"></script>
<script src="/static/dist/js/pages/archive/wallet_manage.js"></script>
{% endblock %}
