package com.shelter.shelter_api.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class HeatShelterDTO {

    @JsonProperty("RSTR_NM")
    private String name;

    @JsonProperty("RN_DTL_ADRES")
    private String address;

    @JsonProperty("LA")
    private Double latitude;

    @JsonProperty("LO")
    private Double longitude;

    @JsonProperty("WKDAY_OPER_BEGIN_TIME")
    private String weekdayStartTime;

    @JsonProperty("WKDAY_OPER_END_TIME")
    private String weekdayEndTime;

    @JsonProperty("OPER_BEGIN_DE")
    private String startDate;

    @JsonProperty("OPER_END_DE")
    private String endDate;

    @JsonProperty("USE_PSBL_NMPR")
    private Integer capacity;

    @JsonProperty("FCLTY_OPRN_AT")
    private String isOperating;

    @JsonProperty("CHCK_MATTER_WKEND_HDAY_OPN_AT")
    private String hasWeekendOp;

    @JsonProperty("CHCK_MATTER_NIGHT_OPN_AT")
    private String hasNightOp;

    @JsonProperty("CHCK_MATTER_STAYNG_PSBL_AT")
    private String hasStay;

    @JsonProperty("COLR_HOLD_ELEFN")
    private Integer airconCount;

    @JsonProperty("FCLTY_TY")
    private String facilityType;

    @JsonProperty("FCLTY_SCLAS")
    private String facilitySubType;
}