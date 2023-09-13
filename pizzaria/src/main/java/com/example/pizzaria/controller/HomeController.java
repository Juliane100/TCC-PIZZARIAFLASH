package com.example.pizzaria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.pizzaria.model.Cliente;
import com.example.pizzaria.model.Cupom;
import com.example.pizzaria.model.Produto;
import com.example.pizzaria.service.ClienteService;
import com.example.pizzaria.service.CupomService;
import com.example.pizzaria.service.ProdutoService;

@Controller
@RequestMapping("/home")
public class HomeController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private CupomService cupomService;

    @GetMapping
    public String home(Model model) {
        List<Cliente> clientes = clienteService.obterClientes();
        model.addAttribute("clientes", clientes);

        List<Produto> produtos = produtoService.obterProdutos();
        model.addAttribute("produtos", produtos);

        List<Cupom> cupons = cupomService.obterCupons();
        model.addAttribute("cupons", cupons);

        return "home/index";
    }

}