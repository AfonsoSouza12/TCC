import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Solicitacao} from '../model/solicitacao';
import {SolicitacaoService} from '../solicitacao/solicitacao.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {StatusOpt} from '../../shared/consts/StatusOpt';
import {ConfirmationService, Message} from 'primeng/api';
import {Usuario} from '../model/usuario';
import {Projeto} from '../model/projeto';
import {Etapa} from '../model/etapa';
import {Sprint} from '../model/sprint';
import {ProjetoService} from '../projeto/projeto.service';
import {EtapaService} from '../etapa/etapa.service';
import {SprintService} from '../sprint/sprint.service';
import {UsuarioService} from '../usuario/usuario.service';
import {Dropdown} from 'primeng/dropdown';
import {clearElement} from '@angular/cdk/testing/testbed/fake-events';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.css']
})
export class QuadroComponent implements OnInit {

  statuss = Object.keys(StatusOpt).map(key => ({ label: StatusOpt[key], value: StatusOpt[key] }));
  solicitacoes: Solicitacao[] = []
  solicitacoesBacklog: Solicitacao[];
  solicitacoesTodo: Solicitacao[];
  solicitacoesDoing: Solicitacao[];
  solicitacoesTest: Solicitacao[];
  solicitacoesDone: Solicitacao[];
  solicitacaoEdit = new Solicitacao();
  msgs: Message[] = [];
  showDialog = false;
  responsaveis: Usuario[];
  projetos: Projeto[];
  etapas: Etapa[];
  sprints: Sprint[];
  containerStatus: string;
  @ViewChild('projetoDrop', { static: true }) projetoDrop: Dropdown;

  selectedProjeto= new Projeto();
  selectedSprint= new Sprint();
  selectedResponsavel= new Usuario();

  constructor(private solicitacaoService: SolicitacaoService,
              private confirmationService: ConfirmationService,
              private projetoService: ProjetoService,
              private etapaService: EtapaService,
              private sprintService: SprintService,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.findSolicitacoes();
    this.carregarCombos();
  }
  carregarCombos() {
    this.projetoService.findAll().subscribe(e => this.projetos  = e );
    this.etapaService.findAll().subscribe(e => this.etapas  = e );
    this.sprintService.findAll().subscribe(e => this.sprints  = e );
    this.usuarioService.findAll().subscribe(e => this.responsaveis  = e );
  }

  findSolicitacoes() {
    this.solicitacaoService.findAll().subscribe( e => {
      this.solicitacoes = e;
      this.solicitacoesBacklog = this.solicitacoes.filter(solicitacao => solicitacao.status === "Backlog");
      this.solicitacoesTodo = this.solicitacoes.filter(solicitacao => solicitacao.status === "To Do");
      this.solicitacoesDoing = this.solicitacoes.filter(solicitacao => solicitacao.status === "Doing");
      this.solicitacoesTest = this.solicitacoes.filter(solicitacao => solicitacao.status === "Test");
      this.solicitacoesDone = this.solicitacoes.filter(solicitacao => solicitacao.status === "Done");
    }
    );

  }
  drop(event: CdkDragDrop<Object[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.containerStatus = event.container.element.nativeElement.getAttribute('id');
    this.solicitacaoEdit = Object.assign({},this.solicitacoes.find(solicitacao => solicitacao.id === event.container.data[event.currentIndex]['id']))
    this.solicitacaoEdit.status = this.containerStatus;
    this.save();
  }

  edit(solicitacao: Solicitacao) {
    this.solicitacaoEdit = Object.assign({}, solicitacao);
    this.showDialog = true;
  }

  save() {
    this.solicitacaoService.save(this.solicitacaoEdit).subscribe( e => {
        this.solicitacaoEdit = new Solicitacao();
        if(this.selectedSprint == null && this.selectedResponsavel == null && this.selectedProjeto == null){
          this.findSolicitacoes();
        }
        else {
          this.findSolicitacoesFiltrado(this.selectedProjeto.id, this.selectedSprint.id, this.selectedResponsavel.id)
        }

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

  findSolicitacoesFiltrado(projetoId: number, sprintId: number, responsavelId: number){
    this.solicitacaoService.findFiltro(projetoId,sprintId,responsavelId).subscribe( e => {
       this.solicitacoes = e;

       this.solicitacoesBacklog = this.solicitacoes.filter(solicitacao => solicitacao.status === "Backlog");
       this.solicitacoesTodo = this.solicitacoes.filter(solicitacao => solicitacao.status === "To Do");
       this.solicitacoesDoing = this.solicitacoes.filter(solicitacao => solicitacao.status === "Doing");
       this.solicitacoesTest = this.solicitacoes.filter(solicitacao => solicitacao.status === "Test");
       this.solicitacoesDone = this.solicitacoes.filter(solicitacao => solicitacao.status === "Done");
      }
    );


  }
  limparFiltros(){
    console.log("limpando");
      this.selectedProjeto = null;
      this.selectedSprint = null;
      this.selectedResponsavel = null;
      this.carregarCombos();
      this.findSolicitacoes();

  }

}

