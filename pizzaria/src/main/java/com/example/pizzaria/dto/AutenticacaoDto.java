package com.example.pizzaria.dto;

import com.example.pizzaria.model.Funcionario;
import com.example.pizzaria.model.Login;

public class AutenticacaoDto {

    public Boolean autenticado;
    public String mensagem;
    public Funcionario funcionario;
    public Login login;
    public TipoNotificacaoDto tipoNotificacaoDto;

    public AutenticacaoDto(String mensagem, TipoNotificacaoDto tipoNotificacaoDto) {
        this.autenticado = false;
        this.mensagem = mensagem;
        this.tipoNotificacaoDto = tipoNotificacaoDto;
    }

    public AutenticacaoDto(Funcionario funcionario) {
        this.autenticado = true;
        this.funcionario = funcionario;
    }

    public AutenticacaoDto(String mensagem, Login login) {
        this.autenticado = true;
        this.mensagem = mensagem;
        this.login = login;
    }

}
