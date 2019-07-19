$(function() {

    //先点击获取验证码
    $(".yanzhengma").on("tap", function() {
        $.ajax({
            type: "get",
            url: "/user/vCode",
            success: function(response) {
                alert(response.vCode)
            }
        });
    })



    //为表单作注册提交事件
    $("#zhuce").on("tap", function() {
        //手动根据name获取每个表单input框中输入的内容
        var username = $("[name=username]").val()
        var mobile = $("[name=mobile]").val()
        var password = $("[name=password]").val()
        var passwords = $("[name=passwords]").val()
        var vCode = $("[name=vCode]").val()

        //获取之后就要开始做验证
        if (!username.trim().length) {
            // alert("请输入用户名")
            // 显示在页面下面 mui框架里有一个mui.toast()
            mui.toast("请输入用户名")
            return
        }
        //验证手机号码的正则表达式
        var teg = /^1(3|4|5|7|8)\d{9}$/
        if (!teg.test(mobile)) {
            mui.toast("请输入正确的手机号格式")
            return
        }
        //密码的验证
        if (password.trim().length == 0) {
            mui.toastt("请输入密码！")
            return
        } else if (password != passwords) {
            mui.toast("两次输入的密码不一致")
            return
        }
        //验证码验证
        var tegs = /[0-9]{6}/
        if (!tegs.test(vCode)) {
            mui.toast("请输入正确的验证码格式")
            return
        }

        $.ajax({
            type: "post",
            url: "/user/register",
            data: {
                username: username,
                mobile: mobile,
                password: password,
                passwords: passwords,
                vCode: vCode
            },
            success: function(response) {
                console.log(response)

                setTimeout(function() {
                    mui.toast("注册成功,即将跳转到登录页面")
                    location.href = "login.html"
                }, 2000)


            }
        });





        return false;
    })











})