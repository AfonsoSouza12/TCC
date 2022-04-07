package br.edu.utfpr.pb.projetotcc.service.impl;

import br.edu.utfpr.pb.projetotcc.model.Solicitacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.edu.utfpr.pb.projetotcc.model.Solicitacao;
import br.edu.utfpr.pb.projetotcc.repository.SolicitacaoRepository;
import br.edu.utfpr.pb.projetotcc.service.SolicitacaoService;

import java.util.List;

@Service
public class SolicitacaoServiceImpl extends CrudServiceImpl<Solicitacao, Long> implements SolicitacaoService{

	@Autowired
	private SolicitacaoRepository solicitacaoRepository;
	
	@Override
	protected JpaRepository<Solicitacao, Long> getRepository() {
		return solicitacaoRepository;
	}

	@Override
	public List<Solicitacao> findAllByEtapaIdOrderByNome(Long etapaId) {
		return solicitacaoRepository.findByEtapaIdOrderByNome(etapaId);
	}

	@Override
	public List<Solicitacao> findByStatus(String status) {
		return solicitacaoRepository.findByStatus(status);
	}


}
