package com.expensify.expensify.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensify.expensify.DTO.ExpenseDTO;
import com.expensify.expensify.Entities.ExpenseEntities;
import com.expensify.expensify.Entities.IncomeEntities;
import com.expensify.expensify.Repositories.ExpenseRepository;
import com.expensify.expensify.Requests.EditExpenseRequest;
import com.expensify.expensify.Requests.ExpenseRequest;
import com.expensify.expensify.Requests.RecurrenceExpenseRequest;

@Service
public class ExpenseServicesImpl implements ExpenseServices{

	@Autowired
	ExpenseRepository expenseRepo;
	@Override
	public void saveExpenseDetails(ExpenseRequest expenseRequest) {
		ExpenseEntities expenseEntity = new ExpenseEntities();
		expenseEntity.setAmount(expenseRequest.getAmount());
		expenseEntity.setDate(expenseRequest.getDate());
		expenseEntity.setSource(expenseRequest.getSource());
		expenseEntity.setEmoji(expenseRequest.getEmoji());
		expenseEntity.setUserName(expenseRequest.getUserName());
		expenseEntity.setIsRecurring(expenseRequest.getIsRecurring());
		expenseRepo.save(expenseEntity);
	}
	@Override
	public List<ExpenseDTO> getExpenseDetailsService(String userName) {
		
		List<ExpenseDTO> list = new ArrayList<>();
		List<ExpenseEntities> entities = expenseRepo.findAllByUserName(userName);
		for(ExpenseEntities entity:entities) {
			ExpenseDTO dto = new ExpenseDTO();
			dto.setAmount(entity.getAmount());
			dto.setEmoji(entity.getEmoji());
			dto.setDate(entity.getDate());
			dto.setSource(entity.getSource());
			dto.setUserName(entity.getUserName());
			dto.setId(entity.getId());
			list.add(dto);
		}
		return list;
	}
	@Override
	public void deleteEntryService(Long id) {
		expenseRepo.deleteById(id);
		
	}
	@Override
	public void editEntryService(EditExpenseRequest editExpenseRequest) {
		ExpenseEntities entity = expenseRepo.findByUserNameAndId(editExpenseRequest.getUserName(),
				editExpenseRequest.getId());
		if (entity != null) {
			// Update fields with new values
			entity.setDate(editExpenseRequest.getDate());
			entity.setAmount(editExpenseRequest.getAmount());
			entity.setSource(editExpenseRequest.getSource());
			entity.setEmoji(editExpenseRequest.getEmoji());

			// Save updated entity
			expenseRepo.save(entity);
		}

		
	}
	@Override
	public void saveRecurrenceExpenseDetails(RecurrenceExpenseRequest expenseRequest) {
		ExpenseEntities expenseEntity = new ExpenseEntities();
		expenseEntity.setAmount(expenseRequest.getAmount());
		expenseEntity.setDate(expenseRequest.getDate());
		expenseEntity.setSource(expenseRequest.getSource());
		expenseEntity.setEmoji(expenseRequest.getEmoji());
		expenseEntity.setUserName(expenseRequest.getUserName());
		expenseEntity.setIsRecurring(expenseRequest.getIsRecurring());
		expenseRepo.save(expenseEntity);
		
	}

}
