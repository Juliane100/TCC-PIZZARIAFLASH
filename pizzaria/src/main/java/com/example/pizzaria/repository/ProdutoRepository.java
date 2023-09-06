package com.example.pizzaria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.pizzaria.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
        List<Produto> findByNomeContainingIgnoreCase(String nome);

        // List<Produto> findProdutosCadastradosNosUltimosSeisMeses(LocalDate dataLimite);

}
