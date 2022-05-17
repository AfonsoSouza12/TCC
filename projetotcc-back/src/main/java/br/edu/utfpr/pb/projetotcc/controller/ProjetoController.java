package br.edu.utfpr.pb.projetotcc.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.utfpr.pb.projetotcc.model.Projeto;
import br.edu.utfpr.pb.projetotcc.service.CrudService;
import br.edu.utfpr.pb.projetotcc.service.ProjetoService;

@RestController
@RequestMapping("projeto")
public class ProjetoController extends CrudController<Projeto, Long>{

	@Autowired
	private ProjetoService projetoService;
	
	@Override
	@Valid
	protected CrudService<Projeto, Long> getService() {
		return projetoService;
	}

}
