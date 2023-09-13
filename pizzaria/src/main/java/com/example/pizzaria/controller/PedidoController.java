package com.example.pizzaria.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.pizzaria.model.Cliente;
import com.example.pizzaria.model.Pedido;
import com.example.pizzaria.model.Pedido_item;
import com.example.pizzaria.repository.PedidoRepository;
import com.example.pizzaria.repository.Pedido_ItemRepository;

@Controller
@RequestMapping("/pedido")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private Pedido_ItemRepository pedidoItemRepository;

    @GetMapping
    public String showPedidoPage(Model model) {
        model.addAttribute("cliente", new Cliente());
        return "pedido/index";
    }

    @PostMapping("/salvar")
    public ResponseEntity<Pedido> criarPedido(@RequestBody Pedido pedido) {
        try {
            pedido.setStatus("preparando");

            if (pedido.getData() == null) {
                pedido.setData(LocalDateTime.now());
            }

            // Salva o pedido no banco de dados
            Pedido pedidoCriado = pedidoRepository.save(pedido);

            return new ResponseEntity<>(pedidoCriado, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/salvar/itens")
    public ResponseEntity<?> criarItensDoPedido(@RequestBody List<Pedido_item> itensDoPedido) {
        try {
            List<Pedido_item> itensCriados = pedidoItemRepository.saveAll(itensDoPedido);
            if (!itensCriados.isEmpty()) {
                return new ResponseEntity<>("Itens do pedido criados com sucesso!", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("Nenhum item do pedido foi criado.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao criar os itens do pedido.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}