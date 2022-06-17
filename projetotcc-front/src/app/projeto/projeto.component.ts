import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {Projeto} from '../model/projeto';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {Usuario} from '../model/usuario';
import {ProjetoService} from '../projeto/projeto.service';
import {UsuarioService} from '../usuario/usuario.service';
import {Calendar} from 'primeng/calendar';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent implements OnInit {

  @ViewChild('dt', null) dataTable: Table;
  @ViewChild('cal', null) calendarFrom: Calendar;

  projetos: Projeto[];
  projetoEdit = new Projeto();
  showDialog = false;
  msgs: Message[] = [];

  responsaveis: Usuario[];
  projetoMembros: Usuario[];
  selectedMembro = new Usuario();

  totalRecords: number;
  maxRecords = 10;
  currentPage = 1;

  br: any;

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
    this.projetoService.findAll().subscribe( e => {
      this.projetos = e
      this.projetoMembros = [];
      this.usuarioService.findProjetoMembros(this.projetos[0].id).subscribe(e => this.projetoMembros = e );
    });
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
    this.projetoEdit = new Projeto();
    this.projetoEdit.responsavel = this.responsaveis[0];
    this.showDialog = true;
  }

  save() {
    this.projetoEdit.membros = this.projetoMembros;
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
    this.findProjetoMembros(projeto.id);
    this.projetoEdit = Object.assign({}, projeto);

    let dataString = this.projetoEdit.dataInicio;
    let newDate = new Date(dataString);
    this.projetoEdit.dataInicio = newDate;

    let dataString2 = this.projetoEdit.dataLimite
    let newDate2 = new Date(dataString2);
    this.projetoEdit.dataLimite = newDate2;

    if(this.projetoEdit.dataFim == null){
      this.calendarFrom.value = null;
      this.calendarFrom.updateInputfield();
    }else{
      let dataString3 = this.projetoEdit.dataFim
      let newDate3 = new Date(dataString3);
      this.projetoEdit.dataFim = newDate3;
    }

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

  findProjetoMembros(id: number){
    this.projetoMembros = [];
    this.usuarioService.findProjetoMembros(id).subscribe(e =>{this.projetoMembros = e; console.log(e)} );
  }

  onRowSelect(id: number) {
    this.findProjetoMembros(id);
  }

  removeMembro(membroRemove: Usuario) {
    this.projetoMembros = this.projetoMembros.filter(membro => membro.nome != membroRemove.nome)
  }

  addMembro(membro: Usuario) {
    var ehMembro = false;
    for(let value of this.projetoMembros){
      if(value.nome === membro.nome){
        ehMembro = true;
      }
    }
    if(ehMembro === false){
      this.projetoMembros.push(membro);
    }

  }
}
