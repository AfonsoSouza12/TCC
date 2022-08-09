package br.edu.utfpr.pb.projetotcc.repository;

import br.edu.utfpr.pb.projetotcc.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SprintRepository extends JpaRepository<Sprint, Long>{

    boolean existsByProjetoId(Long projetoId);
}
