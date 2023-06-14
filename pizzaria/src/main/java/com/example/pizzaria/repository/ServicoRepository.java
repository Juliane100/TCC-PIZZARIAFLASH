package com.example.pizzaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pizzaria.model.Servico;

public interface ServicoRepository extends JpaRepository<Servico ,Long> {
    
}
