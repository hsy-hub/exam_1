var reid;
layui.use(['form','layer','layedit','laydate','upload','jquery','laypage'],function(){
    var form = layui.form
        // layer = parent.layer === undefined ? layui.layer : top.layer,
        layer=layui.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;

    //用于同步编辑器内容到textarea
    layedit.sync(editIndex);

    console.log(window.sessionStorage.getItem("user")); //这里的user为页面缓存的user
    $("#publisher").val(JSON.parse(window.sessionStorage.getItem("user")).id); //取到登录者的id


	 //拖拽上传
	 //  upload.render({
	 //    elem: '#test10'
	 //    ,url: '/ssm/updatePaperFile.action'
	 //    ,exts: 'xls|xlsx' //只允许上传Excel文件
     //      ,auto:false
     //      , bindAction: '#uploadfile'
     //      ,done: function(res){
	 //      console.log(res)
	 //    }
	 //  });

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
    laydate.render({
        elem: '#release',
        type: 'datetime',
        trigger : "click",
        done : function(value, date, endDate){
            submitTime = value;
        }
    });
    form.on("radio(release)",function(data){
        if(data.elem.title == "定时发布"){
            $(".releaseDate").removeClass("layui-hide");
            $(".releaseDate #release").attr("lay-verify","required");
        }else{
            $(".releaseDate").addClass("layui-hide");
            $(".releaseDate #release").removeAttr("lay-verify");
            submitTime = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
        }
    });

    form.verify({
        newsName : function(val){
            if(val == ''){
                return "文章标题不能为空";
            }
        },
        content : function(val){
            if(val == ''){
                return "文章内容不能为空";
            }
        }
    });


    form.on("submit(addNews)",function(data){
        //截取文章内容中的一部分文字放入文章摘要
        // var abstract = layedit.getText(editIndex).substring(0,50);
        //弹出loading
        // var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        $.ajax({
                url: "/ssm/addExam.action",
                data: JSON.stringify(data.field),
                type: "post",
                contentType: "application/json",
                success: function (d) {
                    console.log(d);
                    if (d > 0) {
                        reid = d;
                        $("#uploadfile").trigger("click");
                    } else {
                        layer.msg("添加失败！")
                    }
                }
            });
        return false;//阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //普通文件上传
    upload.render({
        elem: '#test10'
        , url: '/ssm/updatePaperFile.action'
        ,exts: 'xls|xlsx' //只允许上传Excel文件
        , auto: false//选择文件后不自动上传
        , bindAction: '#uploadfile' //指向一个按钮触发上传
        , before: function (obj) {
            layer.load(); //上传loading
            this.data = {'id':reid};//整合上传的参数
            //预读本地文件示例，不支持ie8
            //选择文件后的回调
        },
        choose: function (obj) {
            obj.preview(function (index, file, result) {
                $('#preview').attr('src', "timg.png"); //文件链接
            });
        }
        , done: function (msg) {

            //如果上传失败
            if (msg.code > 0) {
                return layer.msg('上传失败');
            }else{
                console.log(msg);
                //上传成功
                $.ajax({
                     url: "/ssm/insertPaper.action",
                    data:{"path":msg.path,"examid":msg.examid},
                    type:"post",
                    success: function(res){
                        console.log(res)
                        parent.location.reload();    //添加后返回列表页面进行刷新
                        var index = parent.layer.getFrameIndex(window.name);    //获得frame索引
                        parent.layer.close(index);     //关闭当前frame/刷新父页面
                    }

                });
            }

        }
        , error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                uploadInst.upload();
            });
        }
    });


    //预览
    form.on("submit(look)",function(){
        layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问");
        return false;
    });

    //创建一个编辑器
    var editIndex = layedit.build('news_content',{
        height : 535,
        uploadImage : {
            url : "../../json/newsImg.json"
        }
    });

    $.ajax({
        url: '/ssm/ClassList.action',
        type: "post",
        success: function (d) {
            var c = $("#classid");
            var op="";
            for (var i = 0; i < d.length; i++) {
                console.log(d[i].id);
                console.log(d[i].className);
                op += "<option value='" + d[i].id + "'>" + d[i].className + "</option>"
            }
            c.append(op);
                form.render();
            }
    })

            });