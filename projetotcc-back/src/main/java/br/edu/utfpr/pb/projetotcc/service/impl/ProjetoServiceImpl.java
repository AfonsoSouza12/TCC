package br.edu.utfpr.pb.aula6.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.edu.utfpr.pb.aula6.model.Projeto;
import br.edu.utfpr.pb.aula6.repository.ProjetoRepository;
import br.edu.utfpr.pb.aula6.service.ProjetoService;

@Service
public class ProjetoServiceImpl extends CrudServiceImpl<Projeto, Integer> 
																implements ProjetoService{

	@Autowired
	private ProjetoRepository projetoRepository;
	
	@Override
	protected JpaRepository<Projeto, Integer> getRepository() {
		return projetoRepository;
	}
	
}
