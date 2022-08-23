package br.edu.utfpr.pb.projetotcc.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.utfpr.pb.projetotcc.model.Etapa;
import br.edu.utfpr.pb.projetotcc.service.CrudService;
import br.edu.utfpr.pb.projetotcc.service.EtapaService;
import io.swagger.annotations.Api;

@RestController
@RequestMapping("etapa")
@Api("Etapa")
public class EtapaController extends CrudController<Etapa, Long> {

	@Autowired
	private EtapaService etapaService;
	
	@Override
	@Valid
	protected CrudService<Etapa, Long> getService() {
		return etapaService;
	}


	@DeleteMapping("delete/{id}")
	public void deleteProjeto(@PathVariable Long id) throws Exception {

		etapaService.deleteEtapa(id);

	}
}

