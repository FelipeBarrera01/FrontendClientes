import { Component, OnInit } from '@angular/core';
import { Clientes } from 'src/app/interfaces/Cliente';
import { ClienteService } from '../../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private cliente: Clientes;
  private titulo: string = "Crear cliente";
  private errores: string[];

  constructor(private service: ClienteService, private router: Router, private activateRouter: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }
  cargarCliente(): void {
     this.activateRouter.params.subscribe(params=>{
       let id = params['id'];
       if(id){
        this.service.getCliente(id).subscribe(res =>{
          this.cliente = res;
        });
       }
     });
  }
  create() {
    this.service.create(this.cliente).subscribe(
      response => {
        this.router.navigate(['/cliente']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `El cliente ${response.nombre} se ha creado con exito`,
          showConfirmButton: false,
          timer: 1500
        });
      },
      err =>{
        this.errores = err.error.errors as string[];
      }
    );

  }
  update():void{
    this.service.update(this.cliente).subscribe(cliente =>{
      this.router.navigate(['/cliente']);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `El cliente ${cliente.nombre} se ha actualizado con exito`,
        showConfirmButton: false,
        timer: 1500
      });
    },
    err =>{
      this.errores = err.error.errors as string[];
    });
  }
}
