//在mui框架中 a链接跳转被禁用了
//所以手动改回来 又因为多个页面用来 所以创在公共样式里面



//因为数据a链接都是动态渲染出来的 所以得用到事件委托
//要用到a链接跳转的页面引入就行了

$(function() {



    $("body").on("tap", "a", function() {

        //用于来跳转页面
        mui.openWindow({
            url: $(this).attr("href")
        })


    })










})