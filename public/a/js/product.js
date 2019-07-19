$(function() {

    //获取商品管理页面数据
    $.ajax({
        type: "get",
        url: "/product/queryProductDetailList",
        data: {
            page: 1,
            pageSize: 10
        },
        success: function(response) {
            // console.log(response)

            var html = template("tel", response)
                // console.log(html);

            $("#box").html(html)

        }
    });



    //商品管理页面  添加商品  


    // 获取添加商品选择品牌那个下拉列表
    $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: {
            page: 1,
            pageSize: 1000
        },
        success: function(response) {
            // console.log(response);

            var html = template("del", response)
                // console.log(html);
            $("#boxs").html(html)

        }
    });

    // 这次上传的图片是多张,所以搞个数组存着
    var pic = [];

    //实现图片上传
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function(e, data) {
            // console.log(data);

            // 因为接口文档要求pic传过去是对象类型,就直接这样
            pic.push(data.result);
            // console.log(data._response.result);
        }
    });

    // 实现添加
    $("#addProduct").on("click", function() {

        // 获取下拉框中的品牌id
        var id = $("#boxs").val()
        console.log(id)

        //获取每个input框的值 
        var proName = $("[name=proName]").val()
        var oldPrice = $("[name=oldPrice]").val()
        var price = $("[name=price]").val()
        var size = $("[name=size]").val()
        var num = $("[name=num]").val()
        var proName = $("[name=proName]").val()
        var proDesc = $("[name=proDesc]").val()


        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: {
                proName: proName,
                oldPrice: oldPrice,
                price: price,
                size: size,
                num: num,
                proName: proName,
                brandId: id,
                pic: pic,
                proDesc: proDesc,
                statu: 0

            },
            success: function(response) {
                console.log(response);

                if (response.success) {
                    location.reload()
                }

            }
        });

    })
})