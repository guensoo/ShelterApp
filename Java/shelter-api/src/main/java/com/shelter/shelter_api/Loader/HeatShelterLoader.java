package com.shelter.shelter_api.Loader;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shelter.shelter_api.Entity.HeatShelterEntity;
import com.shelter.shelter_api.Repository.HeatShelterRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class HeatShelterLoader {
    @PostConstruct
    public void init() {
        try {
            loadHeatShelters();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private final HeatShelterRepository repository;

    @Value("${api.heat.service-key}")
    private String serviceKey;

    // @Scheduled(cron = "0 0 0 1 * ?") // 필요하면 활성화
    public void loadHeatShelters() throws Exception {
        int totalCount = 1, pageNo = 1, numOfRows = 100;
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();
        List<HeatShelterEntity> entities = new ArrayList<>();

        do {
            String url = "https://www.safetydata.go.kr/V2/api/DSSP-IF-10942"
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
                    String rstrFcltyNo = item.path("RSTR_FCLTY_NO").asText();

                    Optional<HeatShelterEntity> existing = repository.findByRstrFcltyNo(rstrFcltyNo);
                    HeatShelterEntity entity = existing.orElse(new HeatShelterEntity());

                    entity.setRstrFcltyNo(rstrFcltyNo);
                    entity.setYear(item.path("YEAR").asText());
                    entity.setArcd(item.path("ARCD").asText());
                    entity.setFcltyTy(item.path("FCLTY_TY").asText());
                    entity.setRstrNm(item.path("RSTR_NM").asText());
                    entity.setDtlAdres(item.path("DTL_ADRES").asText());
                    entity.setAr(item.path("AR").asText());
                    entity.setUsePsblNmpr(item.path("USE_PSBL_NMPR").asText());
                    entity.setColrHoldElefn(item.path("COLR_HOLD_ELEFN").asText());
                    entity.setColrHoldArcntdn(item.path("COLR_HOLD_ARCNDTN").asText());
                    entity.setChckMatterNightOpnAt(item.path("CHCK_MATTER_NIGHT_OPN_AT").asText());
                    entity.setInptTime(item.path("INPT_TIME").asText());
                    entity.setModfTime(item.path("MODF_TIME").asText());
                    entity.setUseAt(item.path("USE_AT").asText());
                    entity.setRm(item.path("RM").asText());
                    entity.setRnDtlAdres(item.path("RN_DTL_ADRES").asText());
                    entity.setChckMatterWkendHdayOpnAt(item.path("CHCK_MATTER_WKEND_HDAY_OPN_AT").asText());
                    entity.setOperBeginDe(item.path("OPER_BEGIN_DE").asText());
                    entity.setOperEndDe(item.path("OPER_END_DE").asText());
                    entity.setMngdptCd(item.path("MNGDPT_CD").asText());
                    entity.setChckMatterStayngPsblAt(item.path("CHCK_MATTER_STAYNG_PSBL_AT").asText());
                    entity.setXcord(item.path("XCORD").asText());
                    entity.setYcord(item.path("YCORD").asText());
                    entity.setLo(item.path("LO").asText());
                    entity.setLa(item.path("LA").asText());
                    entity.setFcltyOprnAt(item.path("FCLTY_OPRN_AT").asText());
                    entity.setDtlPosition(item.path("DTL_POSITION").asText());
                    entity.setWkdayOperBeginTime(item.path("WKDAY_OPER_BEGIN_TIME").asText());
                    entity.setWkdayOperEndTime(item.path("WKDAY_OPER_END_TIME").asText());
                    entity.setWkendHdayOperBeginTime(item.path("WKEND_HDAY_OPER_BEGIN_TIME").asText());
                    entity.setWkendHdayOperEndTime(item.path("WKEND_HDAY_OPER_END_TIME").asText());
                    entity.setFcltySclas(item.path("FCLTY_SCLAS").asText());

                    entities.add(entity);
                }
            }

            pageNo++;
        } while (entities.size() < totalCount);

        repository.saveAll(entities); // 한 번에 저장 (insert or update)
    }
}
