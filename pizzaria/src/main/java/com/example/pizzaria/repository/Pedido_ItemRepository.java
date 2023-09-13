package com.example.pizzaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pizzaria.model.Pedido_item;


public interface Pedido_ItemRepository  extends JpaRepository<Pedido_item,Long> {
    
}
