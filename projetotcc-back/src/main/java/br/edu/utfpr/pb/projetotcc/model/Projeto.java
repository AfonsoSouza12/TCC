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
@Table(name = "projeto")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id"})
@ToString
public class Projeto implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nome", length = 254, nullable = false)
	private String nome;

	@Column(name = "descricao", length = 1000, nullable = false)
	private String descricao;

	@Column(name = "data_inicio", nullable = false)
	private LocalDate dataInicio;

	@Column(name = "data_limite", nullable = false)
	private LocalDate dataLimite;

	@Column(name = "data_fim")
	private LocalDate dataFim;

	@ManyToOne
	@JoinColumn(name = "usuario_id",
			referencedColumnName = "id")
	private Usuario responsavel;

//	@ManyToMany(cascade = CascadeType.ALL,
//				fetch = FetchType.EAGER)
//	@JoinTable(name = "projeto_membros",
//			joinColumns = { @JoinColumn(name = "projeto_id") },
//			inverseJoinColumns = { @JoinColumn(name = "usuario_id") })
//	private Set<Usuario> membros;

	@ManyToMany(fetch = FetchType.EAGER,
			cascade = {
					CascadeType.PERSIST,
					CascadeType.MERGE
			})
	@JoinTable(name = "projeto_membros",
			joinColumns = { @JoinColumn(name = "projeto_id") },
			inverseJoinColumns = { @JoinColumn(name = "usuario_id") })
	private Set<Usuario> membros;
	
}
