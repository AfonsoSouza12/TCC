package br.edu.utfpr.pb.projetotcc.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.utfpr.pb.projetotcc.model.Etapa;
import br.edu.utfpr.pb.projetotcc.service.CrudService;
import br.edu.utfpr.pb.projetotcc.service.EtapaService;
import io.swagger.annotations.Api;

@RestController
@RequestMapping("etapa")
@Api("Etapa")
public class EtapaController extends CrudController<Etapa, Integer> {

	@Autowired
	private EtapaService etapaService;
	
	@Override
	@Valid
	protected CrudService<Etapa, Integer> getService() {
		return etapaService;
	}
	
}

