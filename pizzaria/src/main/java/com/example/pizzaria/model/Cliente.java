package com.example.pizzaria.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column (name = "nome", nullable = false)
    private String nome;

    @Column (name = "telefone", nullable = false)
    private String telefone;

    @Column (name = "email", nullable = false)
    private String email;

    @Column (name = "data_nasc")
    private LocalDate data_nasc;

    @Column (name = "cep", nullable = false)
    private String cep;

    @Column (name = "logradouro", nullable = false)
    private String logradouro;

    @Column (name = "cidade", nullable = false)
    private String cidade;

    @Column (name = "bairro", nullable = false)
    private String bairro;

    @Column (name = "numresid", nullable = false)
    private int numresid;

    @Column (name = "complemento", nullable = false)
    private String complemento;

    @Column (name = "status", nullable = false)
    private String status;

    @OneToOne
    @JoinColumn(name = "login_id", unique = true, nullable = false)
    private Login login;

   
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

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getData_nasc() {
        return data_nasc;
    }

    public void setData_nasc(LocalDate data_nasc) {
        this.data_nasc = data_nasc;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }


    public int getNum_resid() {
        return numresid;
    }

    public void setNum_resid(int num_resid) {
        this.numresid = num_resid;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    
    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

    
}
