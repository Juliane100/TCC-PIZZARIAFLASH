package com.example.pizzaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.pizzaria.model.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido,Long>{
    
}
