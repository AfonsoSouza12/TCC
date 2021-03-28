import {Projeto} from './projeto';

export class Sprint {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataLimite: Date;
  dataFim: Date;
  projeto: Projeto;
}
