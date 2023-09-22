package com.example.pizzaria.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
// import java.util.Collections;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.pizzaria.dto.PedidoDto;
import com.example.pizzaria.dto.PedidoItemDto;
import com.example.pizzaria.model.Cliente;
import com.example.pizzaria.model.Cupom;
import com.example.pizzaria.model.FormaPagamento;
import com.example.pizzaria.model.Funcionario;
import com.example.pizzaria.model.Pedido;
import com.example.pizzaria.model.Pedido_item;
import com.example.pizzaria.model.Produto;
import com.example.pizzaria.model.Servico;
import com.example.pizzaria.repository.ClienteRepository;
import com.example.pizzaria.repository.CupomRepository;
import com.example.pizzaria.repository.FormaPagamentoRepository;
import com.example.pizzaria.repository.FuncionarioRepository;
import com.example.pizzaria.repository.PedidoRepository;
import com.example.pizzaria.repository.Pedido_ItemRepository;
import com.example.pizzaria.repository.ProdutoRepository;
import com.example.pizzaria.repository.ServicoRepository;
import com.example.pizzaria.service.ClienteService;
import com.example.pizzaria.service.CupomService;
import com.example.pizzaria.service.FormaPagamentoService;
import com.example.pizzaria.service.PedidoService;
import com.example.pizzaria.service.ServicoService;

@Controller
@RequestMapping("/pedido")
public class PedidoController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private CupomService cupomService;

    @Autowired
    private ServicoService servicoService;

    @Autowired
    private FormaPagamentoService formaPagamentoService;

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private Pedido_ItemRepository pedidoItemRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private CupomRepository cupomRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private FormaPagamentoRepository formaPagamentoRepository;

    private final ModelMapper modelMapper;

    public PedidoController() {
        modelMapper = new ModelMapper();
    }

    @GetMapping
    public String showPedidoPage(Model model) {
        model.addAttribute("cliente", new Cliente());
        return "pedido/index";
    }

    @PostMapping("/salvar")
    public ResponseEntity<?> criarPedido(@RequestBody PedidoDto pedidoDto) {
        try {
            // pedido.setStatus("preparando");

            var pedido = modelMapper.map(pedidoDto, Pedido.class);

            Cliente cliente = clienteRepository.findById(pedidoDto.getCliente_id()).orElse(null);
            Funcionario funcionario = funcionarioRepository.findById(pedidoDto.getFuncionario_id()).orElse(null);
            Cupom cupom = cupomRepository.findById(pedidoDto.getCupom_id()).orElse(null);
            Servico servico = servicoRepository.findById(pedidoDto.getServico_id()).orElse(null);
            FormaPagamento formaPagamento = formaPagamentoRepository.findById(pedidoDto.getForma_pagamento_id())
                    .orElse(null);

            pedido.setCliente(cliente);
            pedido.setFuncionario(funcionario);
            pedido.setCupom(cupom);
            pedido.setServico(servico);
            pedido.setForma_pagamento(formaPagamento);

            pedido.setData(LocalDateTime.now());
            ;

            Pedido pedidoCriado = pedidoRepository.save(pedido);

            pedido.setId(pedidoCriado.getId());

            // Adicione este log para verificar o ID do cliente
            System.out.println("Cliente ID recebido do JSON: " + pedido.getCliente().getId());

            return new ResponseEntity<>(pedido, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Erro de integridade de dados: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erro interno do servidor.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/salvar/itens")
    public ResponseEntity<?> criarItensDoPedido(@RequestBody List<PedidoItemDto> itemPedidoDto) {
        try {
            System.out.println("Recebendo itens do pedido para criação:");

            List<Pedido_item> pedidoItem = new ArrayList<>();
            ;

            for (PedidoItemDto item : itemPedidoDto) {
                // // Inicialize o objeto Pedido_item antes de acessar o ID
                Pedido_item novoItem = new Pedido_item();

                Produto produto = produtoRepository.findById(item.getProduto_id()).orElse(null);
                Pedido pedido = pedidoRepository.findById(item.getPedido_id()).orElse(null);

                novoItem.setProduto(produto);
                novoItem.setPedido(pedido);
                novoItem.setPreco(item.getPreco());
                novoItem.setQuantidade(item.getQuantidade());
                novoItem.setTamanho(item.getTamanho());

                pedidoItem.add(novoItem);
            }

            List<Pedido_item> itensCriados = pedidoItemRepository.saveAll(pedidoItem);

            if (!itensCriados.isEmpty()) {
                System.out.println("Itens do pedido criados com sucesso!");
                return new ResponseEntity<>("Itens do pedido criados com sucesso!", HttpStatus.CREATED);
            } else {
                System.out.println("Nenhum item do pedido foi criado.");
                return new ResponseEntity<>("Nenhum item do pedido foi criado.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.err.println("Erro ao criar os itens do pedido: " + e.getMessage());
            return new ResponseEntity<>("Erro ao criar os itens do pedido.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/listar")
    public String listarPedidos(Model model) {
        List<Pedido> pedidos = pedidoService.listarPedidos();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy | HH:mm:ss");

        List<String> formattedDates = new ArrayList<>();
        for (Pedido pedido : pedidos) {
            String formattedDate = pedido.getData().format(formatter);
            formattedDates.add(formattedDate);
        }

        // Ordenar a lista de pedidos em ordem decrescente
        // Collections.reverse(pedidos);

        model.addAttribute("formattedDates", formattedDates);
        model.addAttribute("pedidos", pedidos);
        return "pedido/realizado";
    }

    @GetMapping("/listar/{id}")
    public String verDetalhesDoPedido(@PathVariable Long id, Model model) {
        Pedido pedido = pedidoService.buscarPedidoPorId(id);
        List<Pedido_item> itensPedido = pedidoItemRepository.findByPedido(pedido);

        // Obtenha o PedidoDto associado ao pedido
        PedidoDto pedidoDto = modelMapper.map(pedido, PedidoDto.class);

        // Busque as informações relacionadas com base nos IDs do PedidoDto
        Cliente cliente = clienteService.buscarClientePorId(pedidoDto.getCliente_id());
        Cupom cupom = cupomService.buscarCupomPorId(pedidoDto.getCupom_id());
        FormaPagamento formaPagamento = formaPagamentoService
                .buscarFormaPagamentoPorId(pedidoDto.getForma_pagamento_id());
        Servico servico = servicoService.buscarServicoPorId(pedidoDto.getServico_id());

        // Obtenha a lista de datas formatadas da mesma forma que no controlador
        // listarPedidos
        List<String> formattedDates = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy | HH:mm:ss");
        formattedDates.add(pedido.getData().format(formatter));

        model.addAttribute("pedido", pedido);
        model.addAttribute("itensPedido", itensPedido);
        model.addAttribute("cliente", cliente);
        model.addAttribute("cupom", cupom);
        model.addAttribute("formaPagamento", formaPagamento);
        model.addAttribute("servico", servico);
        model.addAttribute("formattedDates", formattedDates);

        return "pedido/realizado";
    }

    @PostMapping("/{id}/editar-status")
    public String editarStatusDoPedido(@PathVariable Long id, @RequestParam String novoStatus) {
        Pedido pedido = pedidoService.buscarPedidoPorId(id);
        pedido.setStatus(novoStatus);
        pedidoService.salvarPedido(pedido);
        return "pedido/realizado" + id;
    }
}