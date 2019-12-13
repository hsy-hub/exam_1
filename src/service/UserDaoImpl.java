package service;

import mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pojo.ClassList;
import pojo.LoginUser;

import java.util.HashMap;
import java.util.List;

@Service
public class UserDaoImpl implements UserDao {
    @Autowired
    UserMapper userMapper;
    @Override
    public LoginUser login(LoginUser user) {
        return userMapper.login(user);
    }

    @Override
    public List<LoginUser> getUserList(HashMap map) {
        return userMapper.getUserList(map);
    }


    @Override
    public Integer userCount() {
        return userMapper.userCount();
    }

    @Override
    public int delete(Integer id) {
        return userMapper.delete(id);
    }

    @Override
    public int add(LoginUser user) {
        return userMapper.add(user);
    }

    @Override
    public int updateUserList(LoginUser user) {
        return userMapper.updateUserList(user);
    }

    @Override
    public int endLoginTime(HashMap map) {
        return userMapper.endLoginTime(map);
    }

    @Override
    public List<ClassList> getClassList() {
        return userMapper.getClassList();
    }
}
