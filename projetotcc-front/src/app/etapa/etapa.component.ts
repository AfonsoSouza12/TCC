import {Component, OnInit, ViewChild} from '@angular/core';
import {Etapa} from '../model/etapa';
import {ConfirmationService, LazyLoadEvent, Message, MessageService} from 'primeng/api';
import {SubEtapa} from '../model/sub-etapa';
import {SubEtapaService} from '../sub-etapa/sub-etapa.service';
import {EtapaService} from './etapa.service';
import {Table} from 'primeng/table';
import {Usuario} from '../model/usuario';
import {UsuarioService} from '../usuario/usuario.service';
import {StatusOpt} from '../../shared/consts/StatusOpt';
import {Dropdown} from 'primeng/dropdown';
import {AppRoutingModule} from '../app-routing.module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html',
  styleUrls: ['./etapa.component.css']
})
export class EtapaComponent implements OnInit {

  @ViewChild('dt', null) dataTable: Table;

  etapas: Etapa[];
  etapaEdit = new Etapa();
  subEtapaEdit = new SubEtapa();
  showDialog = false;
  showDialogSub = false;
  responsaveis: Usuario[];

  totalRecords: number;
  maxRecords = 10;
  currentPage = 1;

  subEtapas: SubEtapa[];


  constructor(private etapaService: EtapaService,
              private subEtapaService: SubEtapaService,
              private confirmationService: ConfirmationService,
              private usuarioService: UsuarioService,
              private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit() {
    this.findAll();
    this.carregarCombos();
  }

  carregarCombos() {
    this.usuarioService.findAll().subscribe(e => this.responsaveis  = e );
  }

  findAll() {
    this.etapaService.findAll().subscribe( e =>{
      this.etapas = e
      this.subEtapas = [];
      this.subEtapaService.findByEtapa(this.etapas[0].id).subscribe(e=> this.subEtapas = e);
    } );
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
    this.etapaEdit = new Etapa();
    this.etapaEdit.responsavel = this.responsaveis[0];
    this.showDialog = true;
  }

  save() {
    this.etapaService.save(this.etapaEdit).subscribe( e => {
        this.etapaEdit = new Etapa();
        this.findAll();
        this.showDialog = false;
        this.messageService.add({severity: 'success', summary: 'Confirmado',
          detail: 'Registro salvo com sucesso!'});
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Erro',
          detail: 'Falha ao salvar o registro!'});
      }
    );
  }

  cancel() {
    this.showDialog = false;
    this.etapaEdit = new Etapa();
  }

  edit(etapa: Etapa) {
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
        this.etapaService.deleteEtapa(etapa.id).subscribe(() => {
          this.findAll();
          this.dataTable.reset();
          this.messageService.add({severity: 'success', summary: 'Confirmado',
            detail: 'Registro removido com sucesso!'});
        }, error => {
          this.messageService.add({severity: 'error', summary: 'Erro',
            detail: 'Falha ao remover o registro!'});
        });
      }
    });
  }
  newSubEtapa(){
    this.router.navigate(['subEtapa', 'novo']);
  }

  saveSubEtapa() {
    this.subEtapaService.save(this.subEtapaEdit).subscribe( e => {
      let id = this.subEtapaEdit.etapa.id;
      //console.log('o id loco é ' + id);
      this.subEtapaEdit = new SubEtapa();
        this.findSubEtapas(id);
        this.showDialogSub = false;
        this.messageService.add({severity: 'success', summary: 'Confirmado',
          detail: 'Registro salvo com sucesso!'});
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Erro',
          detail: 'Falha ao salvar o registro!'});
      }
    );
  }
  editSubEtapa(subEtapa: SubEtapa) {
    // this.etapaEdit = etapa;
    this.subEtapaEdit = Object.assign({}, subEtapa);
    this.showDialogSub = true;
  }

  deleteSubEtapa(subEtapa: SubEtapa) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.subEtapaService.delete(subEtapa.id).subscribe(() => {
          this.findSubEtapas(subEtapa.etapa.id);
          this.messageService.add({severity: 'success', summary: 'Confirmado',
            detail: 'Registro removido com sucesso!'});
        }, error => {
          this.messageService.add({severity: 'error', summary: 'Erro',
            detail: 'Falha ao remover o registro!'});
        });
      }
    });
  }

  findSubEtapas(id: number){
    this.subEtapas = [];
      this.subEtapaService.findByEtapa(id).subscribe(e =>{this.subEtapas = e; console.log(e)} );
  }

  onRowSelect(id: number) {
    this.findSubEtapas(id);
  }
}
