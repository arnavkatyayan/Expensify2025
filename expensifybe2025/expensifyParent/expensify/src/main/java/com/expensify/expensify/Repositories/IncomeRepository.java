package com.expensify.expensify.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.expensify.expensify.Entities.IncomeEntities;

public interface IncomeRepository extends JpaRepository<IncomeEntities,Long> {
		
	List<IncomeEntities> findAllByUserName(String userName);
}
