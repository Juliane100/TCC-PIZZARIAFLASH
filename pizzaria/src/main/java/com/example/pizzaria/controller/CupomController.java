package com.example.pizzaria.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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

    @PostMapping("/lista")
    public String lista(@RequestParam(name = "numero", required = false) String numero, Model model) {
        List<Cupom> cupons;

        if (numero != null && !numero.isEmpty()) {
            cupons = cupomService.filtrarPorNumero(numero);
        } else {
            cupons = cupomService.listarTodos();
        }

        model.addAttribute("cupons", cupons);
        return "cupom/cupom";
    }

    @PostMapping("/cadastrar")
    public String cadastrarCupom(@ModelAttribute("novoCupom") Cupom cupom, Model model) {
        cupom = cupomService.gerarNumeroAleatorio(cupom);
        cupomService.inserir(cupom);
        model.addAttribute("mens", "Cupom cadastrado");
        return listarCupons(model);
    }

    @GetMapping("/{id}/visualizar")
    public String exibirFormulario(@PathVariable("id") Long id, Model model) {
        Cupom cupom = cupomService.buscarPorId(id);
        model.addAttribute("cupom", cupom);
        return "cupom/visualizar";

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

    @GetMapping("/verificarCupom/{numeroCupom}")
    public ResponseEntity<Cupom> verificarCupom(@PathVariable(name = "numeroCupom", required = false) String numeroCupom) {
        Cupom cupom = cupomService.buscarCupomPorNumero(numeroCupom);
        
        if (cupom != null) {
            return ResponseEntity.ok(cupom);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
