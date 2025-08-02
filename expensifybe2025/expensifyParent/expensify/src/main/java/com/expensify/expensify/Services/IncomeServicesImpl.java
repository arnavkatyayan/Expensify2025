package com.expensify.expensify.Services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensify.expensify.DTO.IncomeDTO;
import com.expensify.expensify.Entities.IncomeEntities;
import com.expensify.expensify.Repositories.IncomeRepository;
import com.expensify.expensify.Requests.EditIncomeRequest;
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

	@Override
	public Map<String, Integer> fetchIncomeDetailsService(String userName) {
	    Map<String, Integer> map = new HashMap<>();
	    List<IncomeEntities> incomes = incomeRepo.findAllByUserName(userName);
	    for (IncomeEntities income : incomes) {
	        System.out.println("Date: " + income.getDate() + ", Amount: " + income.getAmount());
	        map.put(income.getDate(), income.getAmount());
	    }
	    return map;
	}

	@Override
	public List<IncomeDTO> fetchAllIncomeDetailsService(String userName) {
		List<IncomeDTO> incomeDetails = new ArrayList<>();
		List<IncomeEntities> incomes = incomeRepo.findAllByUserName(userName);
		for(IncomeEntities income:incomes) {
			IncomeDTO dto = new IncomeDTO();
			dto.setAmount(income.getAmount());
			dto.setDate(income.getDate());
			dto.setSource(income.getSource());
			dto.setEmoji(income.getEmoji());
			dto.setUserName(userName);
			dto.setId(income.getId());
			incomeDetails.add(dto);
		}
		return incomeDetails;
	}

	@Override
	public void deleteEntryService(Long id) {
		
		incomeRepo.deleteById(id);
	}

	@Override
	public void editEntryService(EditIncomeRequest editIncomeRequest) {
		IncomeEntities entity = incomeRepo.findByUserNameAndId(editIncomeRequest.getUserName(),
				editIncomeRequest.getId());
		if (entity != null) {
			// Update fields with new values
			entity.setDate(editIncomeRequest.getDate());
			entity.setAmount(editIncomeRequest.getAmount());
			entity.setSource(editIncomeRequest.getSource());
			entity.setEmoji(editIncomeRequest.getEmoji());

			// Save updated entity
			incomeRepo.save(entity);
		}

	}

}
