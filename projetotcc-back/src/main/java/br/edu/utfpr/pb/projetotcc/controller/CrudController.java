package br.edu.utfpr.pb.projetotcc.controller;

import java.io.Serializable;
import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import br.edu.utfpr.pb.projetotcc.service.CrudService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

public abstract class CrudController <T, ID extends Serializable>{
	
	protected abstract CrudService<T, ID> getService();

	
	@ApiOperation(value = "Retorna uma lista de objetos.")
	@ApiResponses( value = {
			@ApiResponse(code = 200, message = "Lista retornada com sucesso!"),
			@ApiResponse(code = 401, message = "Você não tem permissão para acessar"
					+ "esse recurso!"),
			@ApiResponse(code = 403, message = "O recurso solicitado não está disponível "
					+ "para usuários não autenticados!"),
			@ApiResponse(code = 404, message = "O recurso solicitado não foi encontrado!")
	})
	@GetMapping
	public List<T> findAll(){
		return getService().findAll();
	}
	
	@GetMapping("page")
	public Page<T> findAll(@RequestParam int page, 
						   @RequestParam int size,
						   @RequestParam(required = false) String order,
						   @RequestParam(required = false) Boolean asc){
		PageRequest pageRequest = PageRequest.of(page, size);
		if (order != null && asc != null) {
			pageRequest = PageRequest.of(page, size, asc ? Sort.Direction.ASC : Sort.Direction.DESC, order );
		}
		return getService().findAll(pageRequest);
	}
	
	@GetMapping("{id}")
	public T findOne(@PathVariable ID id) {
		return getService().findOne(id);
	}
	
	@PostMapping
	public T save(@RequestBody @Valid T entity) {
		return getService().save(entity);
	}
	
	@GetMapping("exists/{id}")
	public boolean exists(@PathVariable ID id) {
		return getService().exists(id);
	}
	
	@GetMapping("count")
	public long count() {
		return getService().count();
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable ID id) {
		getService().delete(id);
	}

}














