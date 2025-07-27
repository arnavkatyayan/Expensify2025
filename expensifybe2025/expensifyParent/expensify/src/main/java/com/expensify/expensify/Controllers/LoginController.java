package com.expensify.expensify.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.expensify.expensify.Requests.ChangePassword;
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
	
	@GetMapping("/getUser")
	public ResponseEntity<String> getUser(@RequestParam String mail) {
		try {
			String user = loginService.getUserFromMail(mail);
			return ResponseEntity.ok(user);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No user found");
		}
	}
	
	@GetMapping("/checkCurrentPassword")
	public ResponseEntity<Boolean> checkCurrentPassword(@RequestParam String password , @RequestParam String userName) {
		try {
			Boolean isPasswordCorrect = loginService.checkCurrentPassword(userName, password);
			return ResponseEntity.ok(isPasswordCorrect);
		} catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
		}
	}
	
	@PostMapping("/changePasswords")
	public ResponseEntity<?> changePassword(@RequestBody ChangePassword changePassword) {
		try {
			loginService.changePasswordService(changePassword.getUserName(),changePassword.getCurrentPassword(), changePassword.getNewPassword());
			return ResponseEntity.ok("Password Changed Successfully");
		} catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Password change failed: " +e.getMessage());
		}
	}
}
