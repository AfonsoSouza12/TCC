import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {Projeto} from '../model/projeto';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {Usuario} from '../model/usuario';
import {ProjetoService} from '../projeto/projeto.service';
import {UsuarioService} from '../usuario/usuario.service';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent implements OnInit {

  @ViewChild('dt', null) dataTable: Table;

  projetos: Projeto[];
  projetoEdit = new Projeto();
  showDialog = false;
  msgs: Message[] = [];

  responsaveis: Usuario[];

  totalRecords: number;
  maxRecords = 10;
  currentPage = 1;

  br: any;
  today: number = Date.now();

  constructor(private projetoService: ProjetoService,
              private confirmationService: ConfirmationService,
              private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.findAll();
    this.carregarCombos();
    this.br = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado' ],
      dayNamesShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' ],
      dayNamesMin: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
      monthNames: [ 'Janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho',
        'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
      monthNamesShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set',
        'out', 'nov', 'dez' ],
      today: 'Hoje',
      clear: 'Limpar'
    }

  }

  carregarCombos() {
    this.usuarioService.findAll().subscribe(e => this.responsaveis  = e );
  }
  findAll() {
    this.projetoService.findAll().subscribe( e => this.projetos = e);
  }

  findAllPaged(page: number, size: number) {
    this.projetoService.findPageable(page, size).subscribe(e => {
      this.projetos = e.content;
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
    this.today = Date.now();
    this.projetoEdit = new Projeto();
    this.projetoEdit.responsavel = this.responsaveis[0];
    this.showDialog = true;
  }

  save() {
    this.projetoService.save(this.projetoEdit).subscribe( e => {
        this.projetoEdit = new Projeto();
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
    this.projetoEdit = new Projeto();
  }

  edit(projeto: Projeto) {
    this.today = Date.now();
    this.projetoEdit = Object.assign({}, projeto);
    this.showDialog = true;
  }

  delete(projeto: Projeto) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.projetoService.delete(projeto.id).subscribe(() => {
          this.findAll();
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
