package br.edu.utfpr.pb.projetotcc.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.edu.utfpr.pb.projetotcc.model.SubEtapa;
import br.edu.utfpr.pb.projetotcc.repository.SubEtapaRepository;
import br.edu.utfpr.pb.projetotcc.service.SubEtapaService;

import java.util.List;

@Service
public class SubEtapaServiceImpl 
		extends CrudServiceImpl<SubEtapa, Long>
		implements SubEtapaService{

	@Autowired
	private SubEtapaRepository subEtapaRepository;
	
	@Override
	protected JpaRepository<SubEtapa, Long> getRepository() {
		return subEtapaRepository;
	}

	@Override
	public List<SubEtapa> findAllByEtapaIdOrderByNome(Long etapaId) {
		return subEtapaRepository.findByEtapaIdOrderByNome(etapaId);
	}
}
