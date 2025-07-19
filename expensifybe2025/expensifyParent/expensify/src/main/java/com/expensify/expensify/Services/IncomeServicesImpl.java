package com.expensify.expensify.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensify.expensify.Entities.IncomeEntities;
import com.expensify.expensify.Repositories.IncomeRepository;
import com.expensify.expensify.Requests.IncomeRequest;

@Service
public class IncomeServicesImpl implements IncomeServices {
	
	@Autowired
	IncomeRepository incomeRepo;

	@Override
	public void saveIncomeDetails(IncomeRequest incomeRequest) {
		
		IncomeEntities incomeEntity = new IncomeEntities();
		incomeEntity.setDate(incomeRequest.getDate());
		incomeEntity.setAmount(incomeRequest.getAmount());
		incomeEntity.setSource(incomeRequest.getSource());
		incomeEntity.setEmoji(incomeRequest.getEmoji());
		incomeEntity.setUserName(incomeRequest.getUserName());
		incomeRepo.save(incomeEntity);
		
	}

}
