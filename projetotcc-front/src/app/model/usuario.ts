import {Cargo} from './cargo';
import {Permissao} from './permissao';

export class Usuario {
  id: number
  nome: string
  username: string
  password: string
  cargo: Cargo;
  permissoes: Permissao[];
}
