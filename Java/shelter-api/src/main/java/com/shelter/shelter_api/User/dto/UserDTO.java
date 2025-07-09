package com.shelter.shelter_api.User.dto;

import com.shelter.shelter_api.User.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class UserDTO{

private String email;
private String username;
private String nickname;
private Role role;

};
