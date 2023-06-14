package com.example.pizzaria.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.pizzaria.model.Cliente;
import com.example.pizzaria.service.ClienteService;


@Controller
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public String listarClientes(Model model) {
        model.addAttribute("clientes", clienteService.buscarTodos());
        model.addAttribute("novoCliente", new Cliente());
        return "cliente/cliente";
    }

    @GetMapping("/lista")
    public String lista() {
        return "cliente/lista";
    }

    @PostMapping("/cadastrar")
    public String cadastrarCliente(@ModelAttribute("novoCliente") Cliente cliente, Model model) {
        clienteService.inserir(cliente);
        model.addAttribute("msg", "Cliente Cadastrado");
        return listarClientes(model);
    }

    @GetMapping("/{id}/editar")
    public String exibirEdicao(@PathVariable("id") Long id, Model model) {
        Cliente cliente = clienteService.buscarporId(id);
        model.addAttribute("cliente", cliente);
        return "cliente/editar";
    }

    @PostMapping("/{id}/salvar")
    public String salvarClienteEditado(@PathVariable("id") Long id, @ModelAttribute("cliente") Cliente cliente,
            Model model) {
        cliente.setId(id);
        clienteService.alterar(cliente);
        model.addAttribute("msg", "Cliente Alterado com sucesso");
        return listarClientes(model);
    }

    @GetMapping("/{id}/excluir")
    public String excluirCliente(@PathVariable("id") Long id, Model model) {
        clienteService.excluir(id);
        model.addAttribute("msg", "Cliente Removido com Sucesso");
        return listarClientes(model);
    }
}
