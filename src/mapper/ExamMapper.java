package mapper;

import pojo.Exam;
import pojo.ExamUser;
import pojo.Paper;


import java.util.HashMap;
import java.util.List;

public interface ExamMapper {
    List<ExamUser> getExamRecodeList(HashMap map);
    Integer examrecodeCount();

    List<ExamUser> getexamList(HashMap map);
    Integer examListCount();
    int deleteit(Integer id);
    int add(ExamUser exam);
    int insertPaper(List<Paper> list);
    int updatePaperFile(Exam exam);
}
