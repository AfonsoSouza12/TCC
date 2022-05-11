package br.edu.utfpr.pb.projetotcc.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import br.edu.utfpr.pb.projetotcc.model.Projeto;
import br.edu.utfpr.pb.projetotcc.model.Sprint;
import br.edu.utfpr.pb.projetotcc.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

	@GetMapping("filtra-quadro/{projeto}-{sprint}-{responsavel}")
	public List<Solicitacao> findSolicitacaoByProjetoAndSprintAnAndResponsavel(
			@PathVariable("projeto") Projeto projeto, @PathVariable("projeto") Sprint sprint,
			@PathVariable("responsavel") Usuario responsavel) {
		return solicitacaoService.findSolicitacaoByProjetoAndSprintAnAndResponsavel(projeto,sprint,responsavel);
	}

}
