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

const routes: Routes = [
  {
    path: '', canActivate: [LoginService], children: [
      { path: 'principal', component: PrincipalComponent },
      {path: 'cargo', component: CargoComponent},
      {path: 'etapa', component: EtapaComponent},
      {path: 'subEtapa', component: SubEtapaComponent},
      {path: 'subEtapa/novo', component: SubEtapaComponent},
      {path: 'projeto', component: ProjetoComponent},
      {path: 'solicitacao', component: SolicitacaoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_USER']}
       },
      {path: 'sprint', component: SprintComponent},
      {path: 'usuario', component: UsuarioComponent}
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
