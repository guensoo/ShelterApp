package com.shelter.shelter_api.User;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.*;

@Embeddable
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @EqualsAndHashCode
public class UserFavoriteShelterId implements Serializable {
    private Long userId;
    private String shelterType; // 예: "HEAT", "COLD" 등
    private Long shelterId;     // 각 종류별 PK (Long/String은 실제 설계에 맞춰)
}
