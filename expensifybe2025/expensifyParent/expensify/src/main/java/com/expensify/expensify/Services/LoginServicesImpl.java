package com.expensify.expensify.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensify.expensify.Entities.UserEntity;
import com.expensify.expensify.Repositories.UserRepository;

@Service
public class LoginServicesImpl implements LoginServices {
	
	@Autowired
	UserRepository userRepo;

	@Override
	public Boolean login(String email, String password) {
		
		UserEntity userVals = userRepo.findByEmail(email);
		String mail = userVals.getEmail();
		String pass = userVals.getPassword();
		if(mail.equals(email) && pass.equals(password)) {
			return true;
		}
		else {
			return false;
		}
		
	}

	@Override
	public void signup(String userName, String email, String password) {
		UserEntity userEntity = new UserEntity();
		userEntity.setUsername(userName);
		userEntity.setEmail(email);
		userEntity.setPassword(password);
		userRepo.save(userEntity);
		
	}

	@Override
	public String getUserFromMail(String email) {
		UserEntity userVals = userRepo.findByEmail(email);
		return userVals.getUsername();
	}

}
