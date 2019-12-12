package service;

import pojo.ExamUser;
import pojo.ExamRecode;

import java.util.HashMap;
import java.util.List;

public interface ExamDao {
    List<ExamRecode> getExamRecodeList(HashMap map);
    Integer examrecodeCount();

    List<ExamUser> getexamList(HashMap map);
    Integer examListCount();
    int deleteit(Integer id);
}
