$(function() {


    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 声明一个存储库存的变量
    var kuncun = null;

    //声明一个有没有选择尺码加入到购物车的变量
    var size = null;



    //产品id
    var id = getUrlParams("id")
        // console.log(id);

    // 搜索页面点击进详情页 需要在地址栏传一个id过来
    // 拿到id以后调用ajax请求
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {
            id: id
        },
        success: function(response) {
            // console.log(response)

            // 打印出来后开始模板拼接了  返回的是一个对象
            var html = template("tel", response)
                // console.log(html);

            kuncun = response.num;

            //这里的box要新创建一个 只是部分内容模板拼接 直接给父盒子 那么会覆盖所有的
            $("#box").html(html)


            // 初始化一下轮播图插件

            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({

            });



        }
    });



    // 点击尺码当前选中的变颜色
    // 动态渲染的 事件委托

    $("#box").on("tap", ".chima span", function() {
        $(this).addClass("bian").siblings().removeClass("bian")


        size = $(this).html();
    })




    $(".jia").on("tap", function() {
        // 数量点加就加 点减就减
        // 1 先获取input框的值
        var inp = $("#input").val()
        inp++;
        if (inp > kuncun) {
            inp = kuncun
        }
        $("#input").val(inp)

    })
    $(".jian").on("tap", function() {
        // 数量点加就加 点减就减
        // 1 先获取input框的值
        var inp = $("#input").val()
        inp--;
        if (inp < 1) {
            inp = 1
        }
        $("#input").val(inp)

    })



    //点击加入购物车
    $("#jiarun").on("tap", function() {

        // 第一步判断有没有选择尺码
        if (!size) {
            mui.toast("请选择尺码")
            return
        }

        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: {
                // 产品id
                productId: id,
                // 产品数量
                num: inp,
                // 产品尺码
                size: size

            },
            success: function(response) {
                console.log(response)

                if (response.success) {
                    mui.confirm("要不要去购物车看看?", function(doc) {
                        console.log(doc)

                        if (doc.index == 1) {
                            //还没有创建
                            location.href = "cart.html"
                        }

                    })
                }


            }
        });





    })




    // 从浏览器的地址栏中获取查询参数
    function getUrlParams(name) {
        var paramsAry = location.search.substr(1).split('&');
        // 循环数据
        for (var i = 0; i < paramsAry.length; i++) {
            var tmp = paramsAry[i].split('=');
            if (tmp[0] == name) {
                return tmp[1];
            }
        }
        return -1;
    }

})