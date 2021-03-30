import { Component, OnInit } from '@angular/core';
import {ConfirmationService, Message} from 'primeng/api';
import {SubEtapa} from '../model/sub-etapa';
import {SubEtapaService} from './sub-etapa.service';

@Component({
  selector: 'app-sub-etapa',
  templateUrl: './sub-etapa.component.html',
  styleUrls: ['./sub-etapa.component.css']
})
export class SubEtapaComponent implements OnInit {

  subEtapas: SubEtapa[];
  subEtapaEdit = new SubEtapa();
  showDialog = false;
  msgs: Message[] = [];

  constructor(private subEtapaService: SubEtapaService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }

  findAll() {
    this.subEtapaService.findAll().subscribe( e => this.subEtapas = e);
  }

  newEntity() {
    this.subEtapaEdit = new SubEtapa();
    this.showDialog = true;
  }

  save() {
    this.subEtapaService.save(this.subEtapaEdit).subscribe( e => {
        this.subEtapaEdit = new SubEtapa();
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
    this.subEtapaEdit = new SubEtapa();
  }

  edit(genero: SubEtapa) {
    // this.subEtapaEdit = genero;
    this.subEtapaEdit = Object.assign({}, genero);
    this.showDialog = true;
  }

  delete(genero: SubEtapa) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.subEtapaService.delete(genero.id).subscribe(() => {
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
