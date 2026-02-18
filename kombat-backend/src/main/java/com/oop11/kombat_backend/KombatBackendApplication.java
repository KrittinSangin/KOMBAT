package com.oop11.kombat_backend;

import com.oop11.kombat_backend.Console.ConsoleRunner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KombatBackendApplication {

	public static void main(String[] args)
	{
//		SpringApplication.run(KombatBackendApplication.class, args);
		ConsoleRunner cr  = new ConsoleRunner();
		cr.run();
	}

}
