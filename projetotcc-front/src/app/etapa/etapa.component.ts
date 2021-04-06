import {Component, OnInit, ViewChild} from '@angular/core';
import {Etapa} from '../model/etapa';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {SubEtapa} from '../model/sub-etapa';
import {SubEtapaService} from '../sub-etapa/sub-etapa.service';
import {EtapaService} from './etapa.service';
import {Table} from 'primeng/table';
import {Usuario} from '../model/usuario';
import {UsuarioService} from '../usuario/usuario.service';

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html',
  styleUrls: ['./etapa.component.css']
})
export class EtapaComponent implements OnInit {

  @ViewChild('dt', null) dataTable: Table;

  etapas: Etapa[];
  etapaEdit = new Etapa();
  showDialog = false;
  msgs: Message[] = [];

  responsaveis: Usuario[];

  totalRecords: number;
  maxRecords = 10;
  currentPage = 1;

  constructor(private etapaService: EtapaService,
              private confirmationService: ConfirmationService,
              private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.findAll();
    this.carregarCombos();
  }

  carregarCombos() {
    this.usuarioService.findAll().subscribe(e => this.responsaveis  = e );
  }
  findAll() {
    this.etapaService.findAll().subscribe( e => this.etapas = e);
  }

  findAllPaged(page: number, size: number) {
    this.etapaService.findPageable(page, size).subscribe(e => {
      this.etapas = e.content;
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
    this.etapaEdit = new SubEtapa();
    this.showDialog = true;
  }

  save() {
    this.etapaService.save(this.etapaEdit).subscribe( e => {
        this.etapaEdit = new SubEtapa();
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
    this.etapaEdit = new SubEtapa();
  }

  edit(etapa: Etapa) {
    // this.etapaEdit = etapa;
    this.etapaEdit = Object.assign({}, etapa);
    this.showDialog = true;
  }

  delete(etapa: Etapa) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.etapaService.delete(etapa.id).subscribe(() => {
          this.dataTable.reset();
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
