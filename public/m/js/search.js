$(function() {

    // 实现点击搜索按钮跳转到搜索结果页面
    $("#sousuo").on("click", function() {
        //获取input输入的内容
        var neirong = $("#neirong").val()
            //判断input框里面有没有输入内容 清除两端空格
        if (neirong.trim().length) {
            //将输入的关键字存在数组中
            keyArr.push(neirong)
                //因为点击后页面会刷新或者跳转 这里要将关键字数组存到本地储存里面
            localStorage.setItem("keyArr", JSON.stringify(keyArr))
                //如果输入了 跳转到搜索结果页面
            location.href = "search-result.html?key=" + neirong;

            // 跳转后清除input输入框
            $("#neirong").val("")
        } else {
            alert("请输入搜索内容")
        }
    })

    //搜索历史 这里要用到本地储存
    // 把它存在一个数组里面
    // 这个数组写在下面也没事 是因为有变量提升的原因
    var keyArr = [];
    //存储什么的在点击事件里面进行  在外面获取渲染
    if (localStorage.getItem("keyArr")) {
        // 判断本地储存里面有没有存的值 有的话存到数组当中
        keyArr = JSON.parse(localStorage.getItem("keyArr"))
        console.log(keyArr);
        // 返回的是一个数组 那么这里就得用到模板引擎 模板拼接
        var html = template("tel", { doc: keyArr })
        $("#box").html(html)
    }

    //清空历史功能 
    $("#clearbtn").on('click', function() {
        if (confirm("确认清空吗")) {
            //1清除页面数据
            $("#box").html("");
            // 2清除本地储存里面的数据
            localStorage.removeItem("keyArr");
        }


    })




})