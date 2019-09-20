{% extends "./layouts/master.tpl" %}

{% block title %}
    cmadmin
{% endblock %}

{% block head %}
    <!-- Select2 -->
    <link rel="stylesheet" href="/static/bower_components/select2/dist/css/select2.min.css">
{% endblock %}


{% block content %}
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">

        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                Add Symbol By Exchange
                <small></small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li class="active">contec-add_cp_by_api</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">

            <div class="row">
                <!-- left column -->
                <div class="col-md-5">
                    <!-- base form -->
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Form</h3>
                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <!-- form start -->
                        <div class="box-body">
                                <div class="form-group">
                                    <label>方式</label>
                                    <select class="form-control" id="coin_cp_add_choice">
                                        <option value="">Please select</option>
                                        <option value="record">已录入市场</option>
                                        <!--<option value="http_json">填写API地(JSON)</option>-->
                                        <option value="handle_add">手动增加币对</option>
                                    </select>
                                </div>

                                <div class="form-group" id="market_choice_select_form" hidden="hidden">
                                    <label>Exchange</label>
                                    <select class="form-control" id="market_choice_select">
                                        <option value="">Please select</option>
                                        <option value="http://api.coinbene.com/v1/market/symbol">coinbene http://api.coinbene.com/v1/market/symbol</option>
                                        <option value="https://api.coinex.com/v1/market/list">coinex https://api.coinex.com/v1/market/list</option>
                                        <option value="https://raw.githubusercontent.com/okcoin-okex/API-docs-OKEx.com/master/%E5%B8%81%E5%AF%B9%E7%B2%BE%E5%BA%A6(pairs_increment).csv">okex https://raw.githubusercontent.com/okcoin-okex/API-docs-OKEx.com/master/%E5%B8%81%E5%AF%B9%E7%B2%BE%E5%BA%A6(pairs_increment).csv</option>
                                        <option value="https://api.binance.com/api/v1/exchangeInfo">ba https://api.binance.com/api/v1/exchangeInfo</option>
                                        <option value="https://api.huobi.pro/v1/common/symbols">hbp https://api.huobi.pro/v1/common/symbols</option>
                                        <option value="https://api.huobi.pro/v1/common/symbols">hadax https://api.huobi.pro/v1/hadax/common/symbols</option>
                                        <option value="https://api.bitforex.com/api/v1/market/symbols">bf https://api.bitforex.com/api/v1/market/symbols</option>
                                        <option value="https://data.gateio.io/api2/1/pairs">gt https://data.gateio.io/api2/1/pairs</option>
                                        <option value="https://www.bcex.top/Api_Market/getPriceList">bcex https://www.bcex.top/Api_Market/getPriceList#btc</option>
                                        <option value="https://www.bcex.top/Api_Market/getPriceList">bcex https://www.bcex.top/Api_Market/getPriceList#eth</option>
                                        <option value="https://api.hitbtc.com/api/2/public/symbol">hit https://api.hitbtc.com/api/2/public/symbol</option>
                                        <option value="http://api.zb.cn/data/v1/markets">zb http://api.zb.cn/data/v1/markets</option>
                                        <option value="https://poloniex.com/public?command=returnTicker">pl https://poloniex.com/public?command=returnTicker</option>
                                        <option value="https://rfinex.com/api/v2/markets.json">rf https://rfinex.com/api/v2/markets.json</option>
                                        <option value="https://api.kucoin.com/v1/open/tick">kucoin https://api.kucoin.com/v1/open/tick</option>
                                        <option value="https://api.bithumb.com/public/ticker/All">bithumb https://api.bithumb.com/public/ticker/All</option>
                                        <option value="https://api.hitbtc.com/api/1/public/symbols">hitbtc https://api.hitbtc.com/api/1/public/symbols</option>
                                        <option value="https://web.hibtc.com/bb/pair/list">hibtc https://web.hibtc.com/bb/pair/list</option>
                                        <option value="https://api.kraken.com/0/public/AssetPairs">kraken https://api.kraken.com/0/public/AssetPairs</option>
                                        <option value="https://api.pro.coinbase.com/products">cbp https://api.pro.coinbase.com/products</option>
                                        <option value="https://www.bitmex.com/api/v1/instrument?columns=symbol,tickSize&start=0&count=500">bitmex https://www.bitmex.com/api/v1/instrument?columns=symbol,tickSize&start=0&count=500</option>
                                        <option value="https://api.coinsuper.com/api/v1/market/symbolList">coinsuper https://api.coinsuper.com/api/v1/market/symbolList</option>
                                        <option value="https://www.bitstamp.net/api/v2/trading-pairs-info/">bitstamp https://www.bitstamp.net/api/v2/trading-pairs-info/</option>
                                    </select>
                                </div>

                                <div class="form-group" id="cp_api_exchange_form" hidden="hidden">
                                    <label for="cp_api_addr">Exchange</label>
                                    <input type="input" class="form-control" id="cp_api_exchange" placeholder="like bf,hbp(system echange name)">
                                </div>

                                <div class="form-group" id="cp_api_addr_form" hidden="hidden">
                                    <label for="cp_api_addr">Symbols&Currency API</label>
                                    <input type="input" class="form-control" id="cp_api_addr" placeholder="Http">
                                </div>


                                <div class="form-group" id="cp_json_key_name" hidden="hidden">
                                    <label for="cp_json_key">Symbol Regular</label>
                                    <input class="form-control" id="cp_json_key" placeholder='Json["a"]["b"] -> a,b'>
                                    <p class="help-block">系统币对采用小写,C(quoteAsset), P(baseAsset)</pnhelp-block>
                                </div>

                                <div class="form-group" id="cp_json_key_currency_form" hidden="hidden">
                                    <label for="cp_json_key">Currency</label>
                                    <input class="form-control" id="cp_json_key_currency" >
                                </div>
                            <!-- /.box-body -->



                            <div class="box-footer">
                                <button type="button" class="btn btn-block btn-primary pull-right" id="sub_and_ana">
                                    解析(未操作DB)
                                </button>
                            </div>
                        </div>
                        <div class="overlay" id="market_choice_submiting" hidden="hidden">
                            <i class="fa fa-refresh fa-spin"></i>
                        </div>
                    </div>

                    <!-- coin pair compare result -->
                    <div class="box box-default" hidden="hidden" id="result_new">
                        <div class="box-header with-border">
                            <h3 class="box-title" id="result_new_title">比对结果 - [新增]</h3>

                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">

                            <div class="form-group">
                                <label>COMMAND/CRTL 多选添加</label>
                                <select multiple="" class="form-control" id="result_new_select" size="15">
                                </select>
                            </div>

                            <div class="form-group" id="result_new_selected">

                            </div>


                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer">
                            <button type="button" class="btn btn-primary pull-right" id="result_new_submit">
                                提交
                            </button>
                        </div>
                    </div>

                    <div class="box box-default" hidden="hidden" id="result_has">
                        <div class="box-header with-border">
                            <h3 class="box-title" id="result_has_title">比对结果 - [已存在]</h3>

                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">

                            <div class="form-group">
                                <label>COMMAND/CRTL 多选添加</label>
                                <select multiple="" class="form-control" id="result_has_select" size="15">
                                </select>
                            </div>

                            <div class="form-group" id="result_has_selected">

                            </div>

                        </div>
                        <!-- /.box-body
                        <div class="box-footer">
                            <button type="button" class="btn btn-primary pull-right" id="result_has_submit">
                                提交
                            </button>
                        </div> -->
                    </div>

                    <div class="box box-default" hidden="hidden" id="result_del">
                        <div class="box-header with-border">
                            <h3 class="box-title" id="result_del_title">比对结果 - [数据库失效]</h3>

                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">

                            <div class="form-group">
                                <label>COMMAND/CRTL 多选添加</label>
                                <select multiple="" class="form-control" id="result_del_select" size="15">
                                </select>
                            </div>

                            <div class="form-group" id="result_del_selected">

                            </div>

                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer">
                            <button type="button" class="btn btn-danger pull-right" id="result_del_submit_modal" data-toggle="modal" data-target="#modal-danger">
                                删除
                            </button>

                        </div>
                    </div>

                </div>

                <div class="col-md-6" >
                    <!-- request json show -->
                    <div class="box box-primary" hidden="hidden" id="json_request_row" >
                        <div class="box-header with-border">
                            <h3 class="box-title" id="json_request"></h3>
                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <!-- form start -->
                        <div class="box-body">
                            <pre class="box-body" id="json_str_output">
                            </pre>
                        </div>
                        <!-- /.box-body -->
                    </div>

                    <!-- 手动增加币对 -->
                    <div class="box box-primary" hidden="hidden" id="handle_add_cp" >
                        <div class="box-header with-border">
                            <h3 class="box-title" id="json_request">手动增加币对</h3>
                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <!-- form start -->
                        <div class="box-body">
                            <form class="form-horizontal">
                                <div class="box-body">
                                    <div class="form-group">
                                        <label for="coin_c_handle" class="col-sm-2 control-label">基础币种</label>

                                        <div class="col-sm-10">
                                            <input class="form-control" id="coin_c_handle" placeholder="小写，1个: usd,btc,eth,okb,ht,bnb">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="coin_p_handle" class="col-sm-2 control-label">交易币种</label>

                                        <div class="col-sm-10">
                                            <input  class="form-control" id="coin_p_handle" placeholder="小写，1个: abc,def...">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="market_handle" class="col-sm-2 control-label">市场</label>

                                        <div class="col-sm-10">
                                            <select class="form-control" id="handle_add_market_select">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <!-- /.box-body -->
                                <div class="box-footer">
                                    <button type="button" class="btn btn-info pull-right" id="handle_add_market_submit">
                                        提交
                                    </button>
                                </div>
                                <!-- /.box-footer -->
                            </form>
                        </div>
                        <!-- /.box-body -->
                    </div>
                </div>


            </div>

            <!-- /.row (main row) -->

        </section>
        <!-- /.content -->
    </div>

    <div class="modal modal-danger fade" id="modal-danger" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">确认删除</h4>
                </div>
                <div class="modal-body">
                    <p id="submit_modal_market"></p>
                    <p id="submit_modal_coin"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline pull-left" data-dismiss="modal" id="result_del_submit_close">关闭</button>
                    <button type="button" class="btn btn-outline" id="result_del_submit">提交</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>



{% endblock %}

{% block footer %}
    <!-- Select2 -->
    <script src="/static/bower_components/select2/dist/js/select2.full.min.js"></script>

    <!-- contec_web -->
    <script src="/static/dist/js/pages/archive/contec_cp.js"></script>
{% endblock %}
