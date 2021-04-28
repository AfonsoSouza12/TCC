import {Usuario} from './usuario';
import {Sprint} from './sprint';
import {Projeto} from './projeto';
import {Etapa} from './etapa';

export class Solicitacao {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  responsavel: Usuario;
  projeto: Projeto;
  etapa: Etapa;
  sprint: Sprint;
}
