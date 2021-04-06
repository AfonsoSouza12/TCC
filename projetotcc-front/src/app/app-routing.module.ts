import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PrincipalComponent} from './principal/principal.component';
import {CargoComponent} from './cargo/cargo.component';
import {UsuarioComponent} from './usuario/usuario.component';
import {EtapaComponent} from './etapa/etapa.component';
import {SubEtapaComponent} from './sub-etapa/sub-etapa.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'cargo', component: CargoComponent},
  {path: 'etapa', component: EtapaComponent},
  {path: 'subEtapa', component: SubEtapaComponent},
  {path: 'usuario', component: UsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
