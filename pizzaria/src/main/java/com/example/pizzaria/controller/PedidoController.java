package com.example.pizzaria.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.pizzaria.model.Cliente;
import com.example.pizzaria.service.PedidoItemService;
import com.example.pizzaria.service.PedidoService;

@Controller
@RequestMapping("/pedido")
public class PedidoController {

   @Autowired
    private PedidoService pedidoService;

    @Autowired
    private PedidoItemService pedidoItemService;


    @GetMapping
    public String showPedidoPage(Model model) {
        model.addAttribute("cliente", new Cliente());
        return "pedido/index";
    }

   
    
    
    

}
