package br.edu.utfpr.pb.projetotcc.service.impl;

import br.edu.utfpr.pb.projetotcc.model.Cargo;
import br.edu.utfpr.pb.projetotcc.repository.CargoRepository;
import br.edu.utfpr.pb.projetotcc.service.CargoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.edu.utfpr.pb.projetotcc.model.Cargo;
import br.edu.utfpr.pb.projetotcc.repository.CargoRepository;
import br.edu.utfpr.pb.projetotcc.service.CargoService;

@Service
public class CargoServiceImpl 
		extends CrudServiceImpl<Cargo, Long>
		implements CargoService {

	@Autowired
	private CargoRepository cargoRepository;
	
	@Override
	protected JpaRepository<Cargo, Long> getRepository() {
		return cargoRepository;
	}

}
