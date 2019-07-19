$(function() {

    var page = 1,
        pageSize = 10

    //分页中的总数量
    var total = null;

    //定义获取图片路径的变量
    var bianliang = null;



    //获取二级分类数据
    getData()

    // 做分页点击操作
    $("#nextBtn").on("click", function() {
        page++;
        //总页数41页，单一个，这里加个1
        if (page > total + 1) {
            alert("已经是最后一页了")
            return
        }
        getData()
    })

    // 做分页点击操作  上一页
    $("#prevBtn").on("click", function() {
        page--;
        //总页数41页，单一个，这里加个1
        if (page < 1) {
            page = 1
            alert("已经是第一页了")
            return
        }
        getData()
    })


    //获取二级数据的的分类列表
    $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
            page: 1,
            pageSize: 1000
        },
        success: function(response) {
            // console.log(response)
            // 开始模板引擎拼接
            var html = template("del", response)
                // console.log(html);
            $("#boxs").html(html)

        }
    });

    //上传图片     顺便做个图片预览
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function(e, data) {
            // console.log(data)
            bianliang = data._response.result.picAddr;
            $("#showBrand").attr("src", bianliang);
        }
    });



    //二级数据  添加分类 点击保存按钮做事件
    $("#btn").on('click', function() {
        //获取到了所属分类id
        var categoryId = $("#boxs").val();
        //品牌图片上传路径
        // bianliang;
        //获取品牌名称
        var brandName = $("[name=brandName]").val()
            // console.log(brandName)
        $.ajax({
            type: "post",
            url: '/category/addSecondCategory',
            data: {
                // //品牌名称
                brandName: brandName,
                // //所属分类id
                categoryId: categoryId,
                // // 图片上传路径
                brandLogo: bianliang,
                // //是否火热品牌,没有做，否认1
                hot: 1
            },
            success: function(response) {
                if (response.success) {
                    location.reload()
                }
            }
        });
    })





    //因为分类里面要用到获取二级分类数据中的page参数,多次发送ajax请求 所以把它封装在一个函数中
    function getData() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(response) {
                // console.log(response)

                total = response.total / pageSize
                    //开始模板拼接
                var html = template("tel", response)
                    // console.log(html);
                $("#box").html(html)
            }
        });
    }



})