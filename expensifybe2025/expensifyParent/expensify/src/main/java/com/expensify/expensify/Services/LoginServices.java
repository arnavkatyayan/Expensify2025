package com.expensify.expensify.Services;

import org.springframework.stereotype.Service;

@Service
public interface LoginServices {
	
	Boolean login(String email, String password);
	void signup(String userName, String email, String password);
	String getUserFromMail(String email);
	
}
