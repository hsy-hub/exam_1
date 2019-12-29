package controller;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import pojo.Exam;
import pojo.ExamUser;


import pojo.Paper;
import service.ExamDao;
import tool.JsonDateValueProcessor;
import tool.Tool;
import tool.ToolUtil;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.*;

@Controller
public class ExamController {
    @Autowired
    ExamDao examDao;
    @Autowired
    HttpServletRequest request;

    //考试记录列表
    @RequestMapping("/examRecode.action")
    @ResponseBody       //加上 @ResponseBody 后，会直接返回 json 数据
    public Map<String, Object> examRecode(ExamUser examRecode, @RequestParam("id") Integer id, String classid, int page, int limit) {
        HashMap<String, Object> map = new HashMap<>();
        int pagestart = (page - 1) * limit;
        map.put("pagestart", pagestart);
        map.put("size", limit);
        map.put("userid", id);
        map.put("classid", classid);
        map.put("examName", examRecode.getExamName());//查询条件
        List<ExamUser> examList = examDao.getExamRecodeList(map);
        map.put("code", 0);    //自己设定的code值一定要写0，其他的值都是错误的
        map.put("msg", "");    //msg的值一定要写"",不然会一直报错
        map.put("count", examDao.examListCount());
//        Map<String, Object> returnTable = Tool.testLayui(examList, page, limit);
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor());
        JSONArray userMap = JSONArray.fromObject(examList, jsonConfig);
        map.put("data", userMap);
        return map;

    }


    //试题管理列表
    @RequestMapping("/examList.action")
    @ResponseBody       //加上 @ResponseBody 后，会直接返回 json 数据
    public Map<String, Object> examList(ExamUser exam, int page, int limit) {
        HashMap<String, Object> map = new HashMap<>();
        int pagestart = (page - 1) * limit;
        map.put("pagestart", pagestart);
        map.put("size", limit);
        map.put("examName", exam.getExamName());//查询条件
        List<ExamUser> examList = examDao.getexamList(map);
        Integer pagecount = examDao.examListCount();
        Map<String, Object> returnTable = Tool.testLayui(examList, page, limit);
        returnTable.put("count", pagecount);
        return returnTable;
    }

    @RequestMapping("/deleteit.action")
    public @ResponseBody
    int deleteit(String ids) {
        boolean d = ids.endsWith(",");
        if (d) {
            ids = ids.substring(0, ids.length() - 1);
        }
        String[] all = ids.split(",");

        int result = 0;
        for (String id : all) {
            result = examDao.deleteit(Integer.parseInt(id));
        }
        return result;
    }

    @RequestMapping("/addExam.action")
    @ResponseBody
    public int addExam(@RequestBody ExamUser exam) throws IOException {
        int add = examDao.add(exam);
        return add;
    }

    @RequestMapping("/insertPaper.action")
    @ResponseBody
    public int insertPaper(String path, int examid) {
        try {
            List<Paper> list = ToolUtil.readExcel(path, examid);
            int result = examDao.insertPaper(list);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    @RequestMapping("/updatePaperFile.action")
    @ResponseBody
    public Map<String, Object> updatePaperFile(MultipartFile file, int id) throws IOException {
        String filename = UUID.randomUUID().toString().replaceAll("-", "");
        String extention = FilenameUtils.getExtension(file.getOriginalFilename());
        filename = filename + "." + extention;
        String path = "D:\\upload\\";
        Map<String, Object> map = new HashMap<>();
        Exam exam = new Exam();
        exam.setId(id);
        exam.setPaperFile(filename);
        file.transferTo(new File(path + filename));
        int update = examDao.updatePaperFile(exam);
        if (update > 0) {
            map.put("path", path + filename);
            map.put("examid", id);
            map.put("code", 0);
            System.out.println(map);
        }
        return map;
    }


}
