import { Component, OnInit } from '@angular/core';
import { Clientes } from 'src/app/interfaces/Cliente';
import { ClienteService } from 'src/app/cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente: Clientes;
  titulo: string = 'Detalle del cliente';
  constructor(private service: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        this.service.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        });
      }
    });
  }

}
