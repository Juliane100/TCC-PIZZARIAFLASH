package com.example.pizzaria.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public class LoginDto {

    @NotEmpty(message = "Insira o seu email")
    @Email(message ="Insira o email valido")
    private String email;

    @NotEmpty(message = "Insira sua senha")
    private String senha;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
