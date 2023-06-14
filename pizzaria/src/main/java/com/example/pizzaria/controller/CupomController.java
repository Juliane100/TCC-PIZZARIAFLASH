package com.example.pizzaria.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.pizzaria.model.Cupom;
import com.example.pizzaria.service.CupomService;

@Controller
@RequestMapping("/cupons")
public class CupomController {

     private final CupomService cupomService;

    public CupomController(CupomService cupomService) {
        this.cupomService = cupomService;
    }

    @GetMapping
    public String listarCupons(Model model) {
        model.addAttribute("cupons", cupomService.buscarTodos());
        model.addAttribute("novoCupom", new Cupom());
        return "cupom/cupom";
    }

    @PostMapping("/cadastrar")
    public String cadastrarCupom(@ModelAttribute("novoCupom") Cupom cupom, Model model) {
        cupom = cupomService.gerarNumeroAleatorio(cupom);
        cupomService.inserir(cupom);
        model.addAttribute("mens", "Cupom cadastrado");
        return listarCupons(model);
    }

    @GetMapping("/{id}/editar")
    public String exibirFormularioEdicao(@PathVariable("id") Long id, Model model) {
        Cupom cupom = cupomService.buscarPorId(id);
        model.addAttribute("cupom", cupom);
        return "cupom/editar";
    }

    @PostMapping("/{id}/salvar")
    public String salvarCupomEditado(@PathVariable("id") Long id, @ModelAttribute("cupom") Cupom cupom,
            Model model) {
        cupom.setId(id);
        cupomService.alterar(cupom);
        model.addAttribute("mens", "Cupom Alterado com sucesso");
        return listarCupons(model);
    }

    @GetMapping("/{id}/excluir")
    public String excluirCupom(@PathVariable("id") Long id, Model model) {
        cupomService.excluir(id);
        model.addAttribute("mens", "Cupom Removido com Sucesso");
        return listarCupons(model);
    }
    
}
