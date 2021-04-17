import {Usuario} from './usuario';

export class Etapa {
  id: number;
  nome: string;
  descricao: string;
  status: string;
  responsavel: Usuario;
}
