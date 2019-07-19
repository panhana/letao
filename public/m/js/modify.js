$(function() {

    //先获取点击发送认证码
    $(".yanzhengma").on("click", function() {
        $.ajax({
            type: "get",
            url: " /user/vCodeForUpdatePassword",
            success: function(response) {
                alert(response.vCode)
            }
        });
    })


    //点击确认修改按钮做操作
    $("#denglu").on("click", function() {
        // 原密码
        var oldpassword = $.trim($("[name=oldpassword]").val())
            // 新密码
        var newpassword = $.trim($("[name=newpassword]").val())
            // 确认新密码
        var newpasswords = $.trim($("[name=newpasswords]").val())
            // 认证码
        var vCode = $.trim($("[name=vCode]").val())

        if (!oldpassword) {
            mui.toast("请输入原密码")
            return
        }

        if (!newpassword) {
            mui.toast("请输入新密码")
            return
        }
        if (newpassword != newpasswords) {
            mui.toast("两次密码输入不一致")
            return
        }

        //通过了验证 调用修改密码的接口
        $.ajax({
            type: "post",
            url: " /user/updatePassword",
            data: {
                oldPassword: oldpassword,
                newPassword: newpassword,
                vCode: vCode
            },
            success: function(response) {
                mui.toast("修改密码成功，即将跳转到登录页面")

                setTimeout(function() {
                    location.href = "login.html"
                }, 2000)
            }
        });






    })



})