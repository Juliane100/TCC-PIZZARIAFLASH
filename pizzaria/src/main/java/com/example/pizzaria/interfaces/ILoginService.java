package com.example.pizzaria.interfaces;

import com.example.pizzaria.dto.AutenticacaoDto;

public interface ILoginService {
    AutenticacaoDto authenticate(String email, String senha) ;
    AutenticacaoDto register(String email, String senha) ;
}