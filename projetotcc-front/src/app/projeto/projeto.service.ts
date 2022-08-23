import { Injectable } from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Projeto} from '../model/projeto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService extends CrudService<Projeto, number>{

  constructor(http: HttpClient) {
    super(environment.api + '/projeto', http);
  }

  deleteProjeto(id: number): Observable<void> {
    const url = `${this.getUrl()}/delete/${id}`;
    return this.http.delete<void>(url);
  }

}
