package com.expensify.expensify.Services;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface DashboardServices {
	void saveBalanceDetails(String userName, int balance);

	int getBalance(String userName);

	Map<String, Integer> getDetails(String userName);

	int getBudget(String userName);

	void saveBudgetDetails(String userName, int budget);
}
