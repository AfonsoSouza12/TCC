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


@NgModule({
  declarations: [
    AppComponent,
    CargoComponent,
    EtapaComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TableModule
  ],
  exports:[AppComponent],
  providers: [CargoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
