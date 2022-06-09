package br.edu.utfpr.pb.projetotcc.repository;

import br.edu.utfpr.pb.projetotcc.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.utfpr.pb.projetotcc.model.Projeto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjetoRepository extends JpaRepository<Projeto, Long>{


    List<Projeto>findProjetoByMembrosId(Long membroId);

}
