import { Component, OnInit } from '@angular/core';
import {SolicitacaoService} from '../solicitacao/solicitacao.service';
import {Solicitacao} from '../model/solicitacao';
import {cores} from '../../shared/consts/cores';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  solicitacoes: Solicitacao[];
  solicitacoesBacklog: Solicitacao[];
  solicitacoesTodo: Solicitacao[];
  solicitacoesDoing: Solicitacao[];
  solicitacoesTest: Solicitacao[];
  solicitacoesDone: Solicitacao[];
  usuarioId:  number;
  data: any;
  cores = cores;

  constructor(private solicitacaoService: SolicitacaoService) {
    this.usuarioId =  JSON.parse(localStorage.getItem('usuario')).principal.id;
  }

  ngOnInit() {
    this.findSolicitacoes();
  }

  findSolicitacoes(){
    this.solicitacaoService.findSolicitacoesUsuario(this.usuarioId).subscribe( e => {
      this.solicitacoes = e;

      this.solicitacoesBacklog = this.solicitacoes.filter(solicitacao => solicitacao.status === "Backlog");
      this.solicitacoesTodo = this.solicitacoes.filter(solicitacao => solicitacao.status === "To Do");
      this.solicitacoesDoing = this.solicitacoes.filter(solicitacao => solicitacao.status === "Doing");
      this.solicitacoesTest = this.solicitacoes.filter(solicitacao => solicitacao.status === "Test");
      this.solicitacoesDone = this.solicitacoes.filter(solicitacao => solicitacao.status === "Done");

      this.data = {
        labels: ['Backlog','To Do','Doing','Test','Done'],
        datasets: [
          {
            data: [this.solicitacoesBacklog.length,
                   this.solicitacoesTodo.length,
                   this.solicitacoesDoing.length,
                   this.solicitacoesTest.length,
                   this.solicitacoesDone.length],
            backgroundColor: [
              cores.corBacklog,
              cores.corToDo,
              cores.corDoing,
              cores.corTest,
              cores.corDone,

            ],
            hoverBackgroundColor: [
              cores.corBacklog,
              cores.corToDo,
              cores.corDoing,
              cores.corTest,
              cores.corDone,
            ]
          }
        ]
      };


    });

  }

  teste(){

  }

}
