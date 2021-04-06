import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  msgs: Message[] = [];

  constructor(private loginService: LoginService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loginService.isAuthenticated.next(false);
  }

  login() {
    this.loginService.login(this.username, this.password).subscribe(e => {
      this.router.navigate(['/']);
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Error',
                    detail: 'Usuário e/ou senha incorreto(s)!'});
    });
  }

}
