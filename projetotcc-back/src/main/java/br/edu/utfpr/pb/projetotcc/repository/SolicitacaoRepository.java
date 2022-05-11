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

    @Query("SELECT s FROM Solicitacao s WHERE (:projeto is null or s.projeto = :projeto) and (:sprint is null"
            + " or s.sprint = :sprint) and (:responsavel is null or s.responsavel = :responsavel)")
    List<Solicitacao> findSolicitacaoByProjetoAndSprintAnAndResponsavel(
            @Param("projeto") Projeto projeto,
            @Param("sprint") Sprint sprint,
            @Param("responsavel") Usuario responsavel);


}
