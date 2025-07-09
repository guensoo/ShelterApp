package com.shelter.shelter_api.User.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ResetLinkRequest {
    private String username;
    private String email;
}
