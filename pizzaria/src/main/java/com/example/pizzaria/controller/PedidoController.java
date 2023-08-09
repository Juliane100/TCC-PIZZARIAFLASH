package com.example.pizzaria.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.pizzaria.model.Cliente;

@Controller
@RequestMapping("/pedido")
public class PedidoController {

    @GetMapping
    public String showPedidoPage(Model model) {
        model.addAttribute("cliente", new Cliente());
        return "pedido/index";
    }

}
