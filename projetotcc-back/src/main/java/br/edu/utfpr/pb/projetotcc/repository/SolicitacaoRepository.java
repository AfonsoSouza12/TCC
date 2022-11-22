package br.edu.utfpr.pb.projetotcc.repository;

import br.edu.utfpr.pb.projetotcc.model.Projeto;
import br.edu.utfpr.pb.projetotcc.model.Sprint;
import br.edu.utfpr.pb.projetotcc.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.utfpr.pb.projetotcc.model.Solicitacao;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long>{
    List<Solicitacao> findByEtapaIdOrderByNome(Long etapaId);

    List<Solicitacao>findByStatus(String status);

    @Query("SELECT s FROM Solicitacao s WHERE (:projetoId is null or s.projeto.id = :projetoId) and (:sprintId is null"
            + " or s.sprint.id = :sprintId) and (:responsavelId is null or s.responsavel.id = :responsavelId)")
    List<Solicitacao> findSolicitacaoByProjetoAndSprintAnAndResponsavel(
            @Param("projetoId") Long projetoId,
            @Param("sprintId") Long sprintId,
            @Param("responsavelId") Long responsavelId);

    List<Solicitacao> findByResponsavelIdOrderByStatus(Long responsavelId);

    boolean existsByProjetoId(Long projetoId);

}


