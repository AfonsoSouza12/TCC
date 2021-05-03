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

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Cadastros',
        items: [
          {label: 'Cargos', visible: this.hasRole('ADMIN'), routerLink: "cargo"},
          {label: 'Etapas', items:[{label: 'Etapas',routerLink:"etapa"},
              {label:'Sub-Etapas',routerLink:"subEtapa"}]},
          {label: 'Projetos', routerLink: 'projeto'},
          {label: 'Solicitações', routerLink: 'solicitacao'},
          {label: 'Sprints', routerLink: 'sprint'},
        ]
      },
    ];
  }
  hasRole(permissao: string): boolean {
    return this.loginService.hasRole(permissao);
  }

}
