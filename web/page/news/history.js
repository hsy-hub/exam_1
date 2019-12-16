layui.use(['form', 'layer', 'laydate', 'table', 'laytpl','jquery'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //考试记录列表
    var tableIns = table.render({
        elem: '#newsList',
        url: '/ssm/examRecode.action',
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
            {templet: '<div>{{(d.exam.examName)}}</div>', title: '试卷名称', align: 'center'},
            {templet: '<div>{{(d.exam.examDecript)}}</div>', title: '试题描述', align: 'center'},
            {templet: '<div>{{(d.grade.score)}}</div>', title: '分数', align: 'center'},
            {field: 'examTime', title: '考试时间', align: 'center', minWidth: 110, templet: function (d) {
                    return d.examTime.substring(0, 10);
                }
            }
            /*{title: '操作', width:170, templet:'#newsListBar',fixed:"right",align:"center"}*/
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