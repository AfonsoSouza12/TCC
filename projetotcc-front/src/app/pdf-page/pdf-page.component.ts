import {Component, EventEmitter, OnInit} from '@angular/core';
import {Solicitacao} from '../model/solicitacao';

@Component({
  selector: 'app-pdf-page',
  templateUrl: './pdf-page.component.html',
  styleUrls: ['./pdf-page.component.css']
})
export class PdfPageComponent implements OnInit {

  solicitacoesBacklog: Solicitacao[];
  solicitacoesTodo: Solicitacao[];
  solicitacoesDoing: Solicitacao[];
  solicitacoesTest: Solicitacao[];
  solicitacoesDone: Solicitacao[];
  title: string;

  emitter: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.emitter.emit();
  }

}
