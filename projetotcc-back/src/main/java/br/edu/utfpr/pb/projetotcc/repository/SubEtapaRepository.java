package br.edu.utfpr.pb.projetotcc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.utfpr.pb.projetotcc.model.SubEtapa;

import java.util.List;

public interface SubEtapaRepository	extends JpaRepository<SubEtapa, Long>{
	List<SubEtapa> findByEtapaIdOrderByNome(Long etapaId);
	boolean existsByEtapaId(Long etapaId);
}
