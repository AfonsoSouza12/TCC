import {Usuario} from './usuario';
import {Sprint} from './sprint';

export class Solicitacao {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  responsavel: Usuario;
  sprint: Sprint;
}
