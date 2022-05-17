package br.edu.utfpr.pb.projetotcc.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.utfpr.pb.projetotcc.model.Cargo;
import br.edu.utfpr.pb.projetotcc.service.CrudService;
import br.edu.utfpr.pb.projetotcc.service.CargoService;
import io.swagger.annotations.Api;

@RestController
@RequestMapping("cargo")
@Api("Cargo")
public class CargoController extends CrudController<Cargo, Long> {

	@Autowired
	private CargoService cargoService;
	
	@Override
	@Valid
	protected CrudService<Cargo, Long> getService() {
		return cargoService;
	}
	
}

