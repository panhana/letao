$(function() {

    //每页显示的条数跟当前第几页
    var page = 1,
        pageSize = 10


    //定义一个区接收总数量的变量
    var total = null;



    //页面一上来就要获取一级分类数据
    getData()





    //开始分页功能
    // 点击去下一页
    $("#xia").on("click", function() {
        page++;
        console.log(total);
        // total是总页数除以当前页数得出来的
        if (page > total) {
            alert("已经是最后一页了")
            return
        }
        getData()
    })

    //点击上一页
    $("#shang").on("click", function() {
        page--;
        console.log(total);
        // total是总页数除以当前页数得出来的
        if (page < 1) {
            alert("这已经是第一页了")
            return
        }
        getData()
    })



    // 一级分类添加  保存按钮
    $("#btn").on("click", function() {

        var neirong = $.trim($("#neirong").val());

        if (!neirong) {
            alert("请输入内容")
        }
        $.ajax({
            type: "post",
            url: " /category/addTopCategory",
            data: {
                //传递一个分类名称，也就是添加的内容
                categoryName: neirong
            },
            success: function(response) {
                if (response.success) {
                    location.reload()
                }
            }
        });


    })






    //分页也要用到获取页面一级数据里面的page参数，多次调用那一个ajax请求，把它封装成一个函数
    function getData() {
        $.ajax({
            type: "get",
            url: " /category/queryTopCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(response) {
                console.log(response);

                //总条数除以每页显示的条数， 就能得出点击下一页或上一页最多能点多少  向上取整
                total = Math.ceil(response.total / pageSize)
                    // 开始模板拼接
                var html = template("tel", response)
                    // console.log(html);
                $("#box").html(html)

            }
        });
    }

})