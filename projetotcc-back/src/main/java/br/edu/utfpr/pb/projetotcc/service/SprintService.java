package br.edu.utfpr.pb.projetotcc.service;

import br.edu.utfpr.pb.projetotcc.model.Sprint;

public interface SprintService extends CrudService<Sprint, Long>{

    Boolean existeSprintComProjeto(Long projetoId);
}
