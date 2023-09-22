package com.example.pizzaria.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.pizzaria.model.Servico;
import com.example.pizzaria.repository.ServicoRepository;

@Service
public class ServicoService {

    private final ServicoRepository servicoRepository;

    @Autowired
    public ServicoService(ServicoRepository servicoRepository) {
        this.servicoRepository = servicoRepository;
    }

    public List<Servico> buscarTodos() {
        return servicoRepository.findAll();
    }

    public List<Servico> filtrarPorNome(String nome) {
        return servicoRepository.findByNomeContainingIgnoreCase(nome);
    }

    public List<Servico> listarTodos() {
        return servicoRepository.findAll();
    }

    public Servico buscarPorId(Long id) {
        return servicoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Serviço não encontrado"));
    }

    public Servico inserir(Servico servico) {
        return servicoRepository.saveAndFlush(servico);
    }

    public Servico alterar(Servico servico) {
        return servicoRepository.saveAndFlush(servico);
    }

    public void excluir(Long id) {
        Servico servico = servicoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Serviço não encontrado"));
        servicoRepository.delete(servico);
    }

    public Servico buscarServicoPorId(Long id) {
        Optional<Servico> servicoOptional = servicoRepository.findById(id);
        return servicoOptional.orElse(null);
    }

}
