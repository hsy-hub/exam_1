var reid;
layui.use(['form','layer'],function(){
    var form = layui.form,
        // layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        layer = layui.layer;

    form.on("submit(addUser)",function(data){
        //弹出loading
        // var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        // 实际使用时的提交信息
        // $.post("上传路径",{
        //     userName : $(".userName").val(),  //登录名
        //     userEmail : $(".userEmail").val(),  //邮箱
        //     userSex : data.field.sex,  //性别
        //     userGrade : data.field.userGrade,  //会员等级
        //     userStatus : data.field.userStatus,    //用户状态
        //     newsTime : submitTime,    //添加时间
        //     userDesc : $(".userDesc").text(),    //用户简介
        // },function(res){
        //
        // })
        // setTimeout(function(){
            $.ajax(
                {
                    url: "/ssm/addUser.action",
                    data: JSON.stringify(data.field),
                    type: "post",
                    contentType: "application/json",
                    success: function (d) {
                        console.log(d);
                        if (d > 0) {
                            reid = d;
                            parent.location.reload();    //修改后返回列表页面进行刷新
                            var index = parent.layer.getFrameIndex(window.name);    //获得frame索引
                            parent.layer.close(index);     //关闭当前frame/刷新父页面
                        } else {
                            layer.msg("添加失败！")
                        }
                    }
                })
        //     top.layer.close(index);
        //     top.layer.msg("用户添加成功！");
        //     layer.closeAll("iframe");
        //     //刷新父页面
        //     parent.location.reload();
        // },2000);

        return false;//阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //格式化时间
    function filterTime(val){
        if(val < 10){
            return "0" + val;
        }else{
            return val;
        }
    }
    //定时发布
    var time = new Date();
    var submitTime = time.getFullYear()+'-'+filterTime(time.getMonth()+1)+'-'+filterTime(time.getDate())+' '+filterTime(time.getHours())+':'+filterTime(time.getMinutes())+':'+filterTime(time.getSeconds());

});