package com.example.pizzaria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.pizzaria.model.Servico;
import com.example.pizzaria.repository.ServicoRepository;
import com.example.pizzaria.service.ServicoService;

@Controller
@RequestMapping("/servicos")
public class ServicoController {

    @Autowired
    private ServicoRepository servicoRepository;

    private final ServicoService servicoService;

    public ServicoController(ServicoService servicoService) {
        this.servicoService = servicoService;
    }

    @GetMapping
    public String listarServicos(Model model) {
        model.addAttribute("servicos", servicoService.buscarTodos());
        model.addAttribute("novoServico", new Servico());
        return "servico/servico";
    }

    @PostMapping("/lista")
    public String lista(@RequestParam(name = "nome", required = false) String nome, Model model) {
        List<Servico> servicos;

        if (nome != null && !nome.isEmpty()) {
            servicos = servicoService.filtrarPorNome(nome);
        } else {
            servicos = servicoService.listarTodos();
        }

        model.addAttribute("servicos", servicos);
        return "servico/servico";
    }

    @PostMapping("/cadastrar")
    public String cadastrarServico(@ModelAttribute("novoServico") Servico servico, Model model) {
        servicoService.inserir(servico);
        model.addAttribute("comment", "Serviço cadastrado");
        return listarServicos(model);
    }

    @GetMapping("/{id}/editar")
    public String exibirFormularioEdicao(@PathVariable("id") Long id, Model model) {
        Servico servico = servicoService.buscarPorId(id);
        model.addAttribute("servico", servico);
        return "servico/editar";
    }

    @PostMapping("/{id}/salvar")
    public String salvarServicoEditado(@PathVariable("id") Long id, @ModelAttribute("servico") Servico servico,
            Model model) {
        servico.setId(id);
        servicoService.alterar(servico);
        model.addAttribute("comment", "Serviço Alterado com sucesso");
        return listarServicos(model);
    }

    @GetMapping("/{id}/excluir")
    public String excluirServico(@PathVariable("id") Long id, Model model) {
        servicoService.excluir(id);
        model.addAttribute("comment", "Serviço Removido com Sucesso");
        return listarServicos(model);
    }

    @GetMapping("/listarServicos")
    public ResponseEntity<List<Servico>> listarServicos() {
        
        List<Servico> servico = servicoRepository.findAll();

        if (servico.isEmpty()) {
            return ResponseEntity.notFound().build();
        } 

        return ResponseEntity.ok(servico);

    }

}
