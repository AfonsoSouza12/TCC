package br.edu.utfpr.pb.projetotcc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.utfpr.pb.projetotcc.model.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

	Optional<Usuario> findByUsername(String username);

	@Query("select u from Usuario u join u.projetos p where p.id = :projetoId")
	List<Usuario> findAllByProjeto(@Param("projetoId") Long projetoId);
}
