package com.expensify.expensify.Controllers;

import java.util.HashMap;
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

import com.expensify.expensify.Requests.BalanceRequest;
import com.expensify.expensify.Services.DashboardServices;

@RequestMapping("/expensify-dashboard-api")
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

	@Autowired
	DashboardServices dashboardService;

	@PostMapping("/balanceSaving")
	public ResponseEntity<?> saveBalance(@RequestBody BalanceRequest balanceRequest) {

		try {
			dashboardService.saveBalanceDetails(balanceRequest.getUserName(), balanceRequest.getBalance());
			return ResponseEntity.ok("Balance saved successfully");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Adding balance details failed: " + e.getMessage());
		}
	}

	@GetMapping("/fetchBalanceDetails")
	public ResponseEntity<Integer> fetchBalanceDetails(@RequestParam String userName) {
		try {
			int balance = dashboardService.getBalance(userName);
			return ResponseEntity.ok(balance);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(0);
		}
	}

	@GetMapping("/fetchBudgetDetails")
	public ResponseEntity<Integer> fetchBudgetDetails(@RequestParam String userName) {
		try {
			int budget = dashboardService.getBudget(userName);
			return ResponseEntity.ok(budget);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(0);
		}
	}

	@PostMapping("/saveBudgetDetails")
	public ResponseEntity<?> saveBudget(@RequestBody BalanceRequest balanceRequest) {
		try {
			dashboardService.saveBudgetDetails(balanceRequest.getUserName(), balanceRequest.getBudget());
			return ResponseEntity.ok("Budget saved successfully");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Adding budget details failed: " + e.getMessage());
		}
	}

	@GetMapping("/fetchOtherDetails")
	public ResponseEntity<Map<String, Integer>> fetchOtherDetails(@RequestParam String userName) {
		Map<String, Integer> m1 = new HashMap<>();
		try {
			m1 = dashboardService.getDetails(userName);
			return ResponseEntity.ok(m1);

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(m1);

		}
	}
}
