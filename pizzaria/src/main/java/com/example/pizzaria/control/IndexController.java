package com.example.pizzaria.control;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller	
@RequestMapping("/api/v1")
public class IndexController {
	

	@GetMapping("/index")
	public String index() {
		return "index";
		}

	@GetMapping("/cliente")
	public String cliente(){
		return "cliente";
	}
	
}

