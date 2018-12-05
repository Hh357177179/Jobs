var e = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.vurl, n = e.vmethod, o = e.params, r = {};
    return "POST" == n && (r = {
        "content-type": "application/x-www-form-urlencoded"
    }), new Promise(function(e, u) {
        null == t || "" == t ? u("请求地址未填写") : wx.request({
            url: t,
            method: n,
            header: r,
            data: o,
            success: function(t) {
                e(t);
            },
            fail: function(e) {
                console.log("网络错误"), u(e);
            }
        });
    });
};

module.export = {
    getRequest: function(t, n) {
        return e({
            vurl: t,
            vmethod: "GET",
            params: n
        });
    },
    postRequest: function(t, n) {
        return e({
            vurl: t,
            vmethod: "POST",
            params: n
        });
    }
};