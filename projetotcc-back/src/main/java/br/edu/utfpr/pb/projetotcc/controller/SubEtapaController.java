package br.edu.utfpr.pb.projetotcc.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.edu.utfpr.pb.projetotcc.model.SubEtapa;
import br.edu.utfpr.pb.projetotcc.service.CrudService;
import br.edu.utfpr.pb.projetotcc.service.SubEtapaService;
import io.swagger.annotations.Api;

import java.util.List;

@RestController
@RequestMapping("subEtapa")
@Api("SubEtapa")
public class SubEtapaController extends CrudController<SubEtapa, Long> {

	@Autowired
	private SubEtapaService subEtapaService;
	
	@Override
	@Valid
	protected CrudService<SubEtapa, Long> getService() {
		return subEtapaService;
	}

	@GetMapping("etapa")
	public List<SubEtapa> findAllByEtapaIdOrderByNome(@RequestParam("etapa") Long etapaId) {
		return subEtapaService.findAllByEtapaIdOrderByNome(etapaId);
	}
}

