package com.ibm.spring.service;

import java.util.List;

import com.ibm.spring.entity.User;

public interface IUserService {
     List<User> getAllUsers();
     User getUserById(int userId);
     boolean createUser(User user);
     void updateUser(User user);
     void deleteUser(int userId);
}
