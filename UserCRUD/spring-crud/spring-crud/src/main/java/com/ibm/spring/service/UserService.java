package com.ibm.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.spring.dao.IUserDAO;
import com.ibm.spring.entity.User;
@Service
public class UserService implements IUserService {
	@Autowired
	private IUserDAO userDAO;
	@Override
	public User getUserById(int userId) {
		User obj = userDAO.getUserById(userId);
		return obj;
	}	
	@Override
	public List<User> getAllUsers(){
		return userDAO.getAllUsers();
	}
	@Override
	public synchronized boolean createUser(User user){
       if (userDAO.userExists(user.getName(), user.getAddress(),user.getEmail(),user.getMobile(),user.getImage())) {
    	   return false;
       } else {
    	   userDAO.createUser(user);
    	   return true;
       }
	}
	@Override
	public void updateUser(User user) {
		userDAO.updateUser(user);
	}
	@Override
	public void deleteUser(int userId) {
		userDAO.deleteUser(userId);
	}
}
