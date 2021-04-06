import { Component, OnInit } from '@angular/core';
import {Usuario} from '../model/usuario';
import {UsuarioService} from './usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
      this.usuarioService.findAll().subscribe(usuarios =>{
        this.usuarios = usuarios;
      });
  }
}
