package com.example.pizzaria.control;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller	
@RequestMapping("/api/v1")
public class IndexController {
	

	@GetMapping("/cliente")
	public String cliente() {
		return "cliente";
		}
	


	@GetMapping("/cupom")
	public String cupom() {
		return "cupom";
		}
	

	@GetMapping("/dashboard")
	public String dashboard() {
		return "dashboard";
		}
	

	@GetMapping("/fun")
	public String fun() {
		return "fun";
		}
	

	@GetMapping("/home")
	public String home() {
		return "home";
		}
	

	@GetMapping("/login")
	public String login() {
		return "login";
		}
	

	@GetMapping("/pagamento")
	public String pagamento() {
		return "pagamento";
		}
	

	@GetMapping("/pedido")
	public String pedido() {
		return "pedido";
		}
	
	

	@GetMapping("/produto")
	public String produto() {
		return "produto";
		}
	
	
	
	
	

}

