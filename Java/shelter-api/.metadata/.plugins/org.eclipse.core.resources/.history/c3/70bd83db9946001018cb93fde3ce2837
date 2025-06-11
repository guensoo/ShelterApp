package com.shelter.shelter_api;

import com.shelter.shelter_api.Entity.ShelterEntity;
import com.shelter.shelter_api.Enum.ShelterType;
import com.shelter.shelter_api.Repository.ShelterRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class ShelterExcelLoader implements CommandLineRunner {

    private final ShelterRepository repository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("🔥 com.shelter.shelter_api.ShelterExcelLoader 실행됨");

        InputStream is = getClass().getResourceAsStream("/shelter_data.xlsx");
        System.out.println("📄 InputStream null? " + (is == null));
        if (is == null) return;

        Workbook workbook = new XSSFWorkbook(is);
        Sheet sheet = workbook.getSheetAt(0);

        // ✅ 헤더맵 추출
        Map<String, Integer> headerMap = new HashMap<>();
        Row headerRow = sheet.getRow(0);
        for (int i = 0; i < headerRow.getPhysicalNumberOfCells(); i++) {
            String key = headerRow.getCell(i).getStringCellValue().trim();
            headerMap.put(key, i);
        }
        System.out.println("🧭 헤더맵: " + headerMap);

        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            String status = getStringCell(row, headerMap.get("운영상태"));
            if (!"사용중".equals(status)) continue;

            String name = getStringCell(row, headerMap.get("시설명"));
            String area = getStringCell(row, headerMap.get("도로명전체주소"));
            Double lat = getDoubleCell(row, headerMap.get("위도(EPSG4326)"));
            Double lng = getDoubleCell(row, headerMap.get("경도(EPSG4326)"));
            String info = getStringCell(row, headerMap.get("시설구분"));

            System.out.println("✅ 저장 대상: " + name + " / " + area + " / " + lat + ", " + lng);

            ShelterEntity entity = ShelterEntity.builder()
                    .name(name)
                    .area(area)
                    .lat(lat)
                    .lng(lng)
                    .info(info)
                    .type(ShelterType.SHELTER)
                    .build();

            repository.save(entity);
            System.out.println("✅ 저장 완료: " + name);
        }

        workbook.close();
        System.out.println("✅ 엑셀 데이터 저장 완료");
    }

    private String getStringCell(Row row, int index) {
        Cell cell = row.getCell(index);
        return (cell != null) ? cell.toString().trim() : "";
    }

    private Double getDoubleCell(Row row, int index) {
        Cell cell = row.getCell(index);
        if (cell == null) return 0.0;

        try {
            if (cell.getCellType() == CellType.NUMERIC) {
                return cell.getNumericCellValue();
            } else if (cell.getCellType() == CellType.STRING) {
                return Double.parseDouble(cell.getStringCellValue().trim());
            } else {
                return 0.0;
            }
        } catch (Exception e) {
            System.out.println("❌ 숫자 변환 오류 (index: " + index + ", 값: " + cell.toString() + ")");
            return 0.0;
        }
    }
}
