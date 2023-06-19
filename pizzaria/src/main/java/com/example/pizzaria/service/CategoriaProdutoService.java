package com.example.pizzaria.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.pizzaria.model.CategoriaProduto;
import com.example.pizzaria.repository.CategoriaProdutoRepository;

@Service
public class CategoriaProdutoService {

    private final CategoriaProdutoRepository categoriaProdutoRepository;

    public CategoriaProdutoService(CategoriaProdutoRepository categoriaProdutoRepository) {
        this.categoriaProdutoRepository = categoriaProdutoRepository;
    }

    public List<CategoriaProduto> buscarTodos() {
        return categoriaProdutoRepository.findAll();
    }

    public List<String> buscarCategoriasProdutos() {
        List<CategoriaProduto> categorias = categoriaProdutoRepository.findAll();
        List<String> nomesCategorias = categorias.stream()
                .map(CategoriaProduto::getNome)
                .collect(Collectors.toList());

        return nomesCategorias;
    }

    public CategoriaProduto buscarPorId(Long idCategoria) {
        return categoriaProdutoRepository.findById(idCategoria)
                .orElseThrow(() -> new IllegalArgumentException("Categoria de produto não encontrada"));
    }

}
