package com.expensify.expensify.Services;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.expensify.expensify.DTO.IncomeDTO;
import com.expensify.expensify.Requests.EditIncomeRequest;
import com.expensify.expensify.Requests.IncomeRequest;

@Service
public interface IncomeServices {
	void saveIncomeDetails(@RequestBody IncomeRequest incomeRequest);
	Map<String, Integer> fetchIncomeDetailsService(String userName);
	List<IncomeDTO> fetchAllIncomeDetailsService(String userName);
	void deleteEntryService(Long id);
	void editEntryService(@RequestBody EditIncomeRequest editIncomeRequest);
}
