package com.example.pizzaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.pizzaria.model.Servico;

@Repository
public interface ServicoRepository extends JpaRepository<Servico ,Long> {
    
}
