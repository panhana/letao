$(function() {

    startHtml();

    //这里把页面一上来就加载的数据封装成一个函数，页面一上来就调用，
    //然后下面点击禁用按钮变化的时候也调用这个函数，就不用刷新，给人很好的体验
    function startHtml() {
        //页面一上来就调用  用户查询
        $.ajax({
            type: "get",
            url: " /user/queryUser",
            data: {
                page: 1,
                pageSize: 10
            },
            success: function(response) {
                console.log(response)

                // 获取到以后开始模板拼接了
                var html = template("tel", response)
                    // console.log(html);
                $("#box").html(html)
            }
        });
    }


    // 更新用户状态
    // 点击禁用成启用，启用成禁用
    $("#box").on("click", ".btn", function() {
        var id = $(this).attr("data-id")
        var isDelete = $(this).attr("data-isDelete")
        console.log(id)
        console.log(isDelete)
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id: id,
                isDelete: isDelete == 1 ? 0 : 1
            },
            success: function(response) {
                console.log(response)
                startHtml();
            }
        });

    })





})