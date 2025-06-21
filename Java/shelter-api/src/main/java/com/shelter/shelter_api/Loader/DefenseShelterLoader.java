package com.shelter.shelter_api.Loader;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shelter.shelter_api.Entity.DefenseShelterEntity;
import com.shelter.shelter_api.Repository.DefenseShelterRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DefenseShelterLoader {
    @PostConstruct
    public void init() {
        try {
            loadDefenseShelters();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private final DefenseShelterRepository repository;

    @Value("${api.defense.service-key}")
    private String serviceKey;

    // @Scheduled(cron = "0 0 0 1 * ?") // 자동화 시
    public void loadDefenseShelters() throws Exception {
        int totalCount = 1, pageNo = 1, numOfRows = 100;
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        do {
            String url = "https://www.safetydata.go.kr/V2/api/DSSP-IF-10166"
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
                    String gid = item.path("GID").asText();

                    DefenseShelterEntity entity = repository.findByGid(gid)
                            .orElseGet(DefenseShelterEntity::new);

                    entity.setGid(gid);
                    entity.setShltNm(item.path("SHLT_NM").asText());
                    entity.setDaddr(item.path("DADDR").asText());
                    entity.setRoadNmAddr(item.path("ROAD_NM_ADDR").asText());
                    entity.setLat(item.path("LAT").asDouble());
                    entity.setLot(item.path("LOT").asDouble());
                    entity.setMngInstTlhn(item.path("MNG_INST_TLHN").asText());
                    entity.setMngInstNm(item.path("MNG_INST_NM").asText());
                    entity.setFcar(item.path("FCAR").asInt());

                    repository.save(entity);
                }
            }
            pageNo++;
        } while ((pageNo - 1) * numOfRows < totalCount);
    }
}
