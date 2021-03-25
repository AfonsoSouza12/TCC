package br.edu.utfpr.pb.projetotcc.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "produtora")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id"})
@ToString
public class Projeto implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "nome", length = 254, nullable = false)
	private String nome;

	@Column(name = "nome", length = 1000, nullable = false)
	private String descricao;

	@Column(name = "data_inicio", nullable = false)
	private LocalDate dataInicio;

	@Column(name = "data_limite", nullable = false)
	private LocalDate dataLimite;

	@Column(name = "data_fim", nullable = false)
	private LocalDate dataFim;

	@ManyToOne
	@JoinColumn(name = "usuario_id",
			referencedColumnName = "id")
	private Usuario responsavel;

	@OneToMany(
			mappedBy = "solicitacao",
			targetEntity = Solicitacao.class,
			fetch = FetchType.LAZY,
			cascade = {CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.MERGE, CascadeType.REMOVE})
	@JsonIgnore
	private List<Solicitacao> solicitacoes;

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<Usuario> membros;
	
}
