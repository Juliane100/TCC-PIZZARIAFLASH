package com.example.pizzaria.repository;

import com.example.pizzaria.model.Funcionario;
import com.example.pizzaria.model.Login;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    Funcionario findByEmail(String email);
    Funcionario findByLogin(Login login);
}




