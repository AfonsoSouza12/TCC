import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CargoComponent } from './cargo/cargo.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {ConfirmationService, FilterService, MessageService, PrimeNGConfig} from 'primeng/api';
import {UsuarioService} from './usuario/usuario.service';
import {SubEtapa} from './model/sub-etapa';
import {SubEtapaService} from './sub-etapa/sub-etapa.service';
import {EtapaService} from './etapa/etapa.service';
import {ButtonModule} from 'primeng/button';
import { MenuComponent } from './menu/menu.component';
import {MenubarModule} from 'primeng/menubar';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {DropdownModule} from 'primeng/dropdown';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';
import { ProjetoComponent } from './projeto/projeto.component';
import {CalendarModule} from 'primeng/calendar';
import { SprintComponent } from './sprint/sprint.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {LoginComponent} from './login/login.component';
import {LoginService} from './login/login.service';
import {ProjetoService} from './projeto/projeto.service';
import {SolicitacaoService} from './solicitacao/solicitacao.service';
import {LoginModule} from './login/login.module';
import {HttpClientInterceptor} from './http-client-interceptor';
import { QuadroComponent } from './quadro/quadro.component';
import {DragDropModule, DragDropRegistry} from '@angular/cdk/drag-drop';
import {ScrollDispatcher, ViewportRuler} from '@angular/cdk/overlay';
import {Platform} from '@angular/cdk/platform';
import {CardModule} from 'primeng/card';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import {ChartModule} from 'primeng/chart';
import { PdfPageComponent } from './pdf-page/pdf-page.component';
import {PasswordModule} from 'primeng/password';



@NgModule({
  declarations: [
    AppComponent,
    CargoComponent,
    EtapaComponent,
    PrincipalComponent,
    SubEtapaComponent,
    UsuarioComponent,
    MenuComponent,
    SolicitacaoComponent,
    ProjetoComponent,
    SprintComponent,
    QuadroComponent,
    AcessoNegadoComponent,
    PaginaNaoEncontradaComponent,
    PdfPageComponent,
  ],
  imports: [
    LoginModule,
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
    PanelModule,
    InputTextModule,
    CascadeSelectModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    DragDropModule,
    CardModule,
    ChartModule,
    PasswordModule,

  ],
  exports:[AppComponent],
  entryComponents: [PdfPageComponent],
  providers: [
    CargoService,
    ConfirmationService,
    UsuarioService,
    SubEtapaService,
    EtapaService,
    ProjetoService,
    SolicitacaoService,
    LoginService,
    MessageService,
    FilterService,
    PrimeNGConfig,
    ViewportRuler,
    Platform,
    DragDropModule,
    DragDropRegistry,
    ScrollDispatcher,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
