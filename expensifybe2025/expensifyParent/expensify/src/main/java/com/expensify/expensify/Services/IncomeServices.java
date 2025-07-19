package com.expensify.expensify.Services;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.expensify.expensify.Requests.IncomeRequest;

@Service
public interface IncomeServices {
	void saveIncomeDetails(@RequestBody IncomeRequest incomeRequest);
}
