var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    baseUrl: "https://ssl.zhaodaka.net/xinjishi/api",
    showMsg: function(t) {
        wx.showToast({
            title: t,
            mask: !0,
            icon: "none"
        });
    },
    formatTime: function(e) {
        var n = e.getFullYear(), o = e.getMonth() + 1, s = e.getDate(), i = e.getHours(), a = e.getMinutes(), r = e.getSeconds();
        return [ n, o, s ].map(t).join("/") + " " + [ i, a, r ].map(t).join(":");
    }
};