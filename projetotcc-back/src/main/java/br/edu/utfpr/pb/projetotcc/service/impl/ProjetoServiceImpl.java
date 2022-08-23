package br.edu.utfpr.pb.projetotcc.service.impl;

import br.edu.utfpr.pb.projetotcc.model.Usuario;
import br.edu.utfpr.pb.projetotcc.service.SolicitacaoService;
import br.edu.utfpr.pb.projetotcc.service.SprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.edu.utfpr.pb.projetotcc.model.Projeto;
import br.edu.utfpr.pb.projetotcc.repository.ProjetoRepository;
import br.edu.utfpr.pb.projetotcc.service.ProjetoService;

import java.util.List;

@Service
public class ProjetoServiceImpl extends CrudServiceImpl<Projeto, Long>
        implements ProjetoService {

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private SprintService sprintService;

    @Autowired
    private SolicitacaoService solicitacaoService;


    @Override
    protected JpaRepository<Projeto, Long> getRepository() {
        return projetoRepository;
    }

    @Override
    public List<Projeto> findProjetoByMembrosId(Long membroId) {
        return this.projetoRepository.findProjetoByMembrosId(membroId);
    }

    public void deleteProjeto(Long projetoId) throws Exception {
        if (!this.sprintService.existeSprintComProjeto(projetoId)) {
            if(!this.solicitacaoService.existeSolicitacaoComProjeto(projetoId)){
                super.delete(projetoId);
            }else{
                throw new Exception("Esse registro possui uma Solicitação Vinculada a ele, delete a Solicitação para prosseguir.");
            }
            super.delete(projetoId);
        } else {
            throw new Exception("Esse registro possui uma Sprint Vinculada a ele, delete a Sprint para prosseguir.");
        }
    }
}
