import { Injectable } from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Projeto} from '../model/projeto';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService extends CrudService<Projeto, number>{

  constructor(http: HttpClient) {
    super(environment.api + '/projeto', http);
  }
}
