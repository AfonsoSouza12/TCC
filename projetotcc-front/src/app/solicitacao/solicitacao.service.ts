import { Injectable } from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {Etapa} from '../model/etapa';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Solicitacao} from '../model/solicitacao';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService extends CrudService<Solicitacao, number>{

  constructor(http: HttpClient) {
    super(environment.api + '/solicitacao', http);
  }
}
