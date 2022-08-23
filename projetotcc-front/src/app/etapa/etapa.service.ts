import { Injectable } from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {Etapa} from '../model/etapa';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtapaService extends CrudService<Etapa, number>{

  constructor(http: HttpClient) {
    super(environment.api + '/etapa', http);
  }

  deleteEtapa(id: number): Observable<void> {
    const url = `${this.getUrl()}/delete/${id}`;
    return this.http.delete<void>(url);
  }
}
