import { Component, OnInit } from '@angular/core';
import {Usuario} from '../model/usuario';
import {UsuarioService} from './usuario.service';
import {ConfirmationService, Message} from 'primeng/api';
import {CargoService} from '../cargo/cargo.service';
import {Cargo} from '../model/cargo';
import {Permissao} from '../model/permissao';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];
  usuarioEdit = new Usuario();
  showDialog = false;
  msgs: Message[] = [];
  cargos: Cargo[];
  permissoes: Permissao[];
  selectedPermissao = new Permissao();

  constructor(private usuarioService: UsuarioService,
              private confirmationService : ConfirmationService,
              private cargoService: CargoService) {
    this.permissoes = [
      {id: 1, nome: "ADMIN"},
      {id: 2, nome: "USER"}
    ]
  }

  ngOnInit() {

    this.findAll();
    this.carregarCombos();
    this.selectedPermissao = this.permissoes[0];

  }
  carregarCombos() {
    this.cargoService.findAll().subscribe(e => this.cargos  = e );
  }

  findAll() {
      this.usuarioService.findAll().subscribe(usuarios =>{
        this.usuarios = usuarios;
      });
  }
  newEntity(){
    this.usuarioEdit = new Usuario();
    this.showDialog = true;
    this.usuarioEdit.cargo = this.cargos[0];
  }

  save() {
    this.usuarioService.save(this.usuarioEdit).subscribe( e => {
        this.usuarioEdit = new Usuario();
        this.findAll();
        this.showDialog = false;
        this.msgs = [{severity: 'success', summary: 'Confirmado',
          detail: 'Registro salvo com sucesso!'}];
      },
      error => {
        this.msgs = [{severity: 'error', summary: 'Erro',
          detail: 'Falha ao salvar o registro!'}];
      }
    );
  }
  cancel() {
    this.usuarioEdit = new Usuario();
    this.showDialog = false;

  }

  edit(usuario: Usuario) {
    // this.usuarioEdit = Usuario;
    this.usuarioEdit = Object.assign({}, usuario);
    this.showDialog = true;
  }

  delete(usuario: Usuario) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.usuarioService.delete(usuario.id).subscribe(() => {
          this.findAll();
          this.msgs = [{severity: 'success', summary: 'Confirmado',
            detail: 'Registro removido com sucesso!'}];
        }, error => {
          this.msgs = [{severity: 'error', summary: 'Erro',
            detail: 'Falha ao remover o registro!'}];
        });
      }
    });
  }

  addPermissao(permissao: Permissao) {
    var temPermissao = false;
    // for(let value of this.usuarioEdit.permissoes){
    //   if(value.nome === permissao.nome){
    //     temPermissao = true;
    //   }
    // }
    if(this.usuarioEdit.permissoes == null ){
      this.usuarioEdit.permissoes = [];
      this.usuarioEdit.permissoes.push(permissao);
    }
    else{
      for(let value of this.usuarioEdit.permissoes){
        if(value.nome === permissao.nome){
          temPermissao = true;
        }
      }

      //
      if(temPermissao === false){
        this.usuarioEdit.permissoes.push(permissao);
      }

    }
  }


  deletePermissao(permissaoRemove: Permissao) {
    this.usuarioEdit.permissoes = this.usuarioEdit.permissoes.filter(permissao => permissao.nome != permissaoRemove.nome)
  }
}
