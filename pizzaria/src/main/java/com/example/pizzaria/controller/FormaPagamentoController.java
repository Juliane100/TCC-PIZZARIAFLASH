package com.example.pizzaria.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.pizzaria.model.FormaPagamento;
import com.example.pizzaria.repository.FormaPagamentoRepository;

@Controller
@RequestMapping("/forma_pagamento")
public class FormaPagamentoController {

    @Autowired
    private FormaPagamentoRepository formaPagamentoRepository;

//     @GetMapping("/listarFormasPagamento")
//     public ResponseEntity<List<String>> listarFormasPagamento() {
//     // Lógica para buscar os nomes dos ícones das formas de pagamento e retorná-los em uma lista
//     List<String> iconsList = new ArrayList<>();
//     iconsList.add("fa-cc-mastercard");
//     iconsList.add("fa-cc-visa");
//     // Adicione outros ícones conforme necessário

//     return ResponseEntity.ok(iconsList);
// }

@GetMapping("/listarPagamento")
    public ResponseEntity<List<FormaPagamento>> listarPagamento() {
        
        List<FormaPagamento> formaPagamento = formaPagamentoRepository.findAll();

        if (formaPagamento.isEmpty()) {
            return ResponseEntity.notFound().build();
        } 

        return ResponseEntity.ok(formaPagamento);

    }


}
