import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../generic/crud.service';
import {SubEtapa} from '../model/sub-etapa';
import {Usuario} from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<Usuario, number> {

  constructor(http: HttpClient) {
    super(environment.api + '/usuario', http);
  }
}
