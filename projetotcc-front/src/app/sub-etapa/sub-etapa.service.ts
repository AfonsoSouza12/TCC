import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SubEtapa} from '../model/sub-etapa';
import {CrudService} from '../generic/crud.service';

@Injectable({
  providedIn: 'root'
})
export class SubEtapaService extends CrudService<SubEtapa, number>{

  constructor(http: HttpClient) {
    super(environment.api + '/subEtapa', http);
  }
}
