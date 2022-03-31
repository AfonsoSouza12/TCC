package br.edu.utfpr.pb.projetotcc.service;

import br.edu.utfpr.pb.projetotcc.model.Solicitacao;

import java.util.List;

public interface SolicitacaoService extends CrudService<Solicitacao, Long>{
    List<Solicitacao> findAllByEtapaIdOrderByNome(Long etapaId);
}
