package com.expensify.expensify.Services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.expensify.expensify.DTO.ExpenseDTO;
import com.expensify.expensify.Requests.EditExpenseRequest;
import com.expensify.expensify.Requests.ExpenseRequest;
import com.expensify.expensify.Requests.RecurrenceExpenseRequest;

@Service
public interface ExpenseServices {
	void saveExpenseDetails(@RequestBody ExpenseRequest expenseRequest);
	List<ExpenseDTO> getExpenseDetailsService(String userName);
	void deleteEntryService(Long id);
	void editEntryService(@RequestBody EditExpenseRequest editExpenseRequest);
	void saveRecurrenceExpenseDetails(@RequestBody RecurrenceExpenseRequest expenseRequest);
}
