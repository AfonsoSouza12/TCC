import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CargoComponent } from './cargo/cargo.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {CargoService} from './cargo/cargo.service';
import {TableModule} from 'primeng/table';
import { EtapaComponent } from './etapa/etapa.component';
import {PrincipalComponent} from './principal/principal.component';
import { SubEtapaComponent } from './sub-etapa/sub-etapa.component';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { UsuarioComponent } from './usuario/usuario.component';
import {ConfirmationService, FilterService, PrimeNGConfig} from 'primeng/api';
import {UsuarioService} from './usuario/usuario.service';
import {SubEtapa} from './model/sub-etapa';
import {SubEtapaService} from './sub-etapa/sub-etapa.service';
import {EtapaService} from './etapa/etapa.service';
import {ButtonModule} from 'primeng/button';
import { MenuComponent } from './menu/menu.component';
import {MenubarModule} from 'primeng/menubar';


@NgModule({
  declarations: [
    AppComponent,
    CargoComponent,
    EtapaComponent,
    PrincipalComponent,
    SubEtapaComponent,
    UsuarioComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    ButtonModule,
    MenubarModule,

  ],
  exports:[AppComponent],
  providers: [
    CargoService,
    ConfirmationService,
    UsuarioService,
    SubEtapaService,
    EtapaService,
    FilterService,
    PrimeNGConfig,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
