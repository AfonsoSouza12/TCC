package br.edu.utfpr.pb.projetotcc.service;

import br.edu.utfpr.pb.projetotcc.model.Projeto;
import br.edu.utfpr.pb.projetotcc.model.Solicitacao;
import br.edu.utfpr.pb.projetotcc.model.Sprint;
import br.edu.utfpr.pb.projetotcc.model.Usuario;

import java.util.List;

public interface SolicitacaoService extends CrudService<Solicitacao, Long>{
    List<Solicitacao> findAllByEtapaIdOrderByNome(Long etapaId);
    List<Solicitacao> findByStatus(String status);
    List<Solicitacao> findSolicitacaoByProjetoAndSprintAnAndResponsavel(Long projetoId, Long sprintId, Long responsavelId);
    List<Solicitacao> findAllByResponsavel(Long responsavelId);
    Boolean existeSolicitacaoComProjeto(Long projetoId);
}
