package com.example.pizzaria.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.List;

import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.example.pizzaria.model.CategoriaProduto;
import com.example.pizzaria.model.Produto;
import com.example.pizzaria.service.CategoriaProdutoService;
import com.example.pizzaria.service.ProdutoService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;
    private final CategoriaProdutoService categoriaProdutoService;
    private String serverMessage = null;
    private String foto = "";
    private String noImage = "/assets/no-pizza-image.png";

    public ProdutoController(ProdutoService produtoService, CategoriaProdutoService categoriaProdutoService,
            ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
        this.produtoService = produtoService;
        this.categoriaProdutoService = categoriaProdutoService;
        this.serverMessage = null;
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
        model.addAttribute("serverMessage", serverMessage);
        model.addAttribute("noImage", noImage);

        return "produto/index";
    }

    private final ResourceLoader resourceLoader;

    @GetMapping("/listarProdutos")
    public ResponseEntity<List<Produto>> listarProdutos() {
        List<Produto> produtos = produtoService.buscarTodos();
        return ResponseEntity.status(HttpStatus.OK)
                .body(produtos);
    }

    @GetMapping("/file")
    public ResponseEntity<String> getFileContent() throws IOException {
        List<CategoriaProduto> categorias = categoriaProdutoService.buscarTodos();
        Resource resource = resourceLoader.getResource("classpath:static/assets/pizza.json");

        try (InputStream inputStream = resource.getInputStream()) {
            byte[] bytes = new byte[inputStream.available()];
            inputStream.read(bytes);
            String content = new String(bytes);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(content);
        } catch (IOException e) {
            // Lidar com exceções, se necessário
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao ler o arquivo.");
        }
    }

    @PostMapping("/cadastrar")
    public String cadastrarProduto(@RequestParam(value = "file", required = false) MultipartFile file,
            @ModelAttribute("novoProduto") Produto produto,
            @RequestParam("categoria") Long categoriaProdutoId, Model model) {

        CategoriaProduto categoriaProduto = categoriaProdutoService.buscarPorId(categoriaProdutoId);
        produto.setCategoriaProduto(categoriaProduto);
        produtoService.inserirComImagem(file, produto);
        model.addAttribute("categoriaProduto", categoriaProdutoService.buscarCategoriasProdutos());
        serverMessage = "Produto Cadastrado";
        return listarProdutos(model);
    }

    @GetMapping("/{id}/visualizar")
    public String exibirFormulario(@PathVariable("id") Long id, Model model) {
        Produto produto = produtoService.buscarPorId(id);
        model.addAttribute("produto", produto);
        return "produto/visualizar";

    }

    @GetMapping("/{id}/editar")
    public String exibirFormularioEdicao(@PathVariable("id") Long id, Model model) {
        Produto produto = produtoService.buscarPorId(id);

        if (produto.getImagem() != null) {
            if (produto.getImagem().length > 0) {
                foto = Base64.getEncoder().encodeToString(produto.getImagem());
            }
        }

        model.addAttribute("produto", produto);
        model.addAttribute("categorias", categoriaProdutoService.buscarTodos());
        model.addAttribute("noImage", noImage);
        model.addAttribute("serverMessage", serverMessage);

        return "produto/editar";
    }

    @PostMapping("/{id}/salvar")
    public String salvarProdutoEditado(@RequestParam(value = "file", required = false) MultipartFile file,
            @PathVariable("id") Long id, @ModelAttribute("produto") Produto produto,
            @RequestParam("categoriaProdutoId") Long categoriaProdutoId, Model model) {
        produto.setId(id);
        CategoriaProduto categoriaProduto = categoriaProdutoService.buscarPorId(categoriaProdutoId);
        produto.setCategoriaProduto(categoriaProduto);

        byte [] _foto = Base64.getDecoder().decode(foto);

        produtoService.updateComImagem(file, produto, _foto);
        serverMessage = "Produto Alterado com sucesso";

        return listarProdutos(model);
    }

    @GetMapping("/{id}/excluir")
    public String excluirProduto(@PathVariable("id") Long id, Model model) {
        produtoService.excluir(id);
        serverMessage = "Produto Removido com Sucesso";
        return listarProdutos(model);
    }

    @GetMapping("/showImage/{id}")
    @ResponseBody
    public void showImage(
			@PathVariable("id") long id, 
            HttpServletResponse response,
            @ModelAttribute("produto") Produto produto)
			throws ServletException, IOException {

		produto = produtoService.buscarPorId(id);

		response.setContentType("image/jpeg, image/jpg, image/png, image/gif");
		if (produto.getImagem() != null) {
			response.getOutputStream().write(produto.getImagem());
		} else {
			response.getOutputStream().write(null);
		}

		response.getOutputStream().close();
	}

    @PostMapping("/filtro")
    public String lista(@RequestParam(name = "nome", required = false) String nome, Model model) {
        List<Produto> produtos;

        if (nome != null && !nome.isEmpty()) {
            produtos = produtoService.filtrarPorNome(nome);
        } else {
            produtos = produtoService.listarTodos();
        }

        model.addAttribute("produtos", produtos);
        return listarProdutos(model);
    }
}
