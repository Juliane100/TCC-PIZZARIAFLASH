package com.example.pizzaria.dto;

public class PedidoItemDto {

    private long id;

    private int quantidade;

    private double preco;

    private String tamanho;
    
    private long pedido_id;
    
    private long produto_id;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public String getTamanho() {
        return tamanho;
    }

    public void setTamanho(String tamanho) {
        this.tamanho = tamanho;
    }

    public long getPedido_id() {
        return pedido_id;
    }

    public void setPedido_id(long pedido_id) {
        this.pedido_id = pedido_id;
    }

    public long getProduto_id() {
        return produto_id;
    }

    public void setProduto_id(long produto_id) {
        this.produto_id = produto_id;
    }
}