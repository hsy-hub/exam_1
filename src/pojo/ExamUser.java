package pojo;

import java.util.Date;

public class ExamUser {
    Integer id;
    String examName;
    String examDecript;
    String classid;
    String pubstauts;
    String browsetype;
    String publisher;
    Date publicTime;
    String release;
    String testType;
    User user;
    Grade grade;

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
