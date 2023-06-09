package com.example.pizzaria.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    
    @Column (name = "nome", nullable = false)
    private String nome;

    @Column (name = "descricao" )
    private String descricao;

    @Column (name = "tamanho", nullable = false)
    private String tamanho;

    @Column(name = "preco", columnDefinition = "DECIMAL(8,2)")
    private double preco;

    @Column(name = "status" , nullable = false)
    private String status;
   
    
    @ManyToOne
    @JoinColumn(name = "categoria_produto_id", nullable = false)
    private CategoriaProduto categoriaProduto;
    
    
    // Getters e Setters
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    
    
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public String getTamanho() {
        return tamanho;
    }
    public void setTamanho(String tamanho) {
        this.tamanho = tamanho;
    }
    public double getPreco() {
        return preco;
    }
    public void setPreco(double preco) {
        this.preco = preco;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public CategoriaProduto getCategoriaProduto() {
        return categoriaProduto;
    }
    public void setCategoriaProduto(CategoriaProduto categoriaProduto) {
        this.categoriaProduto = categoriaProduto;
    }
}

