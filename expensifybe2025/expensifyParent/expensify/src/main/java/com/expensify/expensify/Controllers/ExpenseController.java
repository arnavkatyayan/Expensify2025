package com.expensify.expensify.Controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.expensify.expensify.DTO.ExpenseDTO;
import com.expensify.expensify.Requests.EditExpenseRequest;
import com.expensify.expensify.Requests.ExpenseRequest;
import com.expensify.expensify.Services.ExpenseServices;

@RestController
@RequestMapping("/expensify-expense-api")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

	@Autowired
	ExpenseServices expenseServices;
	
	@PostMapping("/expenseSaving")
	public ResponseEntity<?> saveExpenseDetails(@RequestBody ExpenseRequest expenseRequest) {
		try {
			expenseServices.saveExpenseDetails(expenseRequest);
			return ResponseEntity.ok("Expense details saved successfully");
		} catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity
	                .status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Adding expense details failed: " + e.getMessage());
		}
	}
	
	@GetMapping("/getExpenseDetails")
	public ResponseEntity<List<ExpenseDTO>> getExpenseDetails(@RequestParam String userName) {
		List<ExpenseDTO> getList = new ArrayList<>();
		try {
			 getList = expenseServices.getExpenseDetailsService(userName);
			 return ResponseEntity.ok(getList);
		} catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(getList);
		}
	}
	
	@DeleteMapping("/deleteEntry")
	public ResponseEntity<?> deleteEntry(@RequestParam Long id) {
		try {
			expenseServices.deleteEntryService(id);
			return ResponseEntity.ok("Expense deleted");
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity
	                .status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Deleting expense details failed: " + e.getMessage());
		}
	}
	
	@PostMapping("/editEntry")
	public ResponseEntity<?> editEntry(@RequestBody EditExpenseRequest editExpenseRequest) {
		try {
			expenseServices.editEntryService(editExpenseRequest);
			return ResponseEntity.ok("Expense edited");
		} catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity
	                .status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Editing expense details failed: " + e.getMessage());
		}
	}
}
