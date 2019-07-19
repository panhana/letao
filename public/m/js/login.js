$(function() {

    //给登录按钮绑定点击提交事件

    $("#denglu").on("click", function() {

        // 获取name值
        var username = $("[name=username]").val()
        var password = $("[name=password]").val()

        if (!username.trim().length) {
            mui.toast("请输入用户名")
            return
        } else if (!password.trim().length) {
            mui.toast("请输入密码")
            return
        }

        $.ajax({
            type: "post",
            url: "/user/login",
            data: {
                username: username,
                password: password
            },
            beforeSend: function() {
                $("#denglu").html("正在登录。。。")
            },
            success: function(response) {
                if (response.success) {
                    mui.toast("登录成功")

                    // 登录成功后跳转到会员中心页面 延时三秒
                    setTimeout(function() {
                        $("#denglu").html("登录")
                        location.href = "user.html"
                    }, 3000)
                } else if (!response.success) {
                    $("#denglu").html("登录")
                    mui.toast("账号或密码错误")
                }
            }
        });



    })




})