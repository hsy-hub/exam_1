package mapper;

import pojo.LoginUser;

import java.util.HashMap;
import java.util.List;

public interface UserMapper {
    LoginUser login(LoginUser user);
    List<LoginUser> getUserList(HashMap map);
    Integer userCount();
    int delete(Integer id);
    int add(LoginUser user);
    int updateUserList(LoginUser user);
    int endLoginTime(HashMap map);
}
