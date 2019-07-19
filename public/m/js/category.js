$(function() {


    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });


    //获取一级分类的数据
    $.ajax({
        type: "get",
        url: "/api/category/queryTopCategory",
        success: function(response) {
            // console.log(response)

            var html = template("tpl", { rows: response.rows })
                // console.log(html, 'html');
            $("#links").html(html)



            //如果一级分类有数据的话 获取第一个一级id的数据 让页面一开始不需要点击就有数据
            if (response.rows.length) {
                var id = response.rows[0].id

                //让页面一开始左边第一个a就被选中
                $("#links").find("a").eq(0).addClass("active")

                //这里也要调用到ajax请求 获取二级数据 让它一开始就
                // 显示在页面
                hei(id)
            }


        }
    });












    //点击一级分类获取对应二级分类内容  因为是动态渲染出来的要用到事件委托
    $("#links").on("click", "a", function() {
        var id = $(this).attr("data-id")

        //当a被点击的时候  给它添加active类 颜色变灰，有边框没有
        $(this).addClass("active").siblings().removeClass("active");
        hei(id)

    })

    //多次用到获取二级数据 所以封装成一个函数

    function hei(id) {
        $.ajax({
            type: "get",
            url: "/api/category/querySecondCategory",
            data: { id: id },
            success: function(response) {
                // console.log(response)
                var html = template("tel", { doc: response.rows })
                $("#erji").html(html)
            }
        });
    }











})