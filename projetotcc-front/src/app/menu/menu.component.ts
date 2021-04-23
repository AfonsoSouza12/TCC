import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Cadastros',
        items: [
          {label: 'Cargos', routerLink: "cargo"},
          {label: 'Etapas', items:[{label: 'Etapas',routerLink:"etapa"},
              {label:'Sub-Etapas',routerLink:"subEtapa"}]},
          {label: 'Projetos', routerLink: 'projeto'},
          {label: 'Solicitações', routerLink: 'solicitacao'},
        ]
      },
    ];
  }
}
