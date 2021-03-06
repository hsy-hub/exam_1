package service;

import mapper.ExamMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pojo.Exam;
import pojo.ExamUser;
import pojo.Grade;
import pojo.Paper;

import java.util.HashMap;
import java.util.List;
@Service
public class ExamDaoImpl implements ExamDao {
    @Autowired
    ExamMapper examMapper;
    @Override
    public List<ExamUser> getExamRecodeList(HashMap map) {
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
        examMapper.add(exam);
        return exam.getId();
    }

    @Override
    public int insertPaper(List<Paper> list) {
        return examMapper.insertPaper(list);
    }

    @Override
    public int updatePaperFile(Exam exam) {
        return examMapper.updatePaperFile(exam);
    }

    @Override
    public List<Paper> makePaper(int examid) {
        return examMapper.makePaper(examid);
    }

    @Override
    public List<String> getAnswer(int examid) {
        return examMapper.getAnswer(examid);
    }

    @Override
    public int insertGrade(Grade grade) {
        return examMapper.insertGrade(grade);
    }


}
