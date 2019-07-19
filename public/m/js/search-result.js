 //获取到地址栏中key的值
 var proName = getUrlParams("key");

 //下拉加载显示page 不能一直是1
 //  所以搞个变量接收
 var page = 1;

 //页面每次下拉跟新 都直接覆盖了之前上一页面 我们也要保留
 var html = "";

 //设置点击价格升序降序的默认变量  1升序2降序
 var price = 1;

 // 函数在每个地方this指向不一样
 var This = null;



 $(function() {
     mui.init({
         pullRefresh: {
             container: "#content", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
             up: {
                 height: 50, //可选.默认50.触发上拉加载拖动距离
                 auto: true, //可选,默认false.自动上拉加载一次
                 contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                 contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                 callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
             }
         }
     });


     //  点击事件click在移动端有延迟 并且这里mui框架用不了
     //  这里使用的事件是移动端轻敲事件
     $("#jiage").on("tap", function() {
         // 对页面进行初始化了
         // 这里的意思就是 当它默认等于1的时候再次点击就成了2再点又变成1
         price = price == 1 ? 2 : 1;
         // 1清空页面内容
         //  $("#box").html("");
         html = '';
         //  2恢复当前页为1
         page = 1;
         //  3重新开启上拉加载
         mui('#content').pullRefresh().refresh(true);
         // 4调用getData函数
         getData()
     })



 })





 function getData() {
     //  下面那个this的指向有问题 所以这样转换一下
     //  var This = this

     if (This == null) {
         This = this
     }

     $.ajax({
         type: "get",
         url: "/product/queryProduct",
         data: {
             page: page++,
             pageSize: 3,
             proName: proName,
             //排序参数
             price: price
         },
         success: function(response) {

             //这里翻到最后一页没数据了它还会继续请求 
             //我们要判断一下 当数组为空时 给出提示
             if (response.data.length > 0) {
                 console.log(response)
                     //不能让上一次页面的数据被覆盖
                 html += template("tel", response)
                 $("#box").html(html)
                     //页面处理完后 告诉mui
                 This.endPullupToRefresh(false);
             } else {
                 //当页面数据加载完后 需要再次下拉时 就要提示
                 This.endPullupToRefresh(true);
             }

         }
     });


 }






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