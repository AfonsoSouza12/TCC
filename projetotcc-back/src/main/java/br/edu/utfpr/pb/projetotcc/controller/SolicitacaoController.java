package br.edu.utfpr.pb.projetotcc.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import br.edu.utfpr.pb.projetotcc.model.Projeto;
import br.edu.utfpr.pb.projetotcc.model.Sprint;
import br.edu.utfpr.pb.projetotcc.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import br.edu.utfpr.pb.projetotcc.model.Solicitacao;
import br.edu.utfpr.pb.projetotcc.service.CrudService;
import br.edu.utfpr.pb.projetotcc.service.SolicitacaoService;

@RestController
@RequestMapping("solicitacao")
public class SolicitacaoController extends CrudController<Solicitacao, Long> {

	@Autowired
	private SolicitacaoService solicitacaoService;

	@Override
	@Valid
	protected CrudService<Solicitacao, Long> getService() {
		return solicitacaoService;
	}

	@GetMapping("etapa")
	public List<Solicitacao> findAllByEtapaIdOrderByNome(@RequestParam("etapa") Long etapaId) {
		return solicitacaoService.findAllByEtapaIdOrderByNome(etapaId);
	}
	@GetMapping("busca-status/{status}")
	public List<Solicitacao> findAllByStatus(@PathVariable("status") String status) {
		return solicitacaoService.findByStatus(status);
	}

//	@GetMapping("filtra-quadro/projetoId={projetoId}&sprintId={sprintId}&responsavelId={responsavelId}")
//	public List<Solicitacao> findSolicitacaoByProjetoAndSprintAnAndResponsavel(
//			@PathVariable("projetoId") Long projetoId, @PathVariable("sprintId") Long sprintId,
//			@PathVariable("responsavelId") Long responsavelId) {
//
//		System.out.println(projetoId  +"-" + sprintId + " - "+ responsavelId);
//		return solicitacaoService.findSolicitacaoByProjetoAndSprintAnAndResponsavel(projetoId,sprintId,responsavelId);
//	}

	@GetMapping("filtra-quadro")
	public List<Solicitacao> findSolicitacaoByProjetoAndSprintAnAndResponsavel(
									@RequestParam(required = false) Long projetoId,
						  			@RequestParam(required = false) Long sprintId,
									@RequestParam(required = false) Long responsavelId){

			return (solicitacaoService.findSolicitacaoByProjetoAndSprintAnAndResponsavel(projetoId,sprintId,responsavelId));
	}

}
