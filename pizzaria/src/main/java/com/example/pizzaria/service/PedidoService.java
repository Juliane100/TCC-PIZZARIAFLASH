package com.example.pizzaria.service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pizzaria.model.Pedido;
import com.example.pizzaria.model.Pedido_item;
import com.example.pizzaria.repository.PedidoRepository;
import com.example.pizzaria.repository.Pedido_ItemRepository;

import jakarta.persistence.EntityNotFoundException;

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

    public void atualizarStatus(Long id, String novoStatus) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido não encontrado"));
        pedido.setStatus(novoStatus);
        pedidoRepository.save(pedido);
    }

    public Map<String, Integer> calcularQuantidadePedidosPorDiaDaSemana() {
        // Inicialize um mapa para armazenar a contagem de pedidos por dia da semana
        Map<String, Integer> quantidadePorDia = new HashMap<>();

        // Obtenha todos os pedidos do banco de dados
        List<Pedido> pedidos = pedidoRepository.findAll();

        // Preencha o mapa com a contagem de pedidos
        for (Pedido pedido : pedidos) {
            LocalDateTime dataPedido = pedido.getData();
            DayOfWeek diaDaSemana = dataPedido.getDayOfWeek();
            String nomeDia = diaDaSemana.getDisplayName(TextStyle.FULL, new Locale("pt", "BR"));

            // Se o dia já existe no mapa, incremente a quantidade; caso contrário,
            // inicialize com 1
            quantidadePorDia.put(nomeDia, quantidadePorDia.getOrDefault(nomeDia, 0) + 1);
        }

        return quantidadePorDia;
    }

}
