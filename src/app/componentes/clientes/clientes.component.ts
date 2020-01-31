import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../cliente.service';
import { Clientes } from '../../interfaces/Cliente';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  clientes: Clientes[] = [];
  paginador:any;



  constructor(private clienteService: ClienteService,
    private routerActivate: ActivatedRoute
  ) { }

  ngOnInit() {

    this.routerActivate.paramMap.subscribe(params => {

      let page:number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.clienteService.getClientes(page).pipe(
        tap((response: any) => {
          (response.content as Clientes[]).forEach(cliente => {

          });
        })
      ).subscribe(
        response =>{
          this.clientes = response.content as Clientes[];
          this.paginador = response;
          
        } 
      );
    });
  }
  delete(cliente: Clientes): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estás seguro?',
      text: `Seguro  que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => {
              cli !== cliente
            });
            swalWithBootstrapButtons.fire(
              'Cliente eliminado',
              `Cliente ${cliente.nombre} eliminado con éxito`,
              'success'
            )
          }
        );

      }
    })
  }

}
