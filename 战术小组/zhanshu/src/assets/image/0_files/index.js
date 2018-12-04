! function(window) {
    var ie = function() {
        if (!window.ActiveXObject) return false;
        var userAgent = window.navigator.userAgent.toLowerCase();
        var match = userAgent.match(/msie ([\d.]+)/);
        return match && match.length && match[1] || false;
    }();

    var syncLoad = function(src) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.async = false;
        document.body.appendChild(script);
        return script;
    };

    function asyncLoad (url, callback, onerror) {

        var el = document.createElement('script');

        document.getElementsByTagName('head')[0].appendChild(el);

        el.src = url;

        el.onload = function () {
            el.onload = el.onreadystatechange = null;
            callback && callback(1);
        };

        el.onreadystatechange = function () {

            if (el.readyState === 'loaded'|| el.readyState === 'complete') {
                el.onload = el.onreadystatechange = null;

                if (callback) {
                    setTimeout(callback);
                }
            }
        };
        el.onerror = function (error) {

            el.onerror = null;
            onerror && onerror(error);
        };
    }

    var preLoad = {
        v: window.VERSION || '',
        assetsHost: window.HOSTS.assets,
        paths: function() {
            return {
                ie: '//' + this.assetsHost + '/supportbox_v2/js/ie.js?v=' + this.v,
                ie_scripts: '//' + this.assetsHost + '/supportbox_v2/js/scripts.ie.js?v=' + this.v,
                ie_vendors: '//' + this.assetsHost + '/supportbox_v2/js/vendors.ie.js?v=' + this.v,
                ie_app: '//' + this.assetsHost + '/supportbox_v2/js/app.ie.js?v=' + this.v,
                scripts: '//' + this.assetsHost + '/supportbox_v2/js/scripts.js?v=' + this.v,
                vendors: '//' + this.assetsHost + '/supportbox_v2/js/vendors.js?v=' + this.v,
                app: '//' + this.assetsHost + '/supportbox_v2/js/app.js?v=' + this.v
            }
        },
        loadScripts: function() {
            var srcs = arguments;
            if (srcs.length === 0) return;
            srcs = Array.prototype.slice.call(srcs);
            for (var i = 0; i < srcs.length; i++) {
                syncLoad(srcs[i]);
            }
        },
        syncLoadScripts: function() {
            var self = this,
                srcs = arguments,
                next;
            if (srcs.length === 0) return;
            srcs = Array.prototype.slice.call(srcs);
            next = function() {
                var src = srcs.shift();

                src && asyncLoad(src, next);
            };
            next();
        }
    };

    var paths = preLoad.paths();

    if (ie && +ie <= 9) {
        preLoad.syncLoadScripts(paths.ie, /*paths.ie_scripts,*/ paths.ie_vendors, paths.ie_app);
    } else {
        preLoad.loadScripts( /*paths.scripts,*/ paths.vendors, paths.app);
    }

}(window);
