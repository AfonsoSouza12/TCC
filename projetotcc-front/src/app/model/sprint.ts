import {Projeto} from './projeto';
import {Usuario} from './usuario';

export class Sprint {
  id: number;
  nome: string;
  dataInicio: Date;
  dataLimite: Date;
  dataFim: Date;
  projeto: Projeto;
  responsavel: Usuario;
}
