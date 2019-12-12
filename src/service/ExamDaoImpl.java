package service;

import mapper.ExamMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pojo.ExamUser;
import pojo.ExamRecode;

import java.util.HashMap;
import java.util.List;
@Service
public class ExamDaoImpl implements ExamDao {
    @Autowired
    ExamMapper examMapper;
    @Override
    public List<ExamRecode> getExamRecodeList(HashMap map) {
        return examMapper.getExamRecodeList(map);
    }

    @Override
    public Integer examrecodeCount() {
        return examMapper.examrecodeCount();
    }

    @Override
    public List<ExamUser> getexamList(HashMap map) {
        return examMapper.getexamList(map);
    }

    @Override
    public Integer examListCount() {
        return examMapper.examListCount();
    }


    @Override
    public int deleteit(Integer id) {
        return examMapper.deleteit(id);
    }

    @Override
    public int add(ExamUser exam) {
        return examMapper.add(exam);
    }
}
