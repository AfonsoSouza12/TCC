import { Injectable } from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {Etapa} from '../model/etapa';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Solicitacao} from '../model/solicitacao';
import {Observable} from 'rxjs';
import {SubEtapa} from '../model/sub-etapa';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService extends CrudService<Solicitacao, number>{

  constructor(http: HttpClient) {
    super(environment.api + '/solicitacao', http);
  }

  findByStatus(status: string): Observable<Solicitacao[]>{
    return this.http.get<Solicitacao[]>(`${this.getUrl()}/solicitacao/busca-status/${status}`);
  }
}
