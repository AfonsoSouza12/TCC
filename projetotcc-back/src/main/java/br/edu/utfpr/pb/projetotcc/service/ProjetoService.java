package br.edu.utfpr.pb.projetotcc.service;

import br.edu.utfpr.pb.projetotcc.model.Projeto;

import java.util.List;

public interface ProjetoService extends CrudService<Projeto, Long>{

    List<Projeto> findProjetoByMembrosId(Long membroId);

    void deleteProjeto(Long projetoId) throws Exception;
}
