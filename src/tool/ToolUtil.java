package tool;


import java.io.*;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;

import org.apache.poi.ss.usermodel.Cell;

import org.apache.poi.ss.usermodel.CellType;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.Test;
import pojo.Paper;


/**
 * Excel操作工具类
 *
 * @author ChaiXY
 */
public class ToolUtil {

    // @Value("${file_base_path}")
    // private static String fileBasePath;//文件的基础路径
    // private static String fileBasePath = System.getProperty("user.dir") + File.separator + "excel" + File.separator;;//文件的基础路径

    public static final String OFFICE_EXCEL_XLS = "xls";
    public static final String OFFICE_EXCEL_XLSX = "xlsx";

    /**
     * 读取指定Sheet也的内容
     *
     * @param filepath filepath 文件全路径
     * @param sheetNo  sheet序号,从0开始,如果读取全文sheetNo设置null
     */
    public static String readExcel(String filepath, Integer sheetNo)
            throws EncryptedDocumentException, InvalidFormatException, IOException {
        StringBuilder sb = new StringBuilder();
        Workbook workbook = getWorkbook(filepath);
        if (workbook != null) {
            if (sheetNo == null) {
                int numberOfSheets = workbook.getNumberOfSheets();
                for (int i = 0; i < numberOfSheets; i++) {
                    Sheet sheet = workbook.getSheetAt(i);
                    if (sheet == null) {
                        continue;
                    }
                    sb.append(readExcelSheet(sheet));
                }
            } else {
                Sheet sheet = workbook.getSheetAt(sheetNo);
                if (sheet != null) {
                    sb.append(readExcelSheet(sheet));
                }
            }
        }
        return sb.toString();
    }

    /**
     * 根据文件路径获取Workbook对象
     *
     * @param filepath 文件全路径
     */
    public static Workbook getWorkbook(String filepath)
            throws EncryptedDocumentException, InvalidFormatException, IOException {
        InputStream is = null;
        Workbook wb = null;
        if (StringUtils.isBlank(filepath)) {
            throw new IllegalArgumentException("文件路径不能为空");
        } else {
            String suffiex = getSuffiex(filepath);
            if (StringUtils.isBlank(suffiex)) {
                throw new IllegalArgumentException("文件后缀不能为空");
            }
            if (OFFICE_EXCEL_XLS.equals(suffiex) || OFFICE_EXCEL_XLSX.equals(suffiex)) {
                try {
                    is = new FileInputStream(filepath);
                    wb = WorkbookFactory.create(is);
                } finally {
                    if (is != null) {
                        is.close();
                    }
                    if (wb != null) {
                        wb.close();
                    }
                }
            } else {
                throw new IllegalArgumentException("该文件非Excel文件");
            }
        }
        return wb;
    }

    /**
     * 获取后缀
     *
     * @param filepath filepath 文件全路径
     */
    private static String getSuffiex(String filepath) {
        if (StringUtils.isBlank(filepath)) {
            return "";
        }
        int index = filepath.lastIndexOf(".");
        if (index == -1) {
            return "";
        }
        return filepath.substring(index + 1, filepath.length());
    }

    private static String readExcelSheet(Sheet sheet) {
        StringBuilder sb = new StringBuilder();

        if (sheet != null) {
            int rowNos = sheet.getLastRowNum();// 得到excel的总记录条数
            for (int i = 0; i <= rowNos; i++) {// 遍历行
                Row row = sheet.getRow(i);
                if (row != null) {
                    int columNos = row.getLastCellNum();// 表头总共的列数
                    for (int j = 0; j < columNos; j++) {
                        Cell cell = row.getCell(j);
                        if (cell != null) {
                            cell.setCellType(CellType.STRING);
                            sb.append(cell.getStringCellValue() + " ");
                            // System.out.print(cell.getStringCellValue() + " ");
                        }
                    }
                    // System.out.println();
                }
            }
        }

        return sb.toString();
    }

    /**
     * 读取指定Sheet页的表头
     *
     * @param filepath filepath 文件全路径
     * @param sheetNo  sheet序号,从0开始,必填
     */
    public static Row readTitle(String filepath, int sheetNo)
            throws IOException, EncryptedDocumentException, InvalidFormatException {
        Row returnRow = null;
        Workbook workbook = getWorkbook(filepath);
        if (workbook != null) {
            Sheet sheet = workbook.getSheetAt(sheetNo);
            returnRow = readTitle(sheet);
        }
        return returnRow;
    }

    /**
     * 读取指定Sheet页的表头
     */
    public static Row readTitle(Sheet sheet) throws IOException {
        Row returnRow = null;
        int totalRow = sheet.getLastRowNum();// 得到excel的总记录条数
        for (int i = 0; i < totalRow; i++) {// 遍历行
            Row row = sheet.getRow(i);
            if (row == null) {
                continue;
            }
            returnRow = sheet.getRow(0);
            break;
        }
        return returnRow;
    }


    /**
     * 将源文件的内容复制到新Excel文件(可供理解Excel使用,使用价值不大)
     *
     * @param srcFilepath 源文件全路径
     * @param desFilepath 目标文件全路径
     */
    public static void writeExcel(String srcFilepath, String desFilepath)
            throws IOException, EncryptedDocumentException, InvalidFormatException {
        FileOutputStream outputStream = null;
        String suffiex = getSuffiex(desFilepath);
        if (StringUtils.isBlank(suffiex)) {
            throw new IllegalArgumentException("文件后缀不能为空");
        }
        Workbook workbook_des;
        if ("xls".equals(suffiex.toLowerCase())) {
            workbook_des = new HSSFWorkbook();
        } else {
            workbook_des = new XSSFWorkbook();
        }

        Workbook workbook = getWorkbook(srcFilepath);
        if (workbook != null) {
            int numberOfSheets = workbook.getNumberOfSheets();
            for (int k = 0; k < numberOfSheets; k++) {
                Sheet sheet = workbook.getSheetAt(k);
                Sheet sheet_des = workbook_des.createSheet(sheet.getSheetName());
                if (sheet != null) {
                    int rowNos = sheet.getLastRowNum();
                    for (int i = 0; i <= rowNos; i++) {
                        Row row = sheet.getRow(i);
                        Row row_des = sheet_des.createRow(i);
                        if (row != null) {
                            int columNos = row.getLastCellNum();
                            for (int j = 0; j < columNos; j++) {
                                Cell cell = row.getCell(j);
                                Cell cell_des = row_des.createCell(j);
                                if (cell != null) {
                                    cell.setCellType(CellType.STRING);
                                    cell_des.setCellType(CellType.STRING);

                                    cell_des.setCellValue(cell.getStringCellValue());
                                }
                            }
                        }
                    }
                }

            }
        }

        try {
            outputStream = new FileOutputStream(desFilepath);
            workbook_des.write(outputStream);
        } finally {
            if (outputStream != null) {
                outputStream.close();
            }
            if (workbook != null) {
                workbook_des.close();
            }
        }
    }


    public static List<Paper> readExcel(String filePath, int examid) throws Exception {
        //打开需要读取的文件
        FileInputStream inputStream = new FileInputStream(new File(filePath));
        //读取工作簿
        XSSFWorkbook wordBook = new XSSFWorkbook(inputStream);
        //读取工作表,从0开始
        XSSFSheet sheet = wordBook.getSheetAt(0);
        List<Paper> list = getTitles(sheet, examid);
        System.out.println(list);
        //关闭输入流
        inputStream.close();
        //关闭工作簿
        wordBook.close();
        return list;
    }

    public static List<Paper> getTitles(XSSFSheet sheet, int examid) {
        List<Paper> list = new ArrayList<>();
        for (int j = 1; ; j++) {
            Paper paper = new Paper();
            paper.setExamid(examid);
            XSSFRow row = sheet.getRow(j);
            if (row == null)
                break;
            for (int i = 1; i < 4; i++) {
                XSSFCell cell = row.getCell(i);//获取单元格对象
                String value = cell.getStringCellValue();
                switch (i) {
                    case 1:
                        paper.setTitle(value);
                        break;
                    case 2:
                        paper.setOptions(value);
                        break;
                    case 3:
                        paper.setAnswer(value);
                        break;
                    default:
                }
            }
            list.add(paper);
        }
        return list;
    }


    @Test
    public void readfile() {
        try {
            readExcel("e:\\exam1.xlsx", 1);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

