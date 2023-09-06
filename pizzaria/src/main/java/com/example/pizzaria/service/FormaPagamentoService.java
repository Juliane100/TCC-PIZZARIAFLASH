package com.example.pizzaria.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pizzaria.model.FormaPagamento;
import com.example.pizzaria.repository.FormaPagamentoRepository;

@Service
public class FormaPagamentoService {
    
    private final FormaPagamentoRepository formaPagamentoRepository;

    @Autowired
    public FormaPagamentoService(FormaPagamentoRepository formaPagamentoRepository) {
        this.formaPagamentoRepository = formaPagamentoRepository;
    }

    public List<FormaPagamento> listarTodasFormasPagamento() {
        return formaPagamentoRepository.findAll();
    }

    public FormaPagamento buscarPorId(Long id) {
        return formaPagamentoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Forma de pagamento não encontrada com ID: " + id));
    }


    public FormaPagamento salvarFormaPagamento(FormaPagamento formaPagamento) {
        return formaPagamentoRepository.save(formaPagamento);
    }

    public void deletarFormaPagamento(Long id) {
        formaPagamentoRepository.deleteById(id);
    } 
}
