$(function() {

    // 编辑页面要获得点击的那个对象 但是在另一个函数里面 这里声明一个全局对象获取
    var bianliang = null;


    //获取收货地址管理数据
    $.ajax({
        type: "get",
        url: "/address/queryAddress",
        success: function(response) {
            bianliang = response
                // console.log(response)
                // 这里新注册的账号数据库没数据 得用itcast登录
            var html = template("tel", { doc: response })
            $("#box").html(html);
        }
    });


    // 给删除按钮添加时间 因为有多个 不能使用id且动态渲染的 事件委托
    $("#box").on("tap", ".clearbtn", function() {
        var id = $(this).attr("data-id")
            // console.log(id)
            //这里弹出的确认框 也是由mui组件提供 里面有几个参数 对应 
            //可看文档   这个回调函数是看返回值
        mui.confirm("你确定删除吗", "大哥", function(callback) {
            // console.log(callback)

            if (callback.index == 1) {
                $.ajax({
                    type: "post",
                    url: "/address/deleteAddress",
                    data: {
                        id: id
                    },
                    success: function(response) {

                        if (response.success) {
                            // console.log(response)
                            location.reload()
                        } else {
                            mui.toast("删除失败")
                        }
                    }
                });
            } else {
                location.reload()
            }
        })



    })


    // 给编辑按钮添加事件 因为有多个 不能使用id且动态渲染的 事件委托

    $("#box").on("tap", ".editbtn", function() {

        // 先获取到id
        var id = $(this).attr("data-id")
        console.log(id)
            // 获取对应的信息 
        console.log(bianliang)


        //循环出对应的那个点击信息
        for (var i = 0; i < bianliang.length; i++) {
            // 这里打印出的是页面上所有的信息
            // console.log(bianliang[i])

            if (bianliang[i].id == id) {
                // 这里打的是id对应的想要的那个
                // console.log(bianliang[i])

                // 本地储存只能是字符串形式


                // 找到了就要把它存贮起来 带到另外一个页面在显示
                localStorage.setItem("bianliang", JSON.stringify(bianliang[i]))


                // 找到了就终止循环
                break
            }

        }
        //跳转到编辑页面  因为编辑跟添加长得一模一样
        location.href = "addAddress.html?key=1"

    })



})