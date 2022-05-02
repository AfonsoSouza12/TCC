import {Component, OnInit, ViewChild} from '@angular/core';
import {Solicitacao} from '../model/solicitacao';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {Usuario} from '../model/usuario';
import {Sprint} from '../model/sprint';
import {Projeto} from '../model/projeto';
import {Table} from 'primeng/table';
import {SolicitacaoService} from './solicitacao.service';
import {UsuarioService} from '../usuario/usuario.service';
import {ProjetoService} from '../projeto/projeto.service';
import {EtapaService} from '../etapa/etapa.service';
import {Etapa} from '../model/etapa';
import {SprintService} from '../sprint/sprint.service';
import {StatusOpt} from '../../shared/consts/StatusOpt';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css']
})
export class SolicitacaoComponent implements OnInit {

  @ViewChild('dt', null) dataTable: Table;
  statuss = Object.keys(StatusOpt).map(key => ({ label: StatusOpt[key], value: StatusOpt[key] }));
  solicitacoes: Solicitacao[];
  solicitacaoEdit = new Solicitacao();
  showDialog = false;
  msgs: Message[] = [];
  responsaveis: Usuario[];
  projetos: Projeto[];
  etapas: Etapa[];
  sprints: Sprint[];

  totalRecords: number;
  maxRecords = 10;
  currentPage = 1;

  constructor(private solicitacaoService: SolicitacaoService,
              private confirmationService: ConfirmationService,
              private projetoService: ProjetoService,
              private etapaService: EtapaService,
              private sprintService: SprintService,
              private usuarioService: UsuarioService,

              ) {

}

  ngOnInit() {
    this.carregarCombos();
    this.findAll();
  }

  carregarCombos() {
    this.projetoService.findAll().subscribe(e => this.projetos  = e );
    this.etapaService.findAll().subscribe(e => this.etapas  = e );
    this.sprintService.findAll().subscribe(e => this.sprints  = e );
    this.usuarioService.findAll().subscribe(e => this.responsaveis  = e );
  }
  findAll() {
    this.solicitacaoService.findAll().subscribe( e => this.solicitacoes = e);
  }

  findAllPaged(page: number, size: number) {
    this.solicitacaoService.findPageable(page, size).subscribe(e => {
      this.solicitacoes = e.content;
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
    this.solicitacaoEdit = new Solicitacao();
    this.solicitacaoEdit.projeto = this.projetos[0];
    this.solicitacaoEdit.sprint = this.sprints[0];
    this.solicitacaoEdit.etapa = this.etapas[0];
    this.solicitacaoEdit.responsavel = this.responsaveis[0];
    this.solicitacaoEdit.status = this.statuss[0].value;
    this.showDialog = true;
  }

  save() {
    this.solicitacaoService.save(this.solicitacaoEdit).subscribe( e => {
        this.solicitacaoEdit = new Solicitacao();
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
    this.solicitacaoEdit = new Solicitacao();
  }

  edit(solicitacao: Solicitacao) {
    this.solicitacaoEdit = Object.assign({}, solicitacao);
    this.showDialog = true;
  }

  delete(solicitacao: Solicitacao) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.solicitacaoService.delete(solicitacao.id).subscribe(() => {
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
