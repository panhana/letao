$(function() {

    //调用那个函数 获取地址栏传过来的参数 添加0 编辑1
    // 因为传的是字符串0或1 不好判断转换为数字
    var key = Number(getUrlParams("key"))
        // console.log('key::', key);
    if (key) {
        //编辑
        // 给编辑按钮做事件
        // 先获取一波 页面传过来的参数  判断本地储存里面有没有这个 然后又转回对象
        if (localStorage.getItem("bianliang")) {
            var bianliang = JSON.parse(localStorage.getItem("bianliang"))
            console.log(bianliang)
                // 直接获取每个input框赋值
            $("[name=recipients]").val(bianliang.recipients);
            $("[name=postcode]").val(bianliang.postCode);
            $("[name=address]").val(bianliang.address);
            $("[name=addressDetail]").val(bianliang.addressDetail);
        }
    } else {
        //添加
        $("[name=recipients]").val();
        $("[name=postcode]").val();
        $("[name=address]").val();
        $("[name=addressDetail]").val();
    }






    //给省市区添加下拉效果  这里面填要显示几列
    var picker = new mui.PopPicker({ layer: 3 });
    //向里面添加数据
    picker.setData(cityData);

    $("#dianji").on("tap", function() {
        //页面显示
        picker.show(function(selectItems) {
            // console.log(selectItems)
            // selectItems[0].text;
            // selectItems[1].text;
            // selectItems[2].text;
            //获取到了省市区的值 下面开始相加
            $("#dianji").val(selectItems[0].text + selectItems[1].text + selectItems[2].text)
        })
    })


    // 给表单作添加
    $("#btn").on("tap", function() {
        var recipients = $.trim($("[name=recipients]").val())
        var postcode = $.trim($("[name=postcode]").val())
        var address = $.trim($("[name=address]").val())
        var addressDetail = $.trim($("[name=addressDetail]").val())

        if (!recipients) {
            mui.toast("请输入用户名")
            return
        }
        if (!postcode) {
            mui.toast("请输入邮政编号")
            return
        }
        if (!address) {
            mui.toast("请选择地区")
            return
        }

        if (!addressDetail) {
            mui.toast("请填写详细地址")
            return
        }

        var data = {
            address: address,
            addressDetail: addressDetail,
            recipients: recipients,
            postcode: postcode
        }


        // 同一个ajax请求这样判断一下 只是做编辑的时候需要多传一个id参数
        if (key) {
            var url = "/address/updateAddress"
            data.id = bianliang.id
            console.log(bianliang)
        } else {
            url = "/address/addAddress"
        }


        $.ajax({
            type: "post",
            url: url,
            data: data,
            success: function(response) {
                if (response.success) {
                    if (key) {
                        mui.toast("编辑成功")
                    } else {
                        mui.toast("添加成功")
                    }
                    setTimeout(function() {
                            location.href = "adress.html"
                        }, 2000)
                        // console.log(response);
                } else {
                    mui.toast("信息添加失败")
                }
            }
        });



    })







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