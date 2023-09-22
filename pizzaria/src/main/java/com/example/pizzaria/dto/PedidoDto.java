package com.example.pizzaria.dto;

public class PedidoDto {
        
    private long id;

    private double total;

    private String status;

    private String descricao;

    private long cliente_id;

    private long funcionario_id;

    private long servico_id;

    private long cupom_id;
    
    private long forma_pagamento_id;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public long getCliente_id() {
        return cliente_id;
    }

    public void setCliente_id(long cliente_id) {
        this.cliente_id = cliente_id;
    }

    public long getFuncionario_id() {
        return funcionario_id;
    }

    public void setFuncionario_id(long funcionario_id) {
        this.funcionario_id = funcionario_id;
    }

    public long getServico_id() {
        return servico_id;
    }

    public void setServico_id(long servico_id) {
        this.servico_id = servico_id;
    }

    public long getCupom_id() {
        return cupom_id;
    }

    public void setCupom_id(long cupom_id) {
        this.cupom_id = cupom_id;
    }

    public long getForma_pagamento_id() {
        return forma_pagamento_id;
    }

    public void setForma_pagamento_id(long forma_pagamento_id) {
        this.forma_pagamento_id = forma_pagamento_id;
    }

}
