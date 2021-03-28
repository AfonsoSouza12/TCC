import {Usuario} from './usuario';

export class Projeto {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataLimite: Date;
  dataFim: Date;
  responsavel: Usuario;
}
