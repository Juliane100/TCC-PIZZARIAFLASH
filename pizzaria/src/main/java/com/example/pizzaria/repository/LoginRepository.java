
package com.example.pizzaria.repository;

import com.example.pizzaria.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {
    boolean existsByEmail(String email);
    Login findByEmail(String email);
    
    
}
