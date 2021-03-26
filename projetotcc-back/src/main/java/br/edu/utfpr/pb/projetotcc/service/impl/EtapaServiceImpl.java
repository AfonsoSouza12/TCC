package br.edu.utfpr.pb.projetotcc.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.edu.utfpr.pb.projetotcc.model.Etapa;
import br.edu.utfpr.pb.projetotcc.repository.EtapaRepository;
import br.edu.utfpr.pb.projetotcc.service.EtapaService;

@Service
public class EtapaServiceImpl 
		extends CrudServiceImpl<Etapa, Integer>
		implements EtapaService{

	@Autowired
	private EtapaRepository etapaRepository;
	
	@Override
	protected JpaRepository<Etapa, Integer> getRepository() {
		return etapaRepository;
	}

}
