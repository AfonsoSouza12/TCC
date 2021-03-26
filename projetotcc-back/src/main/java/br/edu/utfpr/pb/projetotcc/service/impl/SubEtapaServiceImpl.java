package br.edu.utfpr.pb.projetotcc.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.edu.utfpr.pb.projetotcc.model.SubEtapa;
import br.edu.utfpr.pb.projetotcc.repository.SubEtapaRepository;
import br.edu.utfpr.pb.projetotcc.service.SubEtapaService;

@Service
public class SubEtapaServiceImpl 
		extends CrudServiceImpl<SubEtapa, Integer>
		implements SubEtapaService{

	@Autowired
	private SubEtapaRepository subEtapaRepository;
	
	@Override
	protected JpaRepository<SubEtapa, Integer> getRepository() {
		return subEtapaRepository;
	}

}
