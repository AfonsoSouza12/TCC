import { Component, OnInit } from '@angular/core';
import {Solicitacao} from '../model/solicitacao';
import {SolicitacaoService} from '../solicitacao/solicitacao.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {StatusOpt} from '../../shared/consts/StatusOpt';

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
  }
}

