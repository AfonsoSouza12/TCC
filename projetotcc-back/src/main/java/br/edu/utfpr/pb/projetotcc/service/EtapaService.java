package br.edu.utfpr.pb.projetotcc.service;

import br.edu.utfpr.pb.projetotcc.model.Etapa;

public interface EtapaService
			extends CrudService<Etapa, Long>{

	void deleteEtapa(Long etapaId) throws Exception;
}
