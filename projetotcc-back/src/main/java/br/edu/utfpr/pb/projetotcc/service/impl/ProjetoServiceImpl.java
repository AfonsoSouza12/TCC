package br.edu.utfpr.pb.projetotcc.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.edu.utfpr.pb.projetotcc.model.Projeto;
import br.edu.utfpr.pb.projetotcc.repository.ProjetoRepository;
import br.edu.utfpr.pb.projetotcc.service.ProjetoService;

@Service
public class ProjetoServiceImpl extends CrudServiceImpl<Projeto, Long>
																implements ProjetoService{

	@Autowired
	private ProjetoRepository projetoRepository;
	
	@Override
	protected JpaRepository<Projeto, Long> getRepository() {
		return projetoRepository;
	}
	
}
