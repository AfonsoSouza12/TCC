package br.edu.utfpr.pb.projetotcc.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "solicitacao")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id"})
@ToString
public class Solicitacao {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nome", length = 254, nullable = false)
	private String nome;
	
	@Column(name = "descricao", length = 1024, nullable = false)
	private String descricao;

	@Column(name = "data_inicio", nullable = false)
	private LocalDate dataInicio;

	@Column(name = "data_fim")
	private LocalDate dataFim;

	@ManyToOne
	@JoinColumn(name = "projeto_id", nullable = false, referencedColumnName = "id")
	private Projeto projeto;

	@ManyToOne
	@JoinColumn(name = "etapa_id", nullable = false, referencedColumnName = "id")
	private Etapa etapa;

	@ManyToOne
	@JoinColumn(name = "usuario_id",
			referencedColumnName = "id")
	private Usuario responsavel;

}

