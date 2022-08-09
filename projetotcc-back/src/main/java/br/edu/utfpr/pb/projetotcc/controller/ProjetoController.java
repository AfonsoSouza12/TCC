package br.edu.utfpr.pb.projetotcc.controller;

import javax.validation.Valid;

import br.edu.utfpr.pb.projetotcc.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import br.edu.utfpr.pb.projetotcc.model.Projeto;
import br.edu.utfpr.pb.projetotcc.service.CrudService;
import br.edu.utfpr.pb.projetotcc.service.ProjetoService;

import java.util.List;

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

	@GetMapping("projetosMembro/{membroId}")
	public List<Projeto> findAllByProjeto(@PathVariable("membroId") Long projetoId){
		return this.projetoService.findProjetoByMembrosId(projetoId);
	}

	@Override
	@DeleteMapping("{id}")
	public void delete(@PathVariable Long id)  {

		projetoService.delete(id);

	}

}
