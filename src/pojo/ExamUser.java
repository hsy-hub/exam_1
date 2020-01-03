package pojo;

import java.util.Date;

public class ExamUser {
    private Integer id;
    private String examName;
    private String examDecript;
    private String classid;
    private String pubstauts;
    private String browsetype;
    private String publisher;
    private Date publicTime;
    private String release;
    private String testType;
    private String paperFile;
    private Integer testAllTime;
    private Integer totalpoints;
    private User user;
    private Grade grade;

    public Integer getTestAllTime() {
        return testAllTime;
    }

    public void setTestAllTime(Integer testAllTime) {
        this.testAllTime = testAllTime;
    }

    public Integer getTotalpoints() {
        return totalpoints;
    }

    public void setTotalpoints(Integer totalpoints) {
        this.totalpoints = totalpoints;
    }

    public String getPaperFile() {
        return paperFile;
    }

    public void setPaperFile(String paperFile) {
        this.paperFile = paperFile;
    }

    public Grade getGrade() {
        return grade;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }

    public String getRelease() {
        return release;
    }

    public void setRelease(String release) {
        this.release = release;
    }

    public String getTestType() {
        return testType;
    }

    public void setTestType(String testType) {
        this.testType = testType;
    }

    public String getPubstauts() {
        return pubstauts;
    }

    public void setPubstauts(String pubstauts) {
        this.pubstauts = pubstauts;
    }

    public Date getPublicTime() {
        return publicTime;
    }

    public void setPublicTime(Date publicTime) {
        this.publicTime = publicTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
    }

    public String getExamDecript() {
        return examDecript;
    }

    public void setExamDecript(String examDecript) {
        this.examDecript = examDecript;
    }

    public String getClassid() {
        return classid;
    }

    public void setClassid(String classid) {
        this.classid = classid;
    }


    public String getBrowsetype() {
        return browsetype;
    }

    public void setBrowsetype(String browsetype) {
        this.browsetype = browsetype;
    }
}
