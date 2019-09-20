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
            Burst_charts
            <small>Burst_charts</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="/index"><i class="fa fa-dashboard"></i> Plots</a></li>
        </ol>
    </section>

    <!-- Main content -->
    <section class="content">


        <!-- Small boxes (Stat box) -->
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Select Currency</h3> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select class="select2" id="busrt_currency" style="width:100px">
                    <option></option>
                    <option>eos</option>
                    <option>ltc</option>
                    <option>btc</option>
                    <option>eth</option>
                    <option>btc</option>
                    <option>xrp</option>
                </select>

                <select class="select2" id="burst_contract" style="width:100px">
                    <option></option>
                    <option>quarter</option>
                    <option>this_week</option>
                    <option>next_week</option>
                </select>


                <button id="burst_submit" class="btn btn-primary btn-sm">Submit</button>

                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title=""
                            data-original-title="Collapse">
                        <i class="fa fa-minus"></i></button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title=""
                            data-original-title="Remove">
                        <i class="fa fa-times"></i></button>
                </div>
            </div>
            <div class="box-body plots_show">
                <div id="burst_chart" style="width: 1200px;height:500px;"></div>
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
                Footer
            </div>
            <!-- /.box-footer-->

            <div class="overlay" id="burst_submiting" hidden="hidden">
                <i class="fa fa-refresh fa-spin"></i>
            </div>
        </div>


        <!-- /.row (main row) -->

    </section>
    <!-- /.content -->
</div>


<div class="modal modal-info fade" id="show_sub_data_modal" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="modal-title-id">Sub Data</h4>
            </div>
            <div class="modal-body" id="ws_content">
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>


{% endblock %}

{% block footer %}

<!-- ChartJS -->
<script src="/static/bower_components/echarts/js/echarts.min.js"></script>

<script>

    var ws_addr = "{{ ws_url }}"
    var http_addr = "{{ http_url }}"


    var myChart = echarts.init(document.getElementById('burst_chart'));


    var textStyle = {
        color: '#333',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: '微软雅黑',
        fontSize: 14,
    };


    function echarts_option(burst_data_filled, burst_data_unfilled, price_data, bak_num, from_val, to_val, bid_data){
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },

            toolbox: {
                left: 'right',
                feature: {
                    dataZoom: {}
                }
            },
            dataZoom: [{
                type: 'inside',
                start: 90,
                end: 100,
            }, {
                type: 'slider',
                start: 90,
                end: 100,
            }],



            xAxis: {
                type: 'time',
                name: '时间轴',
                max: to_val*1000,
                min: from_val*1000,

                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                splitNumber: 20

            },
            yAxis: {
                type: 'value',
                name: '次数值',
                scale: true,
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                splitNumber: 20

            },
            series: [
                {
                    name: '',
                    data: burst_data_filled,
                    type: 'scatter',
                    symbolSize: function (data) {
                        return data[2]/bak_num
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return "F P:" + param.data[1] + " M:" +  param.data[2] + " Mark:" + param.data[3] ;
                            },
                            position: 'top',
                            color: 'white',
                            fontWeight: 'bold',
                            backgroundColor:'black',
                            padding: 5
                        }

                    },
                },
                {
                    name: '',
                    data: burst_data_unfilled,
                    type: 'scatter',
                    symbolSize: function (data) {
                        return data[2]/bak_num
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return "UNFILLED " + param.data[1] + " " +  param.data[2]  ;
                            },
                            position: 'top'
                        }
                    },
                },
                {
                    name:'11',
                    type:'k',
                    data: price_data
                },
                {
                    name: 'bid_data',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: bid_data
                }
            ],
        };

        myChart.setOption(option);
    }

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



    $(document).ready(function (){

        $("#burst_submit").on("click", function () {


            $("#burst_submit").prop("disabled", true);
            if($("#busrt_currency").val() != "" && $("#burst_contract").val() != "" ){
                $("#burst_submiting").show()

                var currency = $("#busrt_currency").val()
                var contract = $("#burst_contract").val()
                myChart.clear()
                $.ajax({
                    type: "GET",
                    dataType:'json',
                    data:{
                        "currency": $("#busrt_currency").val(),
                        "contract":$("#burst_contract").val()
                    },

                    //url: 'https://' + http_addr +'/request_burst_data',
                    //url: 'http://127.0.0.1:18881/request_burst_data',
                    url:'proxy_okexf_burst_data_test',
                    success: function(data){
                        console.log(data)
                        if(data.success == true){
                            $.each(data['data'], function(k,v){
                                if (k == currency+"_"+contract ){
                                    console.log(v)
                                }
                            })
                            //echarts_option
                            console.log(data['data'])

                            /**
                            burst_data_filled = data['data']['burst_data_filled']
                            burst_data_unfilled = data['data']['burst_data_unfilled']
                            price_data = data['data']['price_data']
                             **/
                            burst_data_filled = data['burst_data_filled']
                            burst_data_unfilled = data['burst_data_unfilled']
                            price_data = []
                            back_num = data['back_num']
                            from_val = data['from_val']
                            to_val = data['to_val']
                            bid_data = data['bid_data']
                            echarts_option(burst_data_filled,burst_data_unfilled,price_data, back_num, from_val, to_val, bid_data)

                        }else{
                            console.log(data.message);
                            alert("没有数据")
                        }
                    },
                    error: function (obj, info) {
                        alert(obj.status + " " + obj.statusText + " \n 服务器错误" + "\n"+info)
                    },
                    complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                        $("#burst_submiting").hide()
                    }
                });
            }else{
                alert("undefine")
            }
            $("#burst_submit").prop("disabled", false);

        })

    })

</script>


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


<!-- contec_web -->
<script src="/static/dist/js/pages/archive/plots.js"></script>
{% endblock %}
