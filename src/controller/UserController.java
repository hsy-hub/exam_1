package controller;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import pojo.ClassList;
import pojo.LoginUser;
import service.UserDao;
import tool.JsonDateValueProcessor;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserController {
    @Autowired
    UserDao userDao;
    @Autowired
    HttpServletRequest request;

    @RequestMapping("/login.action")
    @ResponseBody
    public LoginUser login(@RequestBody LoginUser user) {
        //@RequestBody是作用在形参列表上，用于将前台发送过来固定格式的数据【xml 格式或者 json等】封装为对应的 JavaBean 对象
        HttpSession session = request.getSession();
        LoginUser loginUser = userDao.login(user);
        if (loginUser != null){
            HashMap<String,Object> map = new HashMap<>();
            session.setAttribute("user",loginUser);
            map.put("id",loginUser.getId());
            map.put("endLoginTime",new Date());
            userDao.endLoginTime(map);
        }
        return loginUser;
    }

    @RequestMapping("/userList.action")
    @ResponseBody       //加上 @ResponseBody 后，会直接返回 json 数据
    public Map<String, Object> userList(LoginUser user,int page,int limit) {
        HashMap<String, Object> map = new HashMap<>();
        int pagestart = (page - 1) * limit;
        map.put("pagestart", pagestart);
        map.put("size", limit);
        map.put("loginName", user.getLoginName());//查询条件
        List<LoginUser> userList = userDao.getUserList(map);
//        Integer pagecount = userDao.userCount();
        map.put("code",0);    //自己设定的code值一定要写0，其他的值都是错误的
        map.put("msg","");    //msg的值一定要写"",不然会一直报错
        map.put("count",userDao.userCount());
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor());
        JSONArray userMap = JSONArray.fromObject(userList, jsonConfig);
//        Map<String, Object> returnTable = Tool.testLayui(userList, page, limit);
        map.put("data", userMap);
        return map;
    }

    @RequestMapping("/delete.action")
    public @ResponseBody int delete(String ids) {
        boolean d = ids.endsWith(",");
        if (d) {
            ids = ids.substring(0, ids.length() - 1);
        }
        String[] all = ids.split(",");

        int result = 0;
        for (String id : all) {
            result = userDao.delete(Integer.parseInt(id));
        }
        return result;
    }


    @RequestMapping("/addUser.action")
    @ResponseBody
    public int addUser(@RequestBody LoginUser user) throws IOException {
        int add = userDao.add(user);
        return add;

    }


    @RequestMapping("/updateUserList.action")
    @ResponseBody
    public int updateUserList(@RequestBody LoginUser user) {
        return userDao.updateUserList(user);
    }

    @RequestMapping("/userCount.action")
    @ResponseBody
    public int userCount() {
        return userDao.userCount();
    }

    @RequestMapping("/ClassList.action")
    @ResponseBody
    public List<ClassList> ClassList() {
        return userDao.getClassList();
    }

}
