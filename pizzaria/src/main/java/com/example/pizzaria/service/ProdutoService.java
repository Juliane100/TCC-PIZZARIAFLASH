package com.example.pizzaria.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.pizzaria.model.Produto;
import com.example.pizzaria.repository.ProdutoRepository;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    @Autowired
    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    // public List<Produto> getProdutosCadastradosNosUltimosSeisMeses() {
    // LocalDate seisMesesAtras = LocalDate.now().minusMonths(6);
    // return
    // produtoRepository.findProdutosCadastradosNosUltimosSeisMeses(seisMesesAtras);
    // }

    public List<Produto> buscarTodos() {
        return produtoRepository.findAll();
    }

    public List<Produto> filtrarPorNome(String nome) {
        return produtoRepository.findByNomeContainingIgnoreCase(nome);
    }

    public Produto buscarPorId(long id) {
        return produtoRepository.findById(id).orElse(null);
    }

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado não encontrado"));
    }

    public Produto inserir(Produto produto) {
        return produtoRepository.saveAndFlush(produto);
    }

    // @Transactional
    public Produto inserirComImagem(MultipartFile file, Produto produto) {

        if (file != null && file.getSize() > 0) {
            try {
                produto.setImagem(file.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            produto.setImagem(null);
        }
        return produtoRepository.saveAndFlush(produto);
    }

    // @Transactional
    public void updateComImagem(MultipartFile file, Produto produto, byte[] foto) {

        if (file != null) {
            if (file.getSize() == 0 && foto.length == 0) {
                produto.setImagem(null);
            }

            if (file.getSize() == 0 && foto.length > 0) {
                produto.setImagem(foto);
            }
        }

        if (file != null && file.getSize() > 0) {
            try {
                produto.setImagem(file.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        produtoRepository.save(produto);
    }

    public Produto alterar(Produto produto) {
        return produtoRepository.saveAndFlush(produto);
    }

    public void atualizarProduto(Produto produto) {
        // Verifique se o produto existe no banco de dados
        if (produtoRepository.existsById(produto.getId())) {
            // Atualize o produto no banco de dados
            produtoRepository.save(produto);
        } else {
            throw new RuntimeException("Produto não encontrado com ID: " + produto.getId());
        }
    }

    public List<Produto> obterProdutos() {
        return produtoRepository.findAll();
    }

    public void excluir(Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));
        produtoRepository.delete(produto);
    }

}
