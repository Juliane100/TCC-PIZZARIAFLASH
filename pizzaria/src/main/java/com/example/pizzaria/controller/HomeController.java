package com.example.pizzaria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/home")
public class HomeController {

    // private final ModelMapper modelMapper;

    @Autowired
    public HomeController() {
        // this.modelMapper = new ModelMapper();
    }

    @GetMapping
    public String showHomePage() {
        return "home/index";
    }
}