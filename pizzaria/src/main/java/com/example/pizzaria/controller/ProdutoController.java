package com.example.pizzaria.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.pizzaria.model.CategoriaProduto;
import com.example.pizzaria.model.Produto;
import com.example.pizzaria.service.CategoriaProdutoService;
import com.example.pizzaria.service.ProdutoService;

@Controller
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;
    private final CategoriaProdutoService categoriaProdutoService;

    public ProdutoController(ProdutoService produtoService, CategoriaProdutoService categoriaProdutoService) {
        this.produtoService = produtoService;
        this.categoriaProdutoService = categoriaProdutoService;

    }

    @ModelAttribute("categoriaProduto")
    public List<String> getCategoriaProduto() {
        return categoriaProdutoService.buscarCategoriasProdutos();
    }

    @GetMapping
    public String listarProdutos(Model model) {
        List<CategoriaProduto> categorias = categoriaProdutoService.buscarTodos();
        model.addAttribute("produtos", produtoService.buscarTodos());
        model.addAttribute("novoProduto", new Produto());
        model.addAttribute("categoriaProduto", categorias);

        return "produto/index";
    }

    @PostMapping("/cadastrar")
    public String cadastrarProduto(@ModelAttribute("novoProduto") Produto produto,
            @RequestParam("categoria") Long categoriaProdutoId, Model model) {
        CategoriaProduto categoriaProduto = categoriaProdutoService.buscarPorId(categoriaProdutoId);
        produto.setCategoriaProduto(categoriaProduto);
        produtoService.inserir(produto);
        model.addAttribute("categoriaProduto", categoriaProdutoService.buscarCategoriasProdutos());
        model.addAttribute("chat", "Produto Cadastrado");
        return listarProdutos(model);
    }

    @GetMapping("/{id}/editar")
    public String exibirFormularioEdicao(@PathVariable("id") Long id, Model model) {
        Produto produto = produtoService.buscarPorId(id);
        List<CategoriaProduto> categorias = categoriaProdutoService.buscarTodos();
        model.addAttribute("produto", produto);
        model.addAttribute("categorias", categorias);
        return "produto/editar";
    }

    @PostMapping("/{id}/salvar")
    public String salvarServicoEditado(@PathVariable("id") Long id, @ModelAttribute("produto") Produto produto,
            @RequestParam("categoriaProdutoId") Long categoriaProdutoId, Model model) {
        produto.setId(id);
        CategoriaProduto categoriaProduto = categoriaProdutoService.buscarPorId(categoriaProdutoId);
        produto.setCategoriaProduto(categoriaProduto);
        produtoService.alterar(produto);
        model.addAttribute("chat", "Produto Alterado com sucesso");
        return listarProdutos(model);
    }

    @GetMapping("/{id}/excluir")
    public String excluirProduto(@PathVariable("id") Long id, Model model) {
        produtoService.excluir(id);
        model.addAttribute("chat", "Produto Removido com Sucesso");
        return listarProdutos(model);
    }

}
