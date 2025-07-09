package com.shelter.shelter_api.User.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ResetPasswordRequest {
    private String token;
    private String newPassword;
}
