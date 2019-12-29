package pojo;

import java.util.Date;

public class Exam {
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
    private String testAllTime;
    private String totalpoints;

    public String getTestAllTime() {
        return testAllTime;
    }

    public void setTestAllTime(String testAllTime) {
        this.testAllTime = testAllTime;
    }

    public String getTotalpoints() {
        return totalpoints;
    }

    public void setTotalpoints(String totalpoints) {
        this.totalpoints = totalpoints;
    }

    public String getPaperFile() {
        return paperFile;
    }

    public void setPaperFile(String paperFile) {
        this.paperFile = paperFile;
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

    public String getPubstauts() {
        return pubstauts;
    }

    public void setPubstauts(String pubstauts) {
        this.pubstauts = pubstauts;
    }

    public String getBrowsetype() {
        return browsetype;
    }

    public void setBrowsetype(String browsetype) {
        this.browsetype = browsetype;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Date getPublicTime() {
        return publicTime;
    }

    public void setPublicTime(Date publicTime) {
        this.publicTime = publicTime;
    }
}
