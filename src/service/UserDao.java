package service;

import pojo.ClassList;
import pojo.LoginUser;

import java.util.HashMap;
import java.util.List;

public interface UserDao {
    public LoginUser login(LoginUser user);
    public  List<LoginUser> getUserList(HashMap map);
    public Integer userCount();
    public  int delete(Integer id);
    public int add(LoginUser user);
    public int updateUserList(LoginUser user);
    public int endLoginTime(HashMap map);
    public List<ClassList> getClassList();
}
