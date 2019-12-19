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
        url: '/ssm/examRecode.action?id='+id+'&classid='+classid,
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
            {field: 'examDecript', title: '试题描述', align: "center"},
            {templet: '<div>{{(d.grade.score)}}</div>', title: '分数', align: 'center'},
            // {field: 'examTime', title: '考试时间', align: 'center', minWidth: 110
                // , templet: function (d) {
                //     return d.examTime.substring(0, 10);
                // }
            // },
            {title: '操作', width:170, templet:'#newsListBar',fixed:"right",align:"center"}
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

});