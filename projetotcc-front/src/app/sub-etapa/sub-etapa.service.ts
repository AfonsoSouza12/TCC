import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SubEtapa} from '../model/sub-etapa';
import {CrudService} from '../generic/crud.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubEtapaService extends CrudService<SubEtapa, number>{

  constructor(http: HttpClient) {
    super(environment.api + '/subEtapa', http);
  }



  findByEtapa(etapa: number): Observable<SubEtapa[]>{
    return this.http.get<SubEtapa[]>(`${this.getUrl()}/etapa?etapa=${etapa}`);
     }
}
