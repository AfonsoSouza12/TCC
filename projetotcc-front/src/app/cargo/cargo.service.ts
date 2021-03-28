import { Injectable } from '@angular/core';
import {Cargo} from '../model/cargo';
import {CrudService} from '../generic/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargoService extends CrudService<Cargo,number>{

  constructor(http: HttpClient) {
    super(environment.api + '/cargo',http);
  }
}
