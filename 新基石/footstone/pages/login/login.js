Page({
    data: {},
    btnGetUserInfo: function(n) {
        console.log(n.detail.userInfo), n.detail.userInfo ? (console.log("授权成功"), wx.switchTab({
            url: "/pages/index/index"
        })) : wx.redirectTo({
            url: "/pages/unauthorized/unauthorized"
        });
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});