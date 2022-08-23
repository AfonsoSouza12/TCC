package br.edu.utfpr.pb.projetotcc.service.impl;

import br.edu.utfpr.pb.projetotcc.service.SubEtapaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.edu.utfpr.pb.projetotcc.model.Etapa;
import br.edu.utfpr.pb.projetotcc.repository.EtapaRepository;
import br.edu.utfpr.pb.projetotcc.service.EtapaService;

@Service
public class EtapaServiceImpl 
		extends CrudServiceImpl<Etapa, Long>
		implements EtapaService{

	@Autowired
	private EtapaRepository etapaRepository;

	@Autowired
	private SubEtapaService subEtapaService;

	@Override
	protected JpaRepository<Etapa, Long> getRepository() {
		return etapaRepository;
	}


	public void deleteEtapa(Long etapaId) throws Exception {
		if (!this.subEtapaService.existeSubEtapaComEtapa(etapaId)) {
			super.delete(etapaId);
		} else {
			throw new Exception("Esse registro possui uma SubEtapa Vinculada a ele, delete a SubEtapa para prosseguir.");
		}
	}
}
