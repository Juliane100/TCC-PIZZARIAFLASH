package com.example.pizzaria.service;

import org.springframework.stereotype.Service;

import com.example.pizzaria.dto.AutenticacaoDto;
import com.example.pizzaria.dto.TipoNotificacaoDto;
import com.example.pizzaria.interfaces.ILoginService;
import com.example.pizzaria.model.Funcionario;
import com.example.pizzaria.model.Login;
import com.example.pizzaria.repository.FuncionarioRepository;
import com.example.pizzaria.repository.LoginRepository;

@Service
public class LoginService implements ILoginService {

    private final FuncionarioRepository funcionarioRepository;
    private final LoginRepository loginRepository;

    public LoginService(FuncionarioRepository funcionarioRepository, LoginRepository loginRepository) {
        this.funcionarioRepository = funcionarioRepository;
        this.loginRepository = loginRepository;
    }

    public AutenticacaoDto authenticate(String email, String senha) {

        if (!loginRepository.existsByEmail(email))
            return new AutenticacaoDto("O usuario não foi encontrado!", TipoNotificacaoDto.falha);

        Login login = loginRepository.findByEmail(email);

        if (!login.getSenha().equals(senha))
            return new AutenticacaoDto("Senha Invalida!", TipoNotificacaoDto.informacao);

        Funcionario funcionario = funcionarioRepository.findByLogin(login);

        return new AutenticacaoDto(funcionario);

    }

    public Login register(String email, String senha) {

        if (loginRepository.existsByEmail(email)) {
             return null;
            //  return new AuthenticacaoDto("Alguém já possui esse email", TipoNotificacaoDto.falha); 
        }

        Login login = new Login();
        login.setEmail(email);
        login.setSenha(senha);
        login.setStatus(true);

        return loginRepository.save(login);

    }

}