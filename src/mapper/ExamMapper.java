package mapper;

import pojo.ExamUser;
import pojo.ExamRecode;
import pojo.LoginUser;

import java.util.HashMap;
import java.util.List;

public interface ExamMapper {
    List<ExamRecode> getExamRecodeList(HashMap map);
    Integer examrecodeCount();

    List<ExamUser> getexamList(HashMap map);
    Integer examListCount();
    int deleteit(Integer id);
    int add(ExamUser exam);
}
