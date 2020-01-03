layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    var id = JSON.parse(window.sessionStorage.getItem("user")).id; //取到登录者的id
    var classid = JSON.parse(window.sessionStorage.getItem("user")).classid;
    console.log(classid);
    //考试记录列表
    var tableIns = table.render({
        elem: '#newsList',
        url: '/ssm/examRecode.action?id=' + id + '&classid=' + classid,
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "newsListTable",
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
            {field: 'id', title: 'ID', width: 60, align: "center"},
            // {templet: '<div>{{(d.user.id)}}</div>', title: '用户ID', align: 'center'},
            // {templet: '<div>{{(d.exam1.examName)}}</div>', title: '试卷名称', align: 'center'},
            {field: 'examName', title: '试卷名称', align: "center"},
            // {templet: '<div>{{(d.exam1.examDecript)}}</div>', title: '试题描述', align: 'center'},
            {field: 'testAllTime', title: '总时间', align: "center"},
            {field: 'totalpoints', title: '总分', align: "center"},
            {field: 'examDecript', title: '试题描述', align: "center"},
            {templet: '<div>{{(d.grade.score)}}</div>', title: '分数', align: 'center'},
            // {field: 'examTime', title: '考试时间', align: 'center', minWidth: 110
            // , templet: function (d) {
            //     return d.examTime.substring(0, 10);
            // }
            // },
            {title: '操作', width: 170, templet: '#newsListBar', fixed: "right", align: "center"}
        ]]
    });


//搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function () {
        if ($(".searchVal").val() != '') {
            table.reload("newsListTable", {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: $(".searchVal").val()  //搜索的关键字
                }
            })
        } else {
            layer.msg("请输入搜索的内容");
        }
    });


    //列表操作
    // table.on('tool(historyList)', function (obj) {
    //     var layEvent = obj.event,
    //         data = obj.data;
    //
    //     if (layEvent === 'edit') { //编辑
    //         addNews(data);
    //     } else if (layEvent === 'exam') { //考试
    //         var index = layui.layer.open({
    //             title: "开始考试",
    //             type: 2,
    //             content: "examInit.html"
    //         });
    //     }
    // });

    //列表操作
    table.on('tool(newsList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') {//编辑
            addNews(data);
        } else if (layEvent === 'exam') { //考试
            var index = layui.layer.open({
                title: "开始考试",
                type: 2,
                content: "examInit.html",
                success: function (layero, index) {
                    var body = layui.layer.getChildFrame('body', index);
                    if (data) {
                        console.log(data);
                        body.find(".examName").html(data.examName);
                        body.find(".testAllTime").html(data.testAllTime);
                        body.find(".totalpoints").html(data.totalpoints);
                        body.find(".loginName").html(JSON.parse(window.sessionStorage.getItem("user")).loginName);
                        window.sessionStorage.setItem("examid", data.id);
                        window.sessionStorage.setItem("testAllTime", data.testAllTime);
                        window.sessionStorage.setItem("totalpoints", data.totalpoints);
                        form.render();
                    }
                }
            });
            layui.layer.full(index);
            // layer.confirm('确定删除此文章？',{icon:3, title:'提示信息'},function(index){
            // $.get("删除文章接口",{
            //     newsId : data.newsId  //将需要删除的newsId作为参数传入
            // },function(data){
            //     tableIns.reload();
            //     layer.close(index);
            // })
            // });
            $(window).on("resize", function () {
                layui.layer.full(index);
            })

        } else if (layEvent === 'look') { //预览
            layer.open({
                area: ['60%', '40%'],
                title: "考试结果",
                content:
                    '<div class="layui-btn-container">' +
                    '<button type="button" class="layui-btn">A</button> ' +
                    '<button type="button" class="layui-btn layui-btn-danger">D</button> ' +
                    '<button type="button" class="layui-btn">C</button> ' +
                    '<button type="button" class="layui-btn layui-btn-danger">B</button> ' +
                    '</div>'
            })
        }
    });

});