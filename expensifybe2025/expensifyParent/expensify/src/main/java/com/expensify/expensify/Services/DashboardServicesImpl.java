package com.expensify.expensify.Services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensify.expensify.Entities.ExpenseEntities;
import com.expensify.expensify.Entities.IncomeEntities;
import com.expensify.expensify.Entities.UserEntity;
import com.expensify.expensify.Repositories.ExpenseRepository;
import com.expensify.expensify.Repositories.IncomeRepository;
import com.expensify.expensify.Repositories.UserRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class DashboardServicesImpl implements DashboardServices {

	@Autowired
	UserRepository userRepo;

	@Autowired
	ExpenseRepository expenseRepo;

	@Autowired
	IncomeRepository incomeRepo;

	@Override
	@Transactional
	public void saveBalanceDetails(String userName, int balance) {
		UserEntity user = userRepo.findByUsername(userName);
		if (user != null) {
			user.setBalance(balance);
			userRepo.save(user); // ✅ Save the updated entity
		} else {
			throw new RuntimeException("User not found: " + userName);
		}
	}

	@Override
	public int getBalance(String userName) {
		UserEntity user = userRepo.findByUsername(userName);
		return user.getBalance();
	}

	@Override
	public Map<String, Integer> getDetails(String userName) {
		Map<String, Integer> m1 = new HashMap<>();
		int expenseAmt = getExpense(userName);
		int incomeAmt = getIncome(userName);
		m1.put("Expense Amount", expenseAmt);
		m1.put("Income Amount", incomeAmt);
		return m1;
	}

	public int getIncome(String userName) {
		List<IncomeEntities> l1 = new ArrayList<>();
		l1 = incomeRepo.findAllByUserName(userName);
		int incomes = 0;
		for (IncomeEntities income : l1) {
			incomes = incomes + income.getAmount();
		}
		return incomes;
	}

	public int getExpense(String userName) {
		List<ExpenseEntities> l1 = new ArrayList<>();
		l1 = expenseRepo.findAllByUserName(userName);
		int expenses = 0;
		for (ExpenseEntities expense : l1) {
			expenses = expenses + expense.getAmount();
		}
		return expenses;
	}

	@Override
	public int getBudget(String userName) {
		UserEntity user = userRepo.findByUsername(userName);
		return user.getBudget();
	}

	@Override
	public void saveBudgetDetails(String userName, int budget) {
		UserEntity user = userRepo.findByUsername(userName);
		if (user != null) {
			user.setBudget(budget);
			userRepo.save(user);
		} else {
			throw new RuntimeException("User not found: " + userName);
		}
	}

}
