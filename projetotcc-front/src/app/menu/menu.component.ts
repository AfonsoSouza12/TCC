import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {LoginService} from '../login/login.service';
import {Usuario} from '../model/usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  usuario:  any;
  constructor(private loginService: LoginService) {
    this.usuario =  JSON.parse(localStorage.getItem('usuario')).principal.nome;
  }

  ngOnInit() {
    // this.usuario =  JSON.parse(localStorage.getItem('usuario')).principal.nome;
    this.items = [
      {
        label: 'Cadastros',
        items: [
          {label: 'Cargos', visible: this.hasRole('ADMIN'), routerLink: "cargo"},
          {label: 'Etapas', items:[{label: 'Etapas',routerLink:"etapa"},
              {label:'Sub-Etapas',routerLink:"subEtapa"}]},
          {label: 'Projetos',visible: this.hasRole('ADMIN'), routerLink: 'projeto'},
          {label: 'Solicitações', routerLink: 'solicitacao'},
          {label: 'Sprints', routerLink: 'sprint'},
          {label: 'Usuários', routerLink: 'usuario'},

        ]
      },
      {
        label: 'Quadro', routerLink:"quadro"
      },
    ];

  }
  hasRole(permissao: string): boolean {
    return this.loginService.hasRole(permissao);

  }

  logout(){
    this.loginService.logout();
  }

}
