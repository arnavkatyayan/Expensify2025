package com.expensify.expensify.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.expensify.expensify.Entities.ExpenseEntities;

public interface ExpenseRepository extends JpaRepository<ExpenseEntities, Long> {
	List<ExpenseEntities> findAllByUserName(String userName);
	ExpenseEntities findByUserNameAndId(String userName, Long id);
}
