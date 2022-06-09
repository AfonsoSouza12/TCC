package br.edu.utfpr.pb.projetotcc.service;

import br.edu.utfpr.pb.projetotcc.model.Usuario;

import java.util.List;

public interface UsuarioService extends CrudService<Usuario, Long>{

    List<Usuario> findUsuarioByProjetosId(Long projetoId);
}
