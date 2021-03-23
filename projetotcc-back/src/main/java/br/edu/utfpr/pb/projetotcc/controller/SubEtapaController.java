package br.edu.utfpr.pb.projetotcc.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.utfpr.pb.projetotcc.model.SubEtapa;
import br.edu.utfpr.pb.projetotcc.service.CrudService;
import br.edu.utfpr.pb.projetotcc.service.SubEtapaService;
import io.swagger.annotations.Api;

@RestController
@RequestMapping("subEtapa")
@Api("SubEtapa")
public class SubEtapaController extends CrudController<SubEtapa, Integer> {

	@Autowired
	private SubEtapaService subEtapaService;
	
	@Override
	@Valid
	protected CrudService<SubEtapa, Integer> getService() {
		return subEtapaService;
	}
	
}

