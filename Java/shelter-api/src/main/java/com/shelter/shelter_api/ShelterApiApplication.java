package com.shelter.shelter_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.shelter.shelter_api", "loader"})
public class ShelterApiApplication {

	public static void main(String[] args) {

		SpringApplication.run(ShelterApiApplication.class, args);
	}

}
