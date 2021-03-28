package br.edu.utfpr.pb.projetotcc.controller;

import br.edu.utfpr.pb.projetotcc.model.Sprint;
import br.edu.utfpr.pb.projetotcc.service.CrudService;
import br.edu.utfpr.pb.projetotcc.service.SprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("sprint")
public class SprintController extends CrudController<Sprint, Long> {

	@Autowired
	private SprintService sprintService;
	
	@Override
	protected CrudService<Sprint, Long> getService() {
		return sprintService;
	}

}
