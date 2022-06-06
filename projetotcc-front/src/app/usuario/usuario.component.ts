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

  constructor(private usuarioService: UsuarioService,
              private confirmationService : ConfirmationService,
              private cargoService: CargoService) { }

  ngOnInit() {

    this.findAll();
    this.carregarCombos();

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
    this.showDialog = false;
    this.usuarioEdit = new Usuario();
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
}
