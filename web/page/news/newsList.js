layui.use(['form','layer','laydate','table','laytpl','jquery'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //试题管理列表
    var tableIns = table.render({
        elem: '#newsList',
        url : '/ssm/examList.action',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limit : 10,
        limits : [10,15,20,25],
        id : "newsListTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: 'id', title: 'ID', width:60, align:"center"},
            {field: 'examName', title: '试题名称', width:350},
            {field: 'publisher', title: '发布者', align:'center'},
            {field: 'pubstauts', title: '发布状态',  align:'center',templet:function (d) {
                    if(d.pubstauts == "0"){
                        return "草稿箱";
                    }else if(d.pubstauts == "1"){
                        return "已发布";
                    }
            }},
            {field: 'browsetype', title: '浏览权限', align:'center',templet:function (d) {
                    if(d.browsetype == "1"){
                        return "开放浏览";
                    }else if(d.browsetype == "2"){
                        return "私密浏览";
                    }
                }},
            {field: 'publicTime', title: '发布时间', align:'center', minWidth:110
            //     , templet:function(d){
            //     return d.publicTime.substring(0,10);
            // }
            },
            {title: '操作', width:170, templet:'#newsListBar',fixed:"right",align:"center"}
        ]]
    });


    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $("#search_btn").on("click",function(){
        var searchVal = $("#searchVal");
            table.reload("newsListTable",{
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                ,url: "/ssm/examList.action"
                ,where: {
                    'examName': searchVal.val()  //搜索的关键字
                }
            })
    });


    //添加试题
    function addNews(edit){
        var index = layui.layer.open({
            title : "添加试题",
            type : 2,
            content : "examAdd.html",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(edit){
                    body.find(".examName").val(edit.examName); //试题名称
                    body.find(".examDecript").val(edit.examDecript);  //试题描述
                    body.find(".pubstauts select").val(edit.pubstauts);  //发布状态
                    body.find(".testType input[title=" + edit.testType + "]").prop("checked", "checked");
                    body.find(".browsetype input[name='browsetype'][title='"+edit.browsetype+"']").prop("checked","checked"); //浏览权限
                    body.find(".release input[name='release'][title='"+edit.release+"']").prop("checked","checked"); //发布
                    body.find(".publicTime").val(edit.publicTime);  //发布状态
                    form.render();
                }
                setTimeout(function(){
                    layui.layer.tips('点击此处返回试题列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(index);
        })
    }
    $(".addNews_btn").click(function(){
        addNews();
    })

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('newsListTable'),
            data = checkStatus.data,
            // newsId = [];
            id = "";
        if(data.length > 0) {
            for (var i in data) {
                // newsId.push(data[i].newsId);
                id += data[i].id + ",";
                layer.msg(id);
            }
            layer.confirm('确定删除选中的文章？', {icon: 3, title: '提示信息'}, function (index) {
                // $.get("删除文章接口",{
                //     newsId : newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                // tableIns.reload();
                // layer.close(index);
                // })
                $.ajax({
                    url: "/ssm/deleteit.action",
                    data: {"ids": id},
                    success: function (flag) {
                        if (flag > 0) {
                            layer.msg("删除成功");
                            layer.closeAll();
                            table.reload('newsListTable', {});
                        } else {
                            layer.msg("删除失败");
                        }

                    }
                })
            })
        }else{
            layer.msg("请选择需要删除的文章");
        }
    });

    //列表操作
    table.on('tool(newsList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
            addNews(data);
        } else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此文章？',{icon:3, title:'提示信息'},function(index){
                $.ajax({
                    url: "/ssm/deleteit.action",
                    data: {"ids": data.id},
                    success: function (flag) {
                        if (flag == 1) {
                            layer.msg("删除成功");
                            layer.closeAll();
                            table.reload('newsListTable', {});
                        } else {
                            layer.msg("删除失败");
                        }
                    }
                })
                // $.get("删除文章接口",{
                //     newsId : data.newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                //     tableIns.reload();
                //     layer.close(index);
                // })
            });
        } else if(layEvent === 'look'){ //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问")
        }
    });

});