package com.example.pizzaria.service;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pizzaria.model.Cupom;
import com.example.pizzaria.repository.CupomRepository;

@Service
public class CupomService {

    private final CupomRepository cupomRepository;

    @Autowired
    public CupomService(CupomRepository cupomRepository) {
        this.cupomRepository = cupomRepository;
    }

    public List<Cupom> buscarTodos() {
        return cupomRepository.findAll();
    }

    public List<Cupom> filtrarPorNumero(String numero) {
        return cupomRepository.findByNumeroContainingIgnoreCase(numero);
    }

    public List<Cupom> listarTodos() {
        return cupomRepository.findAll();
    }

    public Cupom buscarPorId(Long id) {
        return cupomRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cupom não encontrado"));
    }

    public Cupom inserir(Cupom cupom) {
        return cupomRepository.saveAndFlush(cupom);
    }

    public Cupom alterar(Cupom cupom) {
        return cupomRepository.saveAndFlush(cupom);
    }

    public void excluir(Long id) {
        Cupom cupom = cupomRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cupom não encontrado"));
        cupomRepository.delete(cupom);
    }

    public Cupom gerarNumeroAleatorio(Cupom cupom) {
        Random random = new Random();
        int numeroAleatorio = random.nextInt(10000);
        cupom.setNumero(String.valueOf(numeroAleatorio));
        return cupom;
    }

    public Cupom buscarCupomPorNumero(String numero) {
        return cupomRepository.findByNumero(numero);
    }

}
