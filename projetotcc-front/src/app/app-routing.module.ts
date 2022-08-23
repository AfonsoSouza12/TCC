import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrincipalComponent} from './principal/principal.component';
import {CargoComponent} from './cargo/cargo.component';
import {UsuarioComponent} from './usuario/usuario.component';
import {EtapaComponent} from './etapa/etapa.component';
import {SubEtapaComponent} from './sub-etapa/sub-etapa.component';
import {ProjetoComponent} from './projeto/projeto.component';
import {SolicitacaoComponent} from './solicitacao/solicitacao.component';
import {SprintComponent} from './sprint/sprint.component';
import {LoginService} from './login/login.service';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth-guard.service';
import {QuadroComponent} from './quadro/quadro.component';
import {AcessoNegadoComponent} from './acesso-negado/acesso-negado.component';
import {PaginaNaoEncontradaComponent} from './pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
  {
    path: '', canActivate: [LoginService], children: [
      {path: '', component: PrincipalComponent },
      {path: 'cargo', component: CargoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN']}},
      {path: 'etapa', component: EtapaComponent},
      {path: 'subEtapa', component: SubEtapaComponent},
      {path: 'subEtapa/novo', component: SubEtapaComponent},
      {path: 'projeto', component: ProjetoComponent,
       canActivate: [AuthGuard],
      data: { roles: ['ROLE_ADMIN']}},
      {path: 'solicitacao', component: SolicitacaoComponent
        //canActivate: [AuthGuard],
       // data: { roles: ['ROLE_ADMIN', 'ROLE_USER']}
       },
      {path: 'sprint', component: SprintComponent},
      {path: 'usuario', component: UsuarioComponent},
      {path: 'quadro', component: QuadroComponent},
      {path: 'acesso-negado', component: AcessoNegadoComponent},
      // {path: '**', component: PaginaNaoEncontradaComponent}
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
