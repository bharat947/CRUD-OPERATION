package com.ibm.spring.dao;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ibm.spring.entity.User;
@Transactional
@Repository
public class UserDAO implements IUserDAO {
	@PersistenceContext	
	private EntityManager entityManager;	
	@Override
	public User getUserById(int userId) {
		return entityManager.find(User.class, userId);
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<User> getAllUsers() {
		String hql = "FROM User as atcl ORDER BY atcl.userId DESC";
		return (List<User>) entityManager.createQuery(hql).getResultList();
	}	
	@Override
	public void createUser(User user) {
		entityManager.persist(user);
	}
	@Override
	public void updateUser(User user) {
		User artcl = getUserById(user.getUserId());
		artcl.setName(user.getName());
		artcl.setAddress(user.getAddress());
		artcl.setEmail(user.getEmail());
		artcl.setMobile(user.getMobile());
		artcl.setImage(user.getImage());
		entityManager.flush();
	}
	@Override
	public void deleteUser(int userId) {
		entityManager.remove(getUserById(userId));
	}
	@Override
	public boolean userExists(String name, String address,String email,String mobile,String image) {
	/*	String hql = "FROM Article as atcl WHERE atcl.title = ? and atcl.category = ?";
		int count = entityManager.createQuery(hql).setParameter(1, title)
		              .setParameter(2, category).getResultList().size();
		return count > 0 ? true : false;
		*/
		return false;
	}
}
