import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {SubEtapa} from '../model/sub-etapa';
import {SubEtapaService} from './sub-etapa.service';
import {Etapa} from '../model/etapa';
import {EtapaService} from '../etapa/etapa.service';
import {StatusOpt} from '../../shared/consts/StatusOpt';

@Component({
  selector: 'app-sub-etapa',
  templateUrl: './sub-etapa.component.html',
  styleUrls: ['./sub-etapa.component.css']
})
export class SubEtapaComponent implements OnInit {

  statuss = Object.keys(StatusOpt).map(key => ({ label: StatusOpt[key], value: key }));
  subEtapas: SubEtapa[];
  subEtapaEdit = new SubEtapa();
  showDialog = false;
  msgs: Message[] = [];
  etapas:Etapa[];

  totalRecords: number;
  maxRecords = 10;
  currentPage = 1;

  constructor(private subEtapaService: SubEtapaService,
              private etapaService: EtapaService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.findAll();
    this.carregarCombos();
  }

  findAll() {
    this.subEtapaService.findAll().subscribe( e => this.subEtapas = e);
  }
  findAllPaged(page: number, size: number) {
    this.subEtapaService.findPageable(page, size).subscribe(e => {
      this.subEtapas = e.content;
      this.totalRecords = e.totalElements;
    });
  }
  lazyLoad(event: LazyLoadEvent) {
    const pageNumber = event.first / event.rows;
    this.currentPage = pageNumber;

    this.maxRecords = event.rows;

    setTimeout( () => {
      this.findAllPaged(this.currentPage, this.maxRecords);
    }, 250);
  }

  newEntity() {
    this.subEtapaEdit = new SubEtapa();
    this.subEtapaEdit.etapa = this.etapas[0];
    this.showDialog = true;
  }
  carregarCombos() {
    this.etapaService.findAll().subscribe( e => this.etapas = e);
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

  edit(subEtapa: SubEtapa) {
    // this.subEtapaEdit = subEtapa;
    this.subEtapaEdit = Object.assign({}, subEtapa);
    this.showDialog = true;
  }

  delete(subEtapa: SubEtapa) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.subEtapaService.delete(subEtapa.id).subscribe(() => {
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
