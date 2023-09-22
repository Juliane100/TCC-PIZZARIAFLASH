package com.example.pizzaria.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.example.pizzaria.model.Pedido;
import com.example.pizzaria.model.Pedido_item;
import com.example.pizzaria.repository.PedidoRepository;
import com.example.pizzaria.repository.Pedido_ItemRepository;

@Service
public class PedidoService {
    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private Pedido_ItemRepository pedidoItemRepository;

    public Pedido criarPedido(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    public Pedido_item criarPedidoItem(Pedido_item pedidoItem) {
        return pedidoItemRepository.save(pedidoItem);

    }

    public List<Pedido> listarPedidos() {
        return pedidoRepository.findAll();
    }

    public Pedido buscarPedidoPorId(Long id) {
        Optional<Pedido> optionalPedido = pedidoRepository.findById(id);
        return optionalPedido.orElse(null); 
    }

    public void salvarPedido(Pedido pedido) {
        pedidoRepository.save(pedido);
    }

}
