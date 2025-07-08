package com.shelter.shelter_api.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
