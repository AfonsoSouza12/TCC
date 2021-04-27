package br.edu.utfpr.pb.projetotcc.service;

import br.edu.utfpr.pb.projetotcc.model.SubEtapa;

import java.util.List;

public interface SubEtapaService extends CrudService<SubEtapa, Long>{
	List<SubEtapa> findAllByEtapaIdOrderByNome(Integer etapaId);
}
