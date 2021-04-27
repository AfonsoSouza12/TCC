import { Injectable } from '@angular/core';
import {CrudService} from '../generic/crud.service';
import {Projeto} from '../model/projeto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Sprint} from '../model/sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService extends CrudService<Sprint, number>{

  constructor(http: HttpClient) {
    super(environment.api + '/sprint', http);
  }
}
