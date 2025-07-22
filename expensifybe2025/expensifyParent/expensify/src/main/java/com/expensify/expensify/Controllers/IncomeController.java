package com.expensify.expensify.Controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.expensify.expensify.DTO.IncomeDTO;
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
			return ResponseEntity.ok("Income details saved successfully");
			
		} catch(Exception e) {
			e.printStackTrace();
			  return ResponseEntity
		                .status(HttpStatus.INTERNAL_SERVER_ERROR)
		                .body("Add income details failed: " + e.getMessage());
		}
	}
	
	@GetMapping("/fetchIncomeDetails")
	public ResponseEntity<Map<String,Integer>> fetchIncomeDetails(@RequestParam String userName) {
		Map<String,Integer> incomeDetails = new HashMap<>();
		try {
			incomeDetails = incomeServices.fetchIncomeDetailsService(userName);
			return ResponseEntity.ok(incomeDetails);
		} catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(incomeDetails);

		}
	}
	
	@GetMapping("/fetchAllIncomeDetails")
	public ResponseEntity<List<IncomeDTO>> fetchAllIncomeDetails(@RequestParam String userName) {
		List<IncomeDTO> incomeDetails = new ArrayList<>();
		try {
			incomeDetails = incomeServices.fetchAllIncomeDetailsService(userName);
			return ResponseEntity.ok(incomeDetails);
		} catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(incomeDetails);
		}
		
	}
	
}
