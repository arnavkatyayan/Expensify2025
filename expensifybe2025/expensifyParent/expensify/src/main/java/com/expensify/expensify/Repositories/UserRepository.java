package com.expensify.expensify.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.expensify.expensify.Entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity,Long> {
	UserEntity findByEmail(String email);
	UserEntity findByUsername(String username);
}
