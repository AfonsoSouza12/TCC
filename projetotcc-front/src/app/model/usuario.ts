import {Cargo} from './cargo';
import {Permissao} from './permissao';

export class Usuario {
  id: number
  nome: string
  cargo: Cargo;
  permissoes: Permissao[];
}
