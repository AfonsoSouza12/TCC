import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {Calendar} from 'primeng/calendar';
import {Sprint} from '../model/sprint';
import {ConfirmationService, LazyLoadEvent, Message, MessageService} from 'primeng/api';
import {Usuario} from '../model/usuario';
import {SprintService} from '../sprint/sprint.service';
import {UsuarioService} from '../usuario/usuario.service';
import {ProjetoService} from '../projeto/projeto.service';
import {Projeto} from '../model/projeto';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  @ViewChild('dt', null) dataTable: Table;
  @ViewChild('cal', null) calendarFrom: Calendar;


  sprints: Sprint[];
  sprintEdit = new Sprint();
  showDialog = false;

  projetos: Projeto[];
  responsaveis: Usuario[];

  totalRecords: number;
  maxRecords = 10;
  currentPage = 1;

  br: any;

  constructor(private sprintService: SprintService,
              private confirmationService: ConfirmationService,
              private projetoService: ProjetoService,
              private usuarioService: UsuarioService,
              private messageService: MessageService
  ) {
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
    this.projetoService.findAll().subscribe(e => this.projetos  = e );
    this.usuarioService.findAll().subscribe(e => this.responsaveis  = e );
  }
  findAll() {
    this.sprintService.findAll().subscribe( e => this.sprints = e);
  }

  findAllPaged(page: number, size: number) {
    this.sprintService.findPageable(page, size).subscribe(e => {
      this.sprints = e.content;
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
    this.sprintEdit = new Sprint();
    this.sprintEdit.projeto = this.projetos[0];
    this.sprintEdit.responsavel = this.responsaveis[0];
    this.showDialog = true;
  }

  save() {
    this.sprintService.save(this.sprintEdit).subscribe( e => {
        this.sprintEdit = new Sprint();
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
    this.sprintEdit = new Sprint();
  }

  edit(sprint: Sprint) {
    this.sprintEdit = Object.assign({}, sprint);

    let dataString = this.sprintEdit.dataInicio;
    let newDate = new Date(dataString);
    this.sprintEdit.dataInicio = newDate;

    let dataString2 = this.sprintEdit.dataLimite
    let newDate2 = new Date(dataString2);
    this.sprintEdit.dataLimite = newDate2;

    if(this.sprintEdit.dataFim == null){
      this.calendarFrom.value = null;
      this.calendarFrom.updateInputfield();
    }else{
      let dataString3 = this.sprintEdit.dataFim
      let newDate3 = new Date(dataString3);
      this.sprintEdit.dataFim = newDate3;
    }

    this.showDialog = true;
  }

  delete(sprint: Sprint) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.sprintService.delete(sprint.id).subscribe(() => {
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


}
