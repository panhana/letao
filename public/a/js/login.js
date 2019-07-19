//登录拦截 登录状态下就不能跳转到登录页，而是跳转到住页面
$.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    //改为同步
    async: false,
    success: (res) => {
        // console.log(res);
        if (res.success) {
            location.href = "user.html"
        }
    }
});





$(function() {

    //pc端登录 获取登录按钮
    $("#login-btn").on("submit", function() {
        // 获取到转换为数组了
        var names = $(this).serializeArray()
            // console.log(names)

        // var teg = /[\u4e00-\u9fa5]{5}/
        if (!$.trim(names[0].value)) {
            alert("请输入用户名")
            return false
        } //else if (!teg.test(names[0].value)) {
        //     alert("请输入正确的用户格式")
        //     return false
        // }
        if (!$.trim(names[1].value)) {
            alert("请输入密码")
            return false
        }
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: names,
            success: function(response) {
                if (response.success) {
                    location.href = "user.html"
                } else {
                    alert(response.message)
                }

            }
        });
        return false
    })





})