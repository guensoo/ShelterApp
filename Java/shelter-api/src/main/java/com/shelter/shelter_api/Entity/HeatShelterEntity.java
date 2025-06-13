package com.shelter.shelter_api.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "heat_shelter")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeatShelterEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;                    // RSTR_NM
    private String address;                 // RN_DTL_ADRES
    private Double latitude;               // LA
    private Double longitude;              // LO
    private String weekdayStartTime;       // WKDAY_OPER_BEGIN_TIME
    private String weekdayEndTime;         // WKDAY_OPER_END_TIME
    private String startDate;              // OPER_BEGIN_DE
    private String endDate;                // OPER_END_DE
    private Integer capacity;              // USE_PSBL_NMPR
    private String isOperating;            // FCLTY_OPRN_AT
    private String hasWeekendOp;           // CHCK_MATTER_WKEND_HDAY_OPN_AT
    private String hasNightOp;             // CHCK_MATTER_NIGHT_OPN_AT
    private String hasStay;                // CHCK_MATTER_STAYNG_PSBL_AT
    private Integer airconCount;           // COLR_HOLD_ELEFN
    private String facilityType;           // FCLTY_TY
    private String facilitySubType;        // FCLTY_SCLAS
}