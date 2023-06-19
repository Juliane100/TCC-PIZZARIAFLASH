package com.example.pizzaria.controller;

import com.example.pizzaria.dto.AutenticacaoDto;
import com.example.pizzaria.dto.LoginDto;
import com.example.pizzaria.dto.NotificadorDto;
import com.example.pizzaria.dto.RegistroDto;
import com.example.pizzaria.model.Funcionario;
import com.example.pizzaria.model.Login;
import com.example.pizzaria.service.FuncionarioService;
import com.example.pizzaria.service.LoginService;

import jakarta.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;
    private final ModelMapper modelMapper;
    private final FuncionarioService funcionarioService;

    @Autowired
    public LoginController(LoginService loginService, FuncionarioService funcionarioService) {
        this.loginService = loginService;
        this.modelMapper = new ModelMapper();
        this.funcionarioService = funcionarioService;
    }

    @GetMapping
    public String showLoginPage(Model model) {
        model.addAttribute("loginDto", new LoginDto());

        return "login/index";
    }

    @PostMapping
    public String logarSubmit(@Valid LoginDto loginDto, BindingResult result, Model model) {

        if (result.hasErrors())
            return "login/index";

        AutenticacaoDto autenticacaoDto = loginService.authenticate(loginDto.getEmail(), loginDto.getSenha());

        if (!autenticacaoDto.autenticado) {
            var notificacaoDto = new NotificadorDto(autenticacaoDto.tipoNotificacaoDto, autenticacaoDto.mensagem);
            model.addAttribute("notificacaoDto", notificacaoDto);
            return "login/index";
        }

        model.addAttribute("funcionario", autenticacaoDto.funcionario);
        return "home/index";
    }

    @GetMapping("/register")
    public String registrarForm(Model model) {
        model.addAttribute("registroDto", new RegistroDto());
        return "login/register";
    }

    @PostMapping("/register")
    public String registrarSubmit(@ModelAttribute RegistroDto registroDto, Model model) {

        var mapperLogin = modelMapper.map(registroDto, Login.class);
        var login = loginService.register(mapperLogin.getEmail(), mapperLogin.getSenha());

        var mapperFuncionario = modelMapper.map(registroDto, Funcionario.class);
        mapperFuncionario.setLogin(login);
        funcionarioService.register(mapperFuncionario);
        

        return showLoginPage(model);

    }
}
