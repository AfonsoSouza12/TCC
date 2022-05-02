import { Component, OnInit } from '@angular/core';
import {Solicitacao} from '../model/solicitacao';
import {SolicitacaoService} from '../solicitacao/solicitacao.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {StatusOpt} from '../../shared/consts/StatusOpt';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.css']
})
export class QuadroComponent implements OnInit {

  statuss = Object.keys(StatusOpt).map(key => ({ label: StatusOpt[key], value: key }));
  solicitacoes: Solicitacao[] = []
  solicitacoesBacklog: Solicitacao[];
  solicitacoesTodo: Solicitacao[];
  solicitacoesDoing: Solicitacao[];
  solicitacoesTest: Solicitacao[];
  solicitacoesDone: Solicitacao[];
  solicitacaoEdit = new Solicitacao();
  idsol: number;
  msgs: Message[] = [];
  constructor(private solicitacaoService: SolicitacaoService) { }

  ngOnInit() {
    this.findSolicitacoes();
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
    console.log("DATADATADATADASDSADSDSADSDSADAS");
    console.log(event.container.data);
    console.log(event.container.data[event.currentIndex]['id']);
    console.log(this.solicitacoes.filter(solicitacao => solicitacao.id === event.container.data[event.currentIndex]['id']));
    //this.solicitacaoEdit = Object.assign({},this.solicitacoes.filter(solicitacao => solicitacao.id === event.container.data[event.currentIndex]['id']))

    //this.edit(event.container.data[event.currentIndex]);
  }

  edit(solicitacao: Solicitacao) {
    this.solicitacaoEdit = Object.assign({}, solicitacao);
  }

  save() {
    this.solicitacaoService.save(this.solicitacaoEdit).subscribe( e => {
        this.solicitacaoEdit = new Solicitacao();
        this.findSolicitacoes();
        this.msgs = [{severity: 'success', summary: 'Confirmado',
          detail: 'Registro salvo com sucesso!'}];
      },
      error => {
        this.msgs = [{severity: 'error', summary: 'Erro',
          detail: 'Falha ao salvar o registro!'}];
      }
    );
  }
}

