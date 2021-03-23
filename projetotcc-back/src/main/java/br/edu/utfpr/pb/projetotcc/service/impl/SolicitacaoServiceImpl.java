package br.edu.utfpr.pb.aula6.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.edu.utfpr.pb.aula6.model.Solicitacao;
import br.edu.utfpr.pb.aula6.repository.SolicitacaoRepository;
import br.edu.utfpr.pb.aula6.service.SolicitacaoService;

@Service
public class SolicitacaoServiceImpl extends CrudServiceImpl<Solicitacao, Long> implements SolicitacaoService{

	@Autowired
	private SolicitacaoRepository solicitacaoRepository;
	
	@Override
	protected JpaRepository<Solicitacao, Long> getRepository() {
		return solicitacaoRepository;
	}

}
