import {Component, OnInit, ViewChild} from '@angular/core';
import {Solicitacao} from '../model/solicitacao';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {Usuario} from '../model/usuario';
import {Sprint} from '../model/sprint';
import {Projeto} from '../model/projeto';
import {Table} from 'primeng/table';
import {SolicitacaoService} from './solicitacao.service';
import {UsuarioService} from '../usuario/usuario.service';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css']
})
export class SolicitacaoComponent implements OnInit {

  @ViewChild('dt', null) dataTable: Table;

  solicitacoes: Solicitacao[];
  solicitacaoEdit = new Solicitacao();
  showDialog = false;
  msgs: Message[] = [];
  responsaveis: Usuario[];
  projetos: Projeto[];
  sprints: Sprint[];

  totalRecords: number;
  maxRecords = 10;
  currentPage = 1;

  constructor(private solicitacaoService: SolicitacaoService,
              private confirmationService: ConfirmationService,
              private usuarioService: UsuarioService
              ) {

}

  ngOnInit() {
    this.carregarCombos();
    this.findAll();
  }

  carregarCombos() {
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
