

function Wbs (){

    this.ws = ''

    this.on_mesg_callback = null

    this.init = function () {
        console.log("wbs initialized")
    }

    this.on_mesg_func = function (callback, object) {
        this.on_mesg_callback = callback
        this.callback_object = object
    }

    this.wsconn = function (uri, urlpath) {
        var that = this
        var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
        self.ws = new WebSocket(ws_scheme +"://" + uri + "/"+ urlpath)

        self.ws.onopen = function(evt) {
            that.onOpen(evt)
        };

        self.ws.onmessage = function(evt) {
            that.onMessage(evt)
        };

        self.ws.onclose = function(evt) {
            that.onClose(evt)
        };

        self.ws.onerror = function(evt) {
            that.onError(evt)
        };

    }

    this.send = function (message, callback) {
        this.waitForConnection(function () {
            self.ws.send(message);
            if (typeof callback !== 'undefined') {
                callback();
            }
        }, 1000);
    };

    this.onMessage = function (evt) {
        // console.log(evt.data)
        this.ws_status(evt.data)
    }

    this.onOpen = function (evt){
        console.log(evt.type)
    }

    this.onClose = function (evt) {
        console.log("Websocket Server closed.")
    }

    this.onError = function (evt) {
        console.log(evt.data)
    }

    this.waitForConnection = function (callback, interval) {
        if (this.ws.readyState === 1) {
            callback();
        } else {
            console.log("wait")
            var that = this;
            // optional: implement backoff for interval here
            setTimeout(function () {
                that.waitForConnection(callback, interval);
            }, interval);
        }
    };

    this.ws_status = function (data) {
        var trans = true
        try{
            data_dict = JSON.parse(data)
        }catch (e) {
            trans = false
            console.log("websocket message error! " + data)
            return false
        }
        //console.log("------ on mesg ---------")
        if (self.on_mesg_callback){
            // console.log(data_dict)
            self.on_mesg_callback(this.callback_object, data_dict)
        }else{
            console.log(data)
        }
    }

    this.init()

    return this
}