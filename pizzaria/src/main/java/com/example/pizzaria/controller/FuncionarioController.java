package com.example.pizzaria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.pizzaria.service.FuncionarioService;
import com.example.pizzaria.service.LoginService;

@RequestMapping("/funcionarios")
@Controller
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    @Autowired
    private LoginService loginService;

    @GetMapping("/login")
    public String showLoginPage() {
        return "login/index";
    }

    // @PostMapping("/registro-submit")
    // public String submitRegistroForm(@RequestParam("nome") String
    // nome,@RequestParam("sobrenome") String sobrenome, @RequestParam("telefone")
    // String telefone,
    // @RequestParam("email") String email, @RequestParam("senha") String senha) {
    // Login login = new Login();
    // login.setEmail(email);
    // login.setSenha(senha);
    // loginService.saveLogin(login);

    // Funcionario funcionario = new Funcionario();
    // funcionario.setNome(nome);
    // funcionario.setSobrenome(sobrenome);
    // funcionario.setTelefone(telefone);
    // funcionario.setEmail(email);
    // funcionario.setSenha(senha);
    // funcionario.setLogin(login);

    // funcionarioService.registrarFuncionario(funcionario);

    // return "home/index";
    // }

}
