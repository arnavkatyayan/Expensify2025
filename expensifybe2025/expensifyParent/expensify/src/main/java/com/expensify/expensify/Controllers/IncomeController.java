package com.expensify.expensify.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expensify.expensify.Requests.IncomeRequest;
import com.expensify.expensify.Services.IncomeServices;

@RequestMapping("/expensify-income-api")
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class IncomeController {

	@Autowired
	IncomeServices incomeServices;
	
	@PostMapping("/incomeSaving")
	public ResponseEntity<?> saveIncomeDetails(@RequestBody IncomeRequest incomeRequest) {
		try {
			incomeServices.saveIncomeDetails(incomeRequest);
			return ResponseEntity.ok("Income details successfully");
			
		} catch(Exception e) {
			e.printStackTrace();
			  return ResponseEntity
		                .status(HttpStatus.INTERNAL_SERVER_ERROR)
		                .body("Signup failed: " + e.getMessage());
		}
	}
	
}
