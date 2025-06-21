package com.shelter.shelter_api.Loader;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shelter.shelter_api.Entity.EarthquakeShelterEntity;
import com.shelter.shelter_api.Repository.EarthquakeShelterRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class EarthquakeShelterLoader {
    @PostConstruct
    public void init() {
        try {
            loadEarthquakeShelters();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private final EarthquakeShelterRepository repository;

    @Value("${api.earthquake.service-key}")
    private String serviceKey;

    // @Scheduled(cron = "0 0 0 1 * ?")
    public void loadEarthquakeShelters() throws Exception {
        int totalCount = 1, pageNo = 1, numOfRows = 100;
        List<EarthquakeShelterEntity> entities = new ArrayList<>();
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        do {
            String url = "https://www.safetydata.go.kr/V2/api/DSSP-IF-00106"
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
                    EarthquakeShelterEntity e = EarthquakeShelterEntity.builder()
                            .thingsMngNo(item.path("THINGS_MNG_NO").asText())
                            .thingsNm(item.path("THINGS_NM").asText())
                            .ctpvNm(item.path("CTPV_NM").asText())
                            .sggNm(item.path("SGG_NM").asText())
                            .emdNm(item.path("EMD_NM").asText())
                            .roadNm(item.path("ROAD_NM").asText())
                            .addrMno(item.path("ADDR_MNO").asInt())
                            .addrSno(item.path("ADDR_SNO").asInt())
                            .lon(item.path("XMAP_CRTS").asDouble())
                            .lat(item.path("YMAP_CRTS").asDouble())
                            .geom(item.path("GEOM").asText())
                            .build();
                    entities.add(e);
                }
            }
            pageNo++;
        } while (entities.size() < totalCount);

        List<EarthquakeShelterEntity> updatedEntities = new ArrayList<>();

        for (EarthquakeShelterEntity e : entities) {
            EarthquakeShelterEntity entity = repository.findByThingsMngNo(e.getThingsMngNo())
                    .orElse(new EarthquakeShelterEntity());

            entity.setThingsMngNo(e.getThingsMngNo());
            entity.setThingsNm(e.getThingsNm());
            entity.setCtpvNm(e.getCtpvNm());
            entity.setSggNm(e.getSggNm());
            entity.setEmdNm(e.getEmdNm());
            entity.setRoadNm(e.getRoadNm());
            entity.setAddrMno(e.getAddrMno());
            entity.setAddrSno(e.getAddrSno());
            entity.setLon(e.getLon());
            entity.setLat(e.getLat());
            entity.setGeom(e.getGeom());

            updatedEntities.add(entity);
        }

        repository.saveAll(updatedEntities);
    }
}
