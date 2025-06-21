package com.shelter.shelter_api.Loader;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shelter.shelter_api.Entity.ChemicalShelterEntity;
import com.shelter.shelter_api.Repository.ChemicalShelterRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ChemicalShelterLoader {
    @PostConstruct
    public void init() {
        try {
            loadChemicalShelters();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private final ChemicalShelterRepository repository;

    @Value("${api.chemical.service-key}")
    private String serviceKey;

    // @Scheduled(cron = "0 0 0 1 * ?") // 스케줄러 사용시 활성화
    public void loadChemicalShelters() throws Exception {
        int totalCount = 1, pageNo = 1, numOfRows = 100;
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        do {
            String url = "https://www.safetydata.go.kr/V2/api/DSSP-IF-00707"
                    + "?serviceKey=" + serviceKey
                    + "&pageNo=" + pageNo
                    + "&numOfRows=" + numOfRows
                    + "&returnType=json";
            String result = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(result);

            if (root.has("totalCount")) {
                totalCount = root.get("totalCount").asInt();
            }

            JsonNode body = root.get("body");
            if (body != null && body.isArray()) {
                for (JsonNode item : body) {
                    String unqVl = item.path("UNQ_VL").asText();

                    // 기존 데이터 조회
                    ChemicalShelterEntity entity = repository.findByUnqVl(unqVl)
                            .orElse(new ChemicalShelterEntity());

                    // 필드 업데이트
                    entity.setUnqVl(unqVl);
                    entity.setShntPlcNm(item.path("SHNT_PLC_NM").asText());
                    entity.setFcltDtlnm(item.path("FCLT_DTLNM").asText());
                    entity.setRonaDaddr(item.path("RONA_DADDR").asText());
                    entity.setLat(item.path("LAT").asDouble());
                    entity.setLot(item.path("LOT").asDouble());
                    entity.setActcArea(item.path("ACTC_AREA").asDouble());
                    entity.setActcTnop(item.path("ACTC_TNOP").asInt());
                    entity.setRmrk(item.path("RMRK").asText());
                    entity.setCtprvnNm(item.path("CTPRVN_NM").asText());
                    entity.setSggNm(item.path("SGG_NM").asText());

                    repository.save(entity); // 업데이트 or 삽입
                }
            }
            pageNo++;
        } while (pageNo * numOfRows < totalCount);
    }
}
