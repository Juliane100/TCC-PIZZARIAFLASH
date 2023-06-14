package com.example.pizzaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pizzaria.model.Cupom;

public interface CupomRepository extends JpaRepository<Cupom, Long> {
    
}
