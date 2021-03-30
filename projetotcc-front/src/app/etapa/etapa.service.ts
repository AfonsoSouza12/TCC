import { Injectable } from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {SubEtapa} from '../model/sub-etapa';
import {Etapa} from '../model/etapa';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EtapaService extends CrudService<Etapa, number>{

  constructor(http: HttpClient) {
    super(environment.api + '/etapa', http);
  }
}
