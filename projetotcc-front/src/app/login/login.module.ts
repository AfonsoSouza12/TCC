import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {LoginService} from './login.service';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { ToastModule } from 'primeng/toast';
import {PasswordModule} from 'primeng/password';
import {PanelModule} from 'primeng/panel';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ToastModule,
    PasswordModule,
    PanelModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule {
}
