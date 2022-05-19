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

  findFiltro(projetoId: number, sprintId: number, responsavelId: number) {
    let url = `${this.getUrl()}/filtra-quadro`;
    if (projetoId != null) {
      url += `?projetoId=${projetoId}`;
    }
    if (projetoId == null && sprintId != null) {
      url += `?sprintId=${sprintId}`;
    }
    else if(sprintId != null){
      url += `&sprintId=${sprintId}`;
    }
    if (projetoId == null && sprintId == null && responsavelId != null) {
      url += `?responsavelId=${responsavelId}`;
    }
    else if(responsavelId != null){
      url += `&responsavelId=${responsavelId}`;
    }
    if(projetoId == null && sprintId == null && responsavelId == null){
      return this.findAll();
    }

    return this.http.get<Solicitacao[]>(url);
  }
}
