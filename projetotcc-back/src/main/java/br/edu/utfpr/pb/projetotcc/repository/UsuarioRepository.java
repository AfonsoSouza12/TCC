package br.edu.utfpr.pb.projetotcc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.utfpr.pb.projetotcc.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

	Optional<Usuario> findByUsername(String username);
}
