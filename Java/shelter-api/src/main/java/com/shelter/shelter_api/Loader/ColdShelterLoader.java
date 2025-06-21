package com.shelter.shelter_api.Loader;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shelter.shelter_api.Entity.ColdShelterEntity;
import com.shelter.shelter_api.Repository.ColdShelterRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ColdShelterLoader {
    @PostConstruct
    public void init() {
        try {
            loadColdShelters();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private final ColdShelterRepository repository;

    @Value("${api.cold.service-key}")
    private String serviceKey;

    // @Scheduled(cron = "0 0 0 1 * ?")
    public void loadColdShelters() throws Exception {
        int totalCount = 1, pageNo = 1, numOfRows = 100;
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        do {
            String url = "https://www.safetydata.go.kr/V2/api/DSSP-IF-10804"
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
                    String reareFcltNo = item.path("REARE_FCLT_NO").asText();

                    // 기존 데이터 있는지 확인
                    ColdShelterEntity entity = repository.findByReareFcltNo(reareFcltNo)
                            .orElse(new ColdShelterEntity());

                    // 필드 업데이트
                    entity.setReareFcltNo(reareFcltNo);
                    entity.setFcltType(item.path("FCLT_TYPE").asText());
                    entity.setReareNm(item.path("REARE_NM").asText());
                    entity.setDaddr(item.path("DADDR").asText());
                    entity.setUtztnPsbltyTnop(item.path("UTZTN_PSBLTY_TNOP").asInt());
                    entity.setMdfcnHr(item.path("MDFCN_HR").asText());
                    entity.setRmrk(item.path("RMRK").asText());
                    entity.setRonaDaddr(item.path("RONA_DADDR").asText());
                    entity.setWkdyOperBgngHr(item.path("WKDY_OPER_BGNG_HR").asText());
                    entity.setWkdyOperEndHr(item.path("WKDY_OPER_END_HR").asText());
                    entity.setLot(item.path("LOT").asDouble());
                    entity.setLat(item.path("LAT").asDouble());
                    entity.setSndyOperBgngHr(item.path("SNDY_OPER_BGNG_HR").asText());
                    entity.setSndyOperEndHr(item.path("SNDY_OPER_END_HR").asText());
                    entity.setStdyOperBgngHr(item.path("STDY_OPER_BGNG_HR").asText());
                    entity.setStdyOperEndHr(item.path("STDY_OPER_END_HR").asText());
                    entity.setLhldyOperBgngHr(item.path("LHLDY_OPER_BGNG_HR").asText());
                    entity.setLhldyOperEndHr(item.path("LHLDY_OPER_END_HR").asText());
                    entity.setFcltySclas(item.path("FCLTY_SCLAS").asText());

                    repository.save(entity); // 개별 저장
                }
            }
            pageNo++;
        } while (pageNo * numOfRows < totalCount);
    }
}
