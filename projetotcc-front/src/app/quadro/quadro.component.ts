import { Component, OnInit } from '@angular/core';
import {Solicitacao} from '../model/solicitacao';
import {SolicitacaoService} from '../solicitacao/solicitacao.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.css']
})
export class QuadroComponent implements OnInit {

  solicitacoes: Solicitacao[];
  constructor(private solicitacaoService: SolicitacaoService) { }

  ngOnInit() {
    this.findSolicitacoes();
  }

  findSolicitacoes() {
    this.solicitacaoService.findAll().subscribe( e => this.solicitacoes = e);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.solicitacoes, event.previousIndex, event.currentIndex);
  }
}
