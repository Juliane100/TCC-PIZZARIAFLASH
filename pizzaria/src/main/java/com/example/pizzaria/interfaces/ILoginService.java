package com.example.pizzaria.interfaces;

import com.example.pizzaria.dto.AutenticacaoDto;
import com.example.pizzaria.model.Login;

public interface ILoginService {
    AutenticacaoDto authenticate(String email, String senha) ;
    Login register(String email, String senha) ;
    

}