package com.example.pizzaria.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RequestMapping("/funcionarios")
@Controller
public class FuncionarioController {


    @GetMapping("/login")
    public String showLoginPage() {
        return "login/index";
    }

   

}
