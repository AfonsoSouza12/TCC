import { Injectable } from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {Etapa} from '../model/etapa';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Solicitacao} from '../model/solicitacao';
import {Observable} from 'rxjs';
import {SubEtapa} from '../model/sub-etapa';
import {Usuario} from '../model/usuario';
import {Sprint} from '../model/sprint';
import {Projeto} from '../model/projeto';
import {Page} from '../generic/page';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService extends CrudService<Solicitacao, number>{

  constructor(http: HttpClient) {
    super(environment.api + '/solicitacao', http);
  }

  findByStatus(status: string): Observable<Solicitacao[]>{
    return this.http.get<Solicitacao[]>(`${this.getUrl()}/busca-status/${status}`);
  }

  findFiltro(projetoId: number, sprintId: number, responsavelId: number){
    //return this.http.get<Solicitacao[]>(`${this.getUrl()}/filtra-quadro/${projetoId}/${sprintId}/${responsavelId}`);
    return this.http.get<Solicitacao[]>(`${this.getUrl()}/filtra-quadro/projetoId=${projetoId}&sprintId=${sprintId}&responsavelId=${responsavelId}`);
  }

  // findFiltrado(projetoId: number, sprintId: number, responsavelId: number) {
  //   let url = `${this.getUrl()}/filtra-quadro/projeto=${projetoId}&sprint=${sprintId}&responsavel=${responsavelId}`;
  //   // if (order) {
  //   //   url += `&order=${order}`;
  //   // }
  //   // if (asc !== undefined) {
  //   //   url += `&asc=${asc}`;
  //   // }
  //   return this.http.get<Solicitacao[]>(url);
  //}
}
