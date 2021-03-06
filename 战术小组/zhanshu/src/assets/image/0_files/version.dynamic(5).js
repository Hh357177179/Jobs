
    window.LatestVersion =  20181026
    window.LatestBuildTimestamp = 1543034351688 
    window.LatestBuildTime =  "2018-11-24 12:39:11"

// 任意代码

if (!window.AppVersion || window.AppVersion < 20181026
)
{
    location.reload(true)
}

//todo 内测临时更新提示框记录
var noteVer = 40 // 每次新提示，这里 + 1

if (localStorage.__beta_temp_betaVersionNote == undefined)
{
    localStorage.__beta_temp_betaVersionNote = noteVer
} else if (!inIframe())
{

    if (localStorage.__beta_temp_betaVersionNote && (+localStorage.__beta_temp_betaVersionNote < noteVer))
    {

        function showUpdateDialog ()
        {
            localStorage.__beta_temp_betaVersionNote = noteVer
            LanhuDialog.newVerNote(

                `🍻发现新版本 2018/11/1`, `
[新增] 画布页，现在可以选中设计图后通过右键菜单把它添加到指定分组了
[新增] 画布页，下载多张设计图时会打包为 ZIP 
[新增] 标注解析支持 Sketch 52.1 新增的文本区域对齐方式
[新增] 现在标注支持 Photoshop 设计图的全局光属性了
[优化] 查看者权限的用户不会再看到与邀请有关的引导了
[优化] 画布页右键菜单的顺序与布局得到了优化
[优化] 在标注页面不再会因为误操作而缩放整个网页了
[优化] 标注页展示的图层各项属性有了更合理顺序
[优化] 图层穿透时不会立即显示测距而是优先显示图层尺寸
[优化] 设计图生成代码时如果选择的是安卓设备会为字体尺寸使用 sp 单位
[优化] 旧版本插件上传的设计图会根据设计图尺寸自动分配默认设计倍数了
[修复] 生成邀请链接的菜单显示错位的 BUG
[修复] 通知菜单点击信息后，小红点不会立即消失的 BUG
[修复] 文本携带渐变色文字描边效果时，无法显示样式代码的问题
[修复] 标注页历史版本没有滚动条的 BUG
[修复] 低版本浏览器的兼容性问题
[修复] 登录页面头像错位的问题
[修复] 画布页项目分排序的问题
[修复] 某些情况下意见反馈社区无法正常登录的问题

             `
                , "开启新版")
        }

        setTimeout(function ()
        {
            if (window.LanhuDialog)
            {
                showUpdateDialog()
            } else
            {
                setTimeout(showUpdateDialog, 1000)
            }
        }, 150)

    }

}


function inIframe ()
{
    try
    {
        return window.self !== window.top
    } catch (e)
    {
        return true
    }
}
