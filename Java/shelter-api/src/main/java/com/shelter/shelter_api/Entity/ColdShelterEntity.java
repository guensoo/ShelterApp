package com.shelter.shelter_api.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "cold_shelter")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class ColdShelterEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reareNm;
    private Long reareFcltNo;
    private String fcltType;
    private String fcltySclas;
    private String daddr;
    private String ronaDaddr;
    private Double lat;
    private Double lot;
    private String wkdyOperBgngHr;
    private String wkdyOperEndHr;
    private String lhhldyOperBgngHr;
    private String lhhldyOperEndHr;
    private String sndyOperBgngHr;
    private String sndyOperEndHr;
    private String stdyOperBgngHr;
    private String stdyOperEndHr;
    private Integer utztnPsbltyTnop;
    private String rmrk;
    private String mdfcnHr;
}
