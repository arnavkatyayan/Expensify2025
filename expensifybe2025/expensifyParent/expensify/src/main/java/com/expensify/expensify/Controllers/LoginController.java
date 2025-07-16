package com.expensify.expensify.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expensify.expensify.Requests.LoginRequest;
import com.expensify.expensify.Requests.SignupRequest;
import com.expensify.expensify.Services.LoginServices;

@RestController
@RequestMapping("/expensify-login-api")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {
	
	@Autowired
	LoginServices loginService;
	
	@PostMapping("/login")
	public ResponseEntity<Boolean> loginUser(@RequestBody LoginRequest loginRequest) {
		try {
			Boolean isUserSignedIn = loginService.login(loginRequest.getEmail(),loginRequest.getPassword());
			return ResponseEntity.ok(isUserSignedIn);
		} catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
		}
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest) {
		try {
			loginService.signup(signupRequest.getUserName(),signupRequest.getEmail(),signupRequest.getPassword());
			return ResponseEntity.ok("User registered successfully");
		} catch(Exception e) {
			  return ResponseEntity
		                .status(HttpStatus.INTERNAL_SERVER_ERROR)
		                .body("Signup failed: " + e.getMessage());
		}
	}
}
