package com.example.pizzaria.dto;

import com.example.pizzaria.model.Funcionario;

public class AutenticacaoDto {

    public Boolean autenticado;
    public String mensagem;
    public Funcionario funcionario;
    public TipoNotificacaoDto tipoNotificacaoDto;

    public AutenticacaoDto(String mensagem, TipoNotificacaoDto tipoNotificacaoDto) {
        this.autenticado = false;
        this.mensagem = mensagem;
        this.tipoNotificacaoDto = tipoNotificacaoDto;
    }

    public AutenticacaoDto(Funcionario funcionario) {
        this.autenticado = true;
        this.funcionario = funcionario;
        // this.mensagem = mensagem;
        // this.tipoNotificacaoDto = tipoNotificacaoDto;
        
        
    }

}
