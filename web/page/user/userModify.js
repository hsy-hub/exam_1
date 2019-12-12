var reid;
layui.use(['form','layer','jquery','table'],function(){
    var form = layui.form,
        table = layui.table,
    // layer = parent.layer === undefined ? layui.layer : top.layer,
    $ = layui.$,
    layer = layui.layer;

        form.on("submit(userModify)",function(data){
            $.ajax(
                {
                    data: JSON.stringify(data.field),
                    url: "/ssm/updateUserList.action",
                    type: "post",
                    contentType: "application/json",
                    // success: function (d) {
                    //     console.log(d);
                    //     if (d > 0) {
                    //         reid = d;
                    //         // layer.closeAll();
                    //         layer.close(layer.index);
                    //         parent.location.reload();//刷新父页面
                    //     } else {
                    //         layer.msg("修改失败！")
                    //     }
                    // }
                })
            //return false;//阻止表单跳转。如果需要表单跳转，去掉这段即可。
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

})