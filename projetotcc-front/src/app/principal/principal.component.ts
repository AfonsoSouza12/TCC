import { Component, OnInit } from '@angular/core';
import {SolicitacaoService} from '../solicitacao/solicitacao.service';
import {Solicitacao} from '../model/solicitacao';
import {cores} from '../../shared/consts/cores';
import {ProjetoService} from '../projeto/projeto.service';
import {SprintService} from '../sprint/sprint.service';
import {Projeto} from '../model/projeto';
import {Sprint} from '../model/sprint';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
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
  chartOptions: any;
  projetos: Projeto[];
  projetosAtivos: number;
  sprints: Sprint[];
  sprintsAtivos: number;

  constructor(private solicitacaoService: SolicitacaoService,
              private projetoService: ProjetoService,
              private sprintService: SprintService,
             ) {
    this.usuarioId =  JSON.parse(localStorage.getItem('usuario')).principal.id;
  }

  ngOnInit() {
    this.findSolicitacoes();
    this.findProjetos();
    this.findSprints();
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
      this.chartOptions = {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: "white",
            usePointStyle: true
          },
        }
      }


    });

  }

  findProjetos(){
    this.projetosAtivos = 0;
    this.projetoService.findAll().subscribe(e=>{
      this.projetos = e;

      for(var projeto of this.projetos){
        if(projeto.responsavel.id == this.usuarioId && projeto.dataFim == null){
          this.projetosAtivos++;
        }
      }
    })
  }

  findSprints(){
    this.sprintsAtivos = 0;
    this.sprintService.findAll().subscribe(e=>{
      this.sprints = e;
      for(var sprint of this.sprints){
        if(sprint.responsavel.id == this.usuarioId && sprint.dataFim == null){
          this.sprintsAtivos++;
        }
      }
    })
  }
  }
