package com.ibm.spring.dao;
import java.util.List;
import com.ibm.spring.entity.User;
public interface IUserDAO {
    List<User> getAllUsers();
    User getUserById(int userId);
    void createUser(User user);
    void updateUser(User user);
    void deleteUser(int userId);
    boolean userExists(String name, String address,String email,String mobile,String image);
}
 