$(function() {

        //实现退出功能
        $("#clearbtn").on("click", function() {
            $.ajax({
                type: "get",
                url: "/user/logout",
                beforeSend: function() {
                    $("#clearbtn").html("正在退出。。。")
                },
                success: function(response) {
                    console.log(response)
                    if (response.success) {
                        mui.toast("退出成功,即将跳转到首页")
                        setTimeout(function() {
                            $("#clearbtn").html("退出登录")
                            location.href = "index.html"
                        }, 3000)
                    }
                }
            });
        })

        // console.log(userinfo)
        var html = template("tel", userinfo)
        $("#box").html(html)
    })
    // 写在外面是因为点击那一瞬间可以看到个人信息页面,又因为是异步函数 ajax请求需要时间，还是会先执行入口函数里面 所以得改成同步
    //判断用户是否处于等于状态  点击时候显示哪个页面

//这里要开始动态展示数据 因为是在入口函数外面 页面还没加载完 所以拿不到 
// 解决方案是 申明一个变量 信息存在里面 再拿到入口函数里面去拼接
var userinfo = "";
$.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    // 改为同步
    async: false,
    success: function(response) {
        console.log(response)
        userinfo = response
        if (response.error && response.error == 400) {
            location.href = "login.html"
        }

    }
});