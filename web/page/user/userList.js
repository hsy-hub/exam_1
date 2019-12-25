layui.use(['form', 'layer', 'table', 'laytpl', 'jquery','util'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        laytpl = layui.laytpl,
        table = layui.table,
        util=layui.util,
        $ = layui.jquery;

    //用户列表
    var tableIns = table.render({
        elem: '#userList',
        url: '/ssm/userList.action',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limits: [10, 15, 20, 25],
        limit: 10,
        id: "userListTable",
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
            {field: 'id', title: 'ID', minWidth: 100, align: "center"},
            {field: 'loginName', title: '用户名', minWidth: 100, align: "center"},
            {
                field: 'email', title: '用户邮箱', minWidth: 200, align: 'center', templet: function (d) {
                    return '<a class="layui-blue" href="mailto:' + d.email + '">' + d.email + '</a>';
                }
            },
            {templet: '<div>{{(d.gender1.genderName)}}</div>', title: '用户性别', align: 'center'},
            // {field: 'gender', title: '用户性别', align:'center'
            // ,templet:function (d) {
            // if(d.gender == "1"){
            //     return "男";
            // }else if(d.gender == "2"){
            //     return "女";
            // }else if(d.gender == "3"){
            //     return "保密";
            // }
            // }
            // },
            {templet: '<div>{{(d.stauts1.stautsName)}}</div>', title: '用户状态', align: 'center'},
            // {field: 'stauts', title: '用户状态',  align:'center'
            //     ,templet:function(d){
            //     return d.stauts == "1" ? "正常使用" : "限制使用";
            // }
            // },
            {templet: '<div>{{(d.levels.levelName)}}</div>', title: '用户等级', align: 'center'},
            // {field: 'level', title: '用户等级', align:'center'
            //     ,templet:function(d){
            //     if(d.level == "1"){
            //         return "管理员";
            //     }else if(d.level == "2"){
            //         return "教师";
            //     }else if(d.level == "3"){
            //         return "学生";
            //     }
            // }
            // },
            {field:'endLoginTime',title:'最后登录时间',align: "center"},
            // {field:'endLoginTime',title:'最后登录时间',templet: '<div>{{layui.util.toDateString(d.endLoginTime*1000, "yyyy-MM-dd HH:mm:ss") }}</div>'},
            {title: '操作', minWidth: 175, templet: '#userListBar', fixed: "right", align: "center"}
        ]]
        , done: function (res, curr, count) {  //回调函数解决最后一页删除跳转到前一页
            if (res.data.length == 0 && count > 0) {
                table.reload('userListTable', {
                    page: {
                        curr: curr - 1
                    }
                });
            }
        }
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $("#search_btn").on("click", function () {
        var searchVal = $("#searchVal");
        // var searchVal = $("#searchVal").val();
        //执行重载
        table.reload("userListTable", {
            page: {
                curr: 1 //重新从第 1 页开始
            }
            , url: "/ssm/userList.action"
            , where: {
                'loginName': searchVal.val()
                // 'loginName': $.trim(searchVal)  //用trim 输入时前后可以有空格
            }
        })
    });


    //添加用户
    function addUser(edit) {
        var index = layui.layer.open({
            title: "添加用户",
            type: 2,
            content: "userAdd.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (edit) {
                    body.find(".loginName").val(edit.loginName);  //登录名
                    body.find(".password").val(edit.password);  //密码
                    body.find(".email").val(edit.email);  //邮箱
                    body.find(".gender input[value=" + edit.gender + "]").prop("checked", "checked");  //性别
                    body.find(".level").val(edit.level);  //会员等级
                    body.find(".status").val(edit.status);    //用户状态
                    body.find(".classid").val(data.classid);    //班级
                    body.find(".describe").text(edit.describe);    //用户简介
                    form.render();
                }
                setTimeout(function () {
                    layui.layer.tips('点击此处返回用户列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        });
        layui.layer.full(index);
        window.sessionStorage.setItem("index", index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }

    $(".addNews_btn").click(function () {
        addUser();
    });

    //编辑
    function userModify(data) {
        var index2 = layui.layer.open({
            title: "修改用户",
            type: 2,
            content: "userModify.html",
            success: function (layero, index2) {
                var body = layui.layer.getChildFrame('body', index2);
                if (data) {
                    console.log("userlist>>>>>" + JSON.stringify(data));
                    body.find(".id").val(data.id); //ID
                    body.find(".loginName").val(data.loginName);  //登录名
                    body.find(".email").val(data.email);  //邮箱
                    body.find(".gender input[value=" + data.gender + "]").prop("checked", "checked");  //性别
                    body.find(".level").val(data.level);  //会员等级
                    body.find(".status").val(data.stauts);    //用户状态
                    body.find(".classid").val(data.classid);    //班级
                    body.find(".describe").text(data.describe);    //用户简介
                    form.render();
                }
                setTimeout(function () {
                    layui.layer.tips('点击此处返回用户列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        });
        layui.layer.full(index2);
        window.sessionStorage.setItem("index2", index2);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(window.sessionStorage.getItem("index2"));
        })
    }

    // $(".modify-btn").click(function(){
    //     userModify();
    // });


    //批量删除
    $(".delAll_btn").click(function () {
        var checkStatus = table.checkStatus('userListTable'),
            data = checkStatus.data,
            id = "";
        // newsId = [];
        if (data.length > 0) {
            for (var i in data) {
                id += data[i].id + ",";
                layer.msg(id);
                // newsId.push(data[i].newsId);
            }
            layer.confirm('确定删除选中的用户？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    url: "/ssm/delete.action",
                    data: {"ids": id},
                    success: function (flag) {
                        if (flag > 0) {
                            layer.msg("删除成功");
                            layer.closeAll();
                            table.reload('userListTable', {});
                        } else {
                            layer.msg("删除失败");
                        }

                    }
                })
                // // $.get("删除文章接口",{
                // //     newsId : newsId  //将需要删除的newsId作为参数传入
                // // },function(data){
                // tableIns.reload();
                // layer.close(index);
                // // })
            })
        } else {
            layer.msg("请选择需要删除的用户");
        }
    });

    //列表操作
    table.on('tool(userList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        id = $("#id").val();
        if (layEvent === 'edit') { //编辑
            userModify(data);
            return id;
        } else if (layEvent === 'usable') { //启用禁用
            var _this = $(this),
                usableText = "是否确定禁用此用户？",
                btnText = "已禁用";
            if (_this.text() == "已禁用") {
                usableText = "是否确定启用此用户？",
                    btnText = "已启用";
            }
            layer.confirm(usableText, {
                icon: 3,
                title: '系统提示',
                cancel: function (index) {
                    layer.close(index);
                }
            }, function (index) {
                _this.text(btnText);
                layer.close(index);
            }, function (index) {
                layer.close(index);
            });
        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除此用户？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    url: "/ssm/delete.action",
                    data: {"ids": data.id},
                    success: function (flag) {
                        if (flag == 1) {
                            layer.msg("删除成功");
                            layer.closeAll();
                            table.reload('userListTable', {});
                        } else {
                            layer.msg("删除失败");
                        }
                    }
                })
                // // $.get("删除文章接口",{
                // //     newsId : data.newsId  //将需要删除的newsId作为参数传入
                // // },function(data){
                //     tableIns.reload();
                //     layer.close(index);
                // // })
            });
        }
    });


})
