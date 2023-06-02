package com.example.pizzaria.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.pizzaria.model.User;

public interface UserRepository extends CrudRepository<User, Long >{
    

}
