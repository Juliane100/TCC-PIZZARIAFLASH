package com.example.pizzaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.pizzaria.model.Cupom;

@Repository
public interface CupomRepository extends JpaRepository<Cupom, Long> {

}
