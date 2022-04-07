package br.edu.utfpr.pb.projetotcc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.utfpr.pb.projetotcc.model.Solicitacao;

import java.util.List;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long>{
    List<Solicitacao> findByEtapaIdOrderByNome(Long etapaId);

    List<Solicitacao>findByStatus(String status);
}
