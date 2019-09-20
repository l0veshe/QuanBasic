$(document).ready(function () {

    // 页面初始化执行
    // 提交分析币对按钮初始化
    sub_disabled(true)
    // 币对结果初始化
    result_hide(true)

    // coin pair json
    var data_json = {}
    var market_name = ""
    var sbl = ""
    var result_new = Array()
    var result_has = Array()
    var result_del = Array()

    // 隐藏ajax json栏
    function clear_right() {
        $("#json_request").text("")
        $("#json_str_output").text("")
        $("#json_request_row").hide()
        $("#cp_json_key_currency_form").hide()
    }

    // 禁止提交类按钮
    function sub_disabled(bool) {
        if (bool == true) {
            $("#sub_and_ana").attr("disabled", true);
        } else {
            $("#sub_and_ana").attr("disabled", false);
        }
    }

    // 隐藏币对结果result栏
    function result_hide(bool) {
        if (bool == true){
            $('#result_new_select')
                .find('option')
                .remove()
                .end()

            $('#result_has_select')
                .find('option')
                .remove()
                .end()

            $('#result_del_select')
                .find('option')
                .remove()
                .end()

            $("#result_new_selected").html("")
            $("#result_has_selected").html("")
            $("#result_del_selected").html("")

            $("#result_new").hide()
            $("#result_has").hide()
            $("#result_del").hide()
            $("#cp_api_exchange_form").hide()
        } else {
            $("#result_new").show()
            $("#result_has").show()
            $("#result_del").show()
        }
    }

    // 监听api来源 select
    $('#coin_cp_add_choice').change(function () {
        clear_right()
        sub_disabled(true)
        result_hide(true)
        $("#handle_add_cp").hide()
        $("#cp_api_addr_form").hide()
        $("#market_choice_select_form").hide()
        $("#cp_json_key_name").hide()

        var p1 = $(this).children('option:selected').val();//这就是selected的值
        if (p1 == "") {
            $("#cp_api_addr_form").hide()
            $("#market_choice_select_form").hide()
            $("#cp_json_key_name").hide()

            $("#market_choice_select option:first").attr("selected", true)
        } else if (p1 == "record") {
            sub_disabled(true)
            $("#cp_api_addr_form").hide()
            $("#market_choice_select_form").show()
            $("#cp_json_key_name").hide()
        } else if (p1 == "http_json") {
            $("#cp_api_addr_form").show()
            $("#market_choice_select_form").hide()
            $("#cp_api_exchange_form").show()
            $("#cp_json_key_name").show()
            $("#sub_and_ana").attr("disabled",false)

        } else if (p1 == "handle_add") {
            $("#cp_api_addr_form").hide()
            $("#market_choice_select_form").hide()
            $("#cp_json_key_name").hide()

            handle_add_cp()
        }
    })

    // 监听 选择市场 market_choice_select_form select
    $('#market_choice_select').change(function () {
        result_hide(true)
        clear_right()
        var p1 = $(this).children('option:selected').val()
        if (p1 == "") {

            $("#market_choice_select option:first").attr("selected", true)

            $("#cp_json_key_name").hide()
            $("#json_request").text("")
            $("#json_request_row").hide()
            $("#json_str_output").text("")

            $("#cp_json_key").val("")
            return false
        } else {
            $("#market_choice_submiting").show()

            $("#cp_json_key_name").hide()
            $("#cp_json_key").val("")

            market = $('#market_choice_select').children('option:selected').text().split(" ")[0]
            console.log($('#market_choice_select').children('option:selected').text().split(" "))

            if (market == "okex") {
                ajax_market_http(p1, market, "csv")
            } else {
                ajax_market_http(p1, market, "json")
            }
        }
    })

    $("#cp_api_addr").blur(function () {
        var http_addr = $("#cp_api_addr").val()
        var exchange = $("#cp_api_exchange").val()
        ajax_market_http(http_addr,exchange, "json")
    })

    // ajax 请求市场api
    function ajax_market_http(http_url, market, fam) {
        $.ajax({
            url: "/request_" + fam + "_to_json",
            data: {
                'rurl': encodeURIComponent(http_url)
            },
            async: true,
            timeout: 25000,
            success: function (data) {
                console.log(data)
                $("#json_request").text(http_url)
                $("#json_request_row").show()
                $("#json_str_output").text(JSON.stringify(data, null, 4))


                // market
                if (market == "coinex") {
                    market_coinex(data, market)
                } else if (market == "coinbene") {
                    market_coinbene(data, market)
                } else if (market == "okex") {
                    market_okex(data, market)
                }else if (market == "ba") {
                    market_ba(data, market)
                }else if (market == "hbp") {
                    market_hbp(data, market)
                }else if (market == "hadax") {
                    market_hadax(data, market)
                }else if (market == "bf") {
                    market_bf(data, market)
                }else if (market == "gt"){
                    market_gt(data, market)
                }else if (market == "bcex"){
                    var coin_quote = $("#market_choice_select option:selected").text().trim().split(" ")[1].split("#")[1]
                    console.log($("#market_choice_select option:selected").text().trim().split(" ")[1].split("#")[1])
                    if (coin_quote == "eth"){
                        market_bcex_eth(data, market)
                    } else{
                        market_bcex_btc(data, market)
                    }
                }else if (market == "hit"){
                    market_hit(data, market)
                }else if (market == "zb") {
                    market_zb(data, market)
                }else if (market == "pl") {
                    market_pl(data, market)
                }else if (market == "rf") {
                    market_rf(data, market)
                }else if (market == "kucoin") {
                    market_kucoin(data, market)
                }else if (market == "bithumb") {
                    market_bithumb(data, market)
                }else if (market == "hitbtc") {
                    market_hitbtc(data, market)
                }else if (market == "hibtc") {
                    market_hibtc(data, market)
                }else if (market == "kraken"){
                    market_kraken(data,market)
                }else if (market == "cbp"){
                    market_cbp(data,market)
                }else if (market == "bitmex"){
                    market_bitmex(data, market)
                }else if (market == "coinsuper") {
                    market_bitmex(data, market)
                }else if (market == "bitstamp") {
                    market_bitstamp(data, market)
                }
            },
            error: function (obj, info) {
                alert(obj.status + " " + obj.statusText)
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                $("#market_choice_submiting").hide()
                if (status == 'timeout') {//超时,status还有success,error等值的情况
                    ajaxTimeOut.abort(); //取消请求
                    alert("请求超时");
                }
            }
        });
    }

    // coinex 的json解析
    function market_coinex(data, market) {
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("data:(PC)")
        $("#cp_json_key_currency_form").show()
        $("#cp_json_key_currency").val("usd,btc,eth,okb,ht,bnb")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    // coinbene 的json解析
    function market_coinbene(data, market) {
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("symbol:(baseAsset_P,quoteAsset_C)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    // okex 的json解析
    function market_okex(data, market) {
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("data:(1-P_C)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    // ba 的json解析
    function market_ba(data, market) {
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("symbols:(baseAsset_P, quoteAsset_C)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    function market_hbp(data, market) {
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("data:(quote-currency_C,base-currency_P)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    function market_hadax(data, market) {
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("data:(quote-currency_C,base-currency_P)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    function market_bf(data, market){
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("data:(symbol-coin_C_P)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    function market_gt(data, market){
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("(P_C)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    function market_zb(data, market){
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("P_C()")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    function market_pl(data, market){
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("C_P()")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    function market_rf(data, market){
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("(name_P/C)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    function market_kucoin(data, market){
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("data:(coinTypePair_C,coinType_P)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }


    function market_bithumb(data, market){
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("bithumb")
        data_json = data
        market_name = market
        sub_disabled(false)
    }


    function market_hitbtc(data, market){
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("symbols:(commodity_P, currency_C)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    function market_hibtc(data, market){
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("hibtc")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    function market_bitmex(data, market){
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("(quoteCurrency_C, baseCurrency_P)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    function market_bitstamp(data, market){
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("(name_P/C)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    function market_kraken(data, market){
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("result:(base_P, quote_C)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    function market_bcex_eth(data, market){
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("eth:(coin_to_C,coin_from_P)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    function market_bcex_btc(data, market){
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("btc:(coin_to_C,coin_from_P)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    function market_hit(data, market){
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("(quoteCurrency_C, baseCurrency_P)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    function market_cbp(data, market){
        $("#cp_json_key_name").show()
        $("#cp_json_key").val("(quoteCurrency_C, baseCurrency_P)")
        data_json = data
        market_name = market
        sub_disabled(false)
    }

    // 去服务器比对 api和db之间交易对的差异
    $('#sub_and_ana').click(function () {
        result_hide(true)

        var cjk = $("#cp_json_key").val()
        var json = JSON.stringify(data_json)
        var market = market_name
        var currency = $("#cp_json_key_currency").val().split(",")
        //console.log(cjk)
        //console.log(json)
        //console.log(market)
        split_cp = check_syb(cjk, data_json)
        if (split_cp == false){
            alert("匹配失败，重新填写表达式或者。。这是个bug")
            return false;
        }
        console.log(split_cp)
        var url = ""
        var cp = ""

        var regx1 = /CP/
        var regx2 = /PC/
        if (regx1.test($("#cp_json_key").val())) {
            cp = "cp"
            url = "request_no_split"
        } else if (regx2.test($("#cp_json_key").val()) ) {
            cp = "pc"
            url = "request_no_split"
        }else{
            url = "request_has_split"
        }

        $.ajax({
            url: url,
            data: {
                'market': market,
                'split_cp': JSON.stringify(split_cp),
                'currency': JSON.stringify(currency),
                'cp': cp
            },
            type: "post",
            async: true,
            timeout: 25000,
            dataType: "json",
            success: function (data) {
                console.log(data)
                if (data["success"] == true){
                    result_gen(data, handle=false)
                }
            },
            error: function (obj, info) {
                alert(obj.status + " " + obj.statusText)
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                if (status == 'timeout') {//超时,status还有success,error等值的情况
                    ajaxTimeOut.abort(); //取消请求
                    alert("请求超时");
                }
            }
        });

        function check_syb(cjk, data_json) {
            ll = cjk.length
            for (i in cjk) {
                if (cjk[i] == ":") {
                    console.log(":")
                    if (cjk[i * 1 + 1] == "(") {
                        var data_json_temp = cjk.substring(i * 1 + 2, ll * 1 - 1)
                        // data:(CP)
                        if (data_json_temp.indexOf("CP") != -1 || data_json_temp.indexOf("PC") != -1 ) {
                            cp_arr = []
                            for (k in data_json[cjk.substring(0, i)]) {
                                var temp_cp = []
                                temp_cp.push(data_json[cjk.substring(0, i)][k])
                                cp_arr.push(temp_cp)
                            }
                            return cp_arr

                            // bf
                        }else if (data_json_temp.indexOf("_C_P") != -1) {
                            cp_arr = []
                            key_item = data_json_temp.split("-")[0]
                            for (k in data_json[cjk.substring(0, i)]) {
                                var temp_cp = data_json[cjk.substring(0, i)][k][key_item].split("-")
                                cp_arr.push([temp_cp[1],temp_cp[2]])
                            }
                            return cp_arr

                            // data:(1-C_P)
                        }else if (data_json_temp.indexOf("C_P") != -1) {
                            cp_arr = []
                            key_item = data_json_temp.split("-")[0]
                            for (k in data_json[cjk.substring(0, i)]) {
                                var temp_cp = []
                                cp_arr.push(data_json[cjk.substring(0, i)][k][key_item * 1].split("_"))
                            }
                            // console.log(cp_arr)
                            return cp_arr
                        }else if (data_json_temp.indexOf("P_C") != -1) {
                                cp_arr = []
                                key_item = data_json_temp.split("-")[0]
                                for (k in data_json[cjk.substring(0, i)]) {
                                    var temp_cp = data_json[cjk.substring(0, i)][k][key_item * 1].split("_")
                                    cp_arr.push([temp_cp[1], temp_cp[0]])
                                }
                                return cp_arr
                        } else {
                            console.log("++++++")
                            var regx = /[1-9]{1,}_/
                            var cp_arr = []
                            // symbol:(1-C,2-P)
                            if (regx.test(data_json_temp)) {
                                key_item = data_json_temp.split(",")[0].split("_")[0].trim()
                                key2_item = data_json_temp.split(",")[1].split("_")[0].trim()
                                //console.log(key_item,key2_item )
                                for (k in data_json[cjk.substring(0, i)]) {
                                    var temp_cp = []
                                    temp_cp.push(data_json[cjk.substring(0, i)][k][key_item])
                                    temp_cp.push(data_json[cjk.substring(0, i)][k][key2_item])
                                    cp_arr.push(temp_cp)

                                }
                                return cp_arr

                                // symbol:(baseAsset-C,quoteAsset-P)
                            } else {
                                console.log("++++000000000")
                                //var regx = /[\w-]{1,}_C,/
                                var regx = /^[a-zA-Z-]{1,}_C,/
                                var cp_arr = []
                                if (regx.test(data_json_temp)) {
                                    key_item = data_json_temp.split(",")[0].split("_")[0].trim()
                                    key2_item = data_json_temp.split(",")[1].split("_")[0].trim()
                                    for (k in data_json[cjk.substring(0, i)]) {
                                        var temp_cp = []
                                        temp_dict = data_json[cjk.substring(0, i)][k]
                                        temp_cp.push(temp_dict[key_item])
                                        temp_cp.push(temp_dict[key2_item])
                                        cp_arr.push(temp_cp)

                                    }
                                    return cp_arr
                                }
                                var regx = /^[a-zA-Z-]{1,}_P,/
                                var cp_arr = []
                                if (regx.test(data_json_temp)) {
                                    key_item = data_json_temp.split(",")[0].split("_")[0].trim()
                                    key2_item = data_json_temp.split(",")[1].split("_")[0].trim()
                                    console.log(key_item, key2_item)
                                    for (k in data_json[cjk.substring(0, i)]) {
                                        var temp_cp = []
                                        temp_cp.push(data_json[cjk.substring(0, i)][k][key2_item])
                                        temp_cp.push(data_json[cjk.substring(0, i)][k][key_item])
                                        cp_arr.push(temp_cp)

                                    }
                                    return cp_arr
                                }


                                var regx = /^[a-zA-Z_]{1,}_C,/
                                var cp_arr = []
                                if (regx.test(data_json_temp)) {
                                    key_item = data_json_temp.split(",")[0].split("_")[0].trim() + "_" + data_json_temp.split(",")[0].split("_")[1].trim()
                                    key2_item = data_json_temp.split(",")[1].split("_")[0].trim() + "_" + data_json_temp.split(",")[1].split("_")[1].trim()
                                    console.log(key_item)
                                    for (k in data_json[cjk.substring(0, i)]) {
                                        var temp_cp = []
                                        temp_dict = data_json[cjk.substring(0, i)][k]
                                        temp_cp.push(temp_dict[key_item])
                                        temp_cp.push(temp_dict[key2_item])
                                        cp_arr.push(temp_cp)

                                    }
                                    return cp_arr
                                }
                            }
                        }

                        return false
                    } else {
                        n = i * 1 + 1
                        return check_syb(cjk.substring(n), data_json[cjk.substring(0, i)])
                        //console.log(cjk.substring(0,i))
                        return false
                    }
                }else if (cjk[i] == "(" && cjk[i+1] != ")") {
                    console.log("(")

                    var data_json_temp = cjk.substring(i * 1 + 1, ll * 1 - 1)
                    if (data_json_temp.indexOf("C_P") != -1) {
                        cp_arr = []
                        key_item = data_json_temp.split("-")[0]
                        for (k in data_json){
                            var temp_cp = []
                            cp_arr.push(data_json[k].split("_"))
                        }
                        return cp_arr
                    }else if (data_json_temp.indexOf("P_C") != -1) {
                        cp_arr = []
                        key_item = data_json_temp.split("-")[0]
                        for (k in data_json){
                            var temp_cp = []
                            cp_arr.push(data_json[k].split("_").reverse())
                        }
                        return cp_arr
                    }else {

                        //var regx = /[\w-]{1,}_C,/
                        var regx = /^[a-zA-Z-]{1,}_C,/
                        var cp_arr = []
                        if (regx.test(data_json_temp)) {
                            key_item = data_json_temp.split(",")[0].split("_")[0].trim()
                            key2_item = data_json_temp.split(",")[1].split("_")[0].trim()
                            for (k in data_json) {
                                var temp_cp = []
                                temp_dict = data_json[k]
                                temp_cp.push(temp_dict[key_item])
                                temp_cp.push(temp_dict[key2_item])
                                cp_arr.push(temp_cp)
                            }
                            return cp_arr
                        }

                        var regx = /^[a-zA-Z-]{1,}_P\/C$/
                        var cp_arr = []
                        if (regx.test(data_json_temp)) {
                            console.log("P/C")
                            console.log(data_json_temp)
                            key_item = data_json_temp.split("_")[0].trim()
                            for (k in data_json) {
                                var temp_cp = []
                                temp_dict = data_json[k]
                                cp_arr.push(temp_dict[key_item].split("/").reverse())
                            }
                            return cp_arr
                        }

                        var regx = /^[a-zA-Z-]{1,}_C\/P$/
                        var cp_arr = []
                        if (regx.test(data_json_temp)) {
                            console.log("P/C")
                            console.log(data_json_temp)
                            key_item = data_json_temp.split("_")[0].trim()
                            for (k in data_json) {
                                var temp_cp = []
                                temp_dict = data_json[k]
                                cp_arr.push(temp_dict[key_item].split("/"))
                            }
                            return cp_arr
                        }



                        return false
                    }

                }else if (cjk == "P_C()"){
                    var cp_arr = []
                        console.log("+_+_+_+_+_+_")
                        console.log(cjk)
                        for (k in data_json) {
                            console.log(k)
                            var temp_cp = []
                            temp_cp.push(k.split("_")[1], k.split("_")[0])
                            cp_arr.push(temp_cp)
                        }
                        return cp_arr
                }else if (cjk == "C_P()"){
                    var cp_arr = []
                    console.log("+_+_+_+_+_+_")
                    console.log(cjk)
                    for (k in data_json) {
                        console.log(k)
                        var temp_cp = []
                        temp_cp.push(k.split("_")[0], k.split("_")[1])
                        cp_arr.push(temp_cp)
                    }
                    return cp_arr
                }else if (cjk =="bithumb"){
                    var cp_arr = []
                    console.log("+_+_+_+_+_+_")
                    console.log(cjk)
                    for (k in data_json["data"]) {
                        console.log(k)
                        cp_arr.push(["krw", k])
                    }
                    return cp_arr

                }else if (cjk =="hibtc"){
                    var cp_arr = []
                    console.log("+_+_+_+_+_+_")
                    console.log(cjk)
                    for (k in data_json["data"]["pairs"]) {
                        console.log(k)
                        cp_arr.push(data_json["data"]["pairs"][k][0].split("_").reverse())
                    }
                    return cp_arr

                }
            }
        }
    })

    // 生成比对结果元素
    function result_gen(data, handle) {
        no_same_pairs = data["no_same_pairs"]
        $.each(no_same_pairs, function (i, item) {
             $('#result_new_select').append($('<option>', {
                 value: no_same_pairs[i],
                 text : no_same_pairs[i]
             }));
        });
        $("#result_new_title").text("比对结果 - [不存在数据库] - " + no_same_pairs.length + " 个")

        if(handle){
            db_no_compar_pairs = data["db_no_compar_pairs"]
            $.each(db_no_compar_pairs, function (i, item) {
                $('#result_has_select').append($('<option>', {
                    value: db_no_compar_pairs[i],
                    text: db_no_compar_pairs[i]
                }));
            });
            $("#result_has_title").text("比对结果 - [已存在] - " + db_no_compar_pairs.length + " 个")

        }else {

            same_pairs = data["same_pairs"]
            $.each(same_pairs, function (i, item) {
                $('#result_has_select').append($('<option>', {
                    value: same_pairs[i],
                    text: same_pairs[i]
                }));
            });
            $("#result_has_title").text("比对结果 - [存在于数据库] - " + same_pairs.length + " 个")

            db_no_compar_pairs = data["db_no_compar_pairs"]
            $.each(db_no_compar_pairs, function (i, item) {
                $('#result_del_select').append($('<option>', {
                    value: db_no_compar_pairs[i],
                    text: db_no_compar_pairs[i]
                }));
            });
            $("#result_del_title").text("比对结果 - [数据库失效] - " + db_no_compar_pairs.length + " 个")

        }

        result_hide(false)
    }

    // 监控 #result_new_title 可以新增币对 变化
    $('#result_new_select').on('change', function() {
        new_selectd_str = ""
        selectd = $('#result_new_select').val()
        $.each(selectd, function (i, item) {
            new_selectd_str = new_selectd_str + "<p>" + selectd[i] + "</p>"
        })
        $("#result_new_selected").html(new_selectd_str)
        result_new = selectd
    });

    // 监控 #result_has_title 存在币对 变化
    $('#result_has_select').on('change', function() {
        has_selectd_str = ""
        selectd = $('#result_has_select').val()
        $.each(selectd, function (i, item) {
            has_selectd_str = has_selectd_str + "<p>" + selectd[i] + "</p>"
        })
        $("#result_has_selected").html(has_selectd_str)
        result_has = selectd
    });

    // 监控 #result_del_title 删除对 变化
    $('#result_del_select').on('change', function() {
        del_selectd_str = ""
        selectd = $('#result_del_select').val()
        $.each(selectd, function (i, item) {
            del_selectd_str = del_selectd_str + "<p>" + selectd[i] + "</p>"
        })
        $("#result_del_selected").html(del_selectd_str)
        result_del = selectd
    });

    // result submit
    $("#result_new_submit").on( "click", function () {
        $.ajax({
            url: "/request_submit_new_result",
            data: {
                'result_new': JSON.stringify(result_new),
                'market_name': market_name
            },
            type: "post",
            async: true,
            timeout: 25000,
            dataType: "json",
            success: function (data) {
                console.log(data)

                $("#sub_and_ana").click()
            },
            error: function (obj, info) {
                alert(obj.status + " " + obj.statusText)
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                if (status == 'timeout') {//超时,status还有success,error等值的情况
                    ajaxTimeOut.abort(); //取消请求
                    alert("请求超时");
                }
            }
        });
    })

    $('#result_del_submit_modal').on("click", function(){
        $("#submit_modal_market").text(market_name)
        var result_del_str = ""
        $.each(result_del,function (i, item) {
            result_del_str = result_del_str + result_del[i] + "<br>"
        })
        $("#submit_modal_coin").html(result_del_str)


    })
    $("#result_del_submit").on( "click", function () {

        $.ajax({
            url: "/request_submit_del_result",
            data: {
                'result_del': JSON.stringify(result_del),
                'market_name': market_name
            },
            type: "post",
            async: true,
            timeout: 25000,
            dataType: "json",
            success: function (data) {
                console.log(data)
                $("#sub_and_ana").click()
            },
            error: function (obj, info) {
                alert(obj.status + " " + obj.statusText)
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                $("#result_del_submit_close").click()
                if (status == 'timeout') {//超时,status还有success,error等值的情况
                    ajaxTimeOut.abort(); //取消请求
                    alert("请求超时");
                }
            }
        });
    })

    // handle add
    function handle_add_cp() {
        $("#handle_add_cp").show()

        /*$.ajax({
            url: "/request_all_market",
            async: true,
            timeout: 5000,
            success: function (data) {
                console.log(data)
                $('#handle_add_market_select')
                    .find('option')
                    .remove()
                    .end()
                $.each(data, function (i, item) {
                    $('#handle_add_market_select').append($('<option>', {
                        value: data[i],
                        text : data[i]
                    }));
                });
            },
            error: function (obj, info) {
                alert(obj.status + " " + obj.statusText)
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                if (status == 'timeout') {//超时,status还有success,error等值的情况
                    ajaxTimeOut.abort(); //取消请求
                    alert("请求超时");
                }
            }
        });*/

    }

    // handle submit
    $("#handle_add_market_submit").on('click', function(){
        result_hide(true)
        var handle_master_coin = $("#coin_c_handle").val().trim()
        var handle_other_coin = $("#coin_p_handle").val().trim()
        var handle_makert = $("#handle_add_market_select").val()

        if (handle_master_coin == "" || handle_other_coin == "" || handle_makert == "") {
            alert("不能为空")
            return false
        }

        $.ajax({
            url: "/request_has_split",
            data: {
                'market': handle_makert,
                'split_cp': JSON.stringify([[handle_master_coin, handle_other_coin]])
            },
            type: "post",
            async: true,
            timeout: 25000,
            dataType: "json",
            success: function (data) {
                console.log(data)
                if (data["success"] == true){
                    result_gen(data, handle=true)
                }
            },
            error: function (obj, info) {
                alert(obj.status + " " + obj.statusText)
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                if (status == 'timeout') {//超时,status还有success,error等值的情况
                    ajaxTimeOut.abort(); //取消请求
                    alert("请求超时");
                }
            }
        });
    })



})
