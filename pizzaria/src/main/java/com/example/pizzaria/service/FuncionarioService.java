package com.example.pizzaria.service;

import com.example.pizzaria.model.Funcionario;
import com.example.pizzaria.repository.FuncionarioRepository;
import org.springframework.stereotype.Service;

@Service
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;

    public FuncionarioService(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    public void register(Funcionario funcionario) {
        funcionario.setStatus(true);
        funcionarioRepository.save(funcionario);

    }

}
