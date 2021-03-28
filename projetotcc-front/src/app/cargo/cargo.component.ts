import { Component, OnInit } from '@angular/core';
import {Cargo} from '../model/cargo';
import {ConfirmationService, Message} from 'primeng/api';
import {CargoService} from './cargo.service';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {
  cargos: Cargo[];
  cargoEdit = new Cargo();
  showDialog = false;
  msgs: Message[] = [];

  constructor(private cargoService: CargoService,
              private confirmationService : ConfirmationService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll(){
    this.cargoService.findAll().subscribe(e=> this.cargos = e);
  }

  newEntity(){
    this.cargoEdit = new Cargo();
    this.showDialog = true;
  }

  save() {
    this.cargoService.save(this.cargoEdit).subscribe( e => {
        this.cargoEdit = new Cargo();
        this.findAll();
        this.showDialog = false;
        this.msgs = [{severity: 'success', summary: 'Confirmado',
          detail: 'Registro salvo com sucesso!'}];
      },
      error => {
        this.msgs = [{severity: 'error', summary: 'Erro',
          detail: 'Falha ao salvar o registro!'}];
      }
    );
  }
  cancel() {
    this.showDialog = false;
    this.cargoEdit = new Cargo();
  }

  edit(Cargo: Cargo) {
    // this.cargoEdit = Cargo;
    this.cargoEdit = Object.assign({}, Cargo);
    this.showDialog = true;
  }

  delete(Cargo: Cargo) {
    this.confirmationService.confirm({
      message: 'Esta ação não poderá ser desfeita!',
      header: 'Deseja remover o registro?',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.cargoService.delete(Cargo.id).subscribe(() => {
          this.findAll();
          this.msgs = [{severity: 'success', summary: 'Confirmado',
            detail: 'Registro removido com sucesso!'}];
        }, error => {
          this.msgs = [{severity: 'error', summary: 'Erro',
            detail: 'Falha ao remover o registro!'}];
        });
      }
    });
  }
}
