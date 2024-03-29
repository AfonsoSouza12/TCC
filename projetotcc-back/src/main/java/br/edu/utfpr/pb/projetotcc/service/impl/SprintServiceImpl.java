package br.edu.utfpr.pb.projetotcc.service.impl;

import br.edu.utfpr.pb.projetotcc.model.Sprint;
import br.edu.utfpr.pb.projetotcc.repository.SprintRepository;
import br.edu.utfpr.pb.projetotcc.service.SprintService;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class SprintServiceImpl extends CrudServiceImpl<Sprint, Long> implements SprintService{

	@Autowired
	private SprintRepository sprintRepository;
	
	@Override
	protected JpaRepository<Sprint, Long> getRepository() {
		return sprintRepository;
	}


	@Override
	public Boolean existeSprintComProjeto(Long projetoId) {
		var exists = sprintRepository.existsByProjetoId(projetoId);

		if(!exists){
			return false;
		}

		return true;
	}

}
