package br.edu.utfpr.pb.aula6.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.edu.utfpr.pb.aula6.model.Cargo;
import br.edu.utfpr.pb.aula6.repository.CargoRepository;
import br.edu.utfpr.pb.aula6.service.CargoService;

@Service
public class CargoServiceImpl 
		extends CrudServiceImpl<Cargo, Integer>
		implements CargoService{

	@Autowired
	private CargoRepository cargoRepository;
	
	@Override
	protected JpaRepository<Cargo, Integer> getRepository() {
		return cargoRepository;
	}

}
