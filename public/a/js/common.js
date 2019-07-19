//登录拦截 需登录才能进其它页面
$.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    //改为同步
    async: false,
    success: function(response) {
        // console.log(response);
        if (response.error && response.error == 400) {
            location.href = "login.html"
        }
    }
});


$(function() {
    var navLi = $('.navs li')
    navLi.on('click', function() {
        $(this).find('ul').slideToggle();

    });
    //实现退出功能  每个页面都有，写在公共样式里面
    $(".login_out_bot").on("click", function() {

        if (confirm("确定要退出吗")) {
            // 登出接口就是退出接口
            $.ajax({
                type: "get",
                url: "/employee/employeeLogout",
                success: function(response) {
                    console.log(response);
                    if (response.success) {
                        location.href = "login.html"
                    } else {
                        alert("退出失败嘞")
                    }
                }
            });

        }

    })

});