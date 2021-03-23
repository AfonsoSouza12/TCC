package br.edu.utfpr.pb.projetotcc.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id"})
public class Usuario implements UserDetails{
	private static final long serialVersionUID = 1L;
	private static final BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder(10);

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 100, nullable = false)
	private String nome;
	
	@Column(length = 100, nullable = false)
	private String username;
	
	@Column(length = 512, nullable = false)
	private String password;

	@Column(length = 512, nullable = false)
	private String password;

	@OneToOne(optional = true)
	@JoinColumn(name = "cargo_id", referencedColumnName = "id", nullable = true)
	@JsonIgnore
	private Cargo cargo;
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<Permissao> permissoes;
	
	public void addPermissao(Permissao permissao) {
		if (permissoes == null) {
			permissoes = new HashSet<>();
		}
		permissoes.add(permissao);
	}
	
	public String getEncodedPassword(String pass) {
		if (pass != null && !pass.equals("") ) {
			return bCrypt.encode(pass);
		}
		return pass;
	}
	

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.addAll(permissoes);
		return authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
}
