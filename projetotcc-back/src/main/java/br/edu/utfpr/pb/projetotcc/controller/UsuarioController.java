package br.edu.utfpr.pb.projetotcc.controller;

import br.edu.utfpr.pb.projetotcc.model.Usuario;
import br.edu.utfpr.pb.projetotcc.service.CrudService;
import br.edu.utfpr.pb.projetotcc.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("usuario")
public class UsuarioController extends CrudController<Usuario, Long>{

	@Autowired
	private UsuarioService usuarioService;

	@Override
	protected CrudService<Usuario, Long> getService() {
		return usuarioService;
	}

}
