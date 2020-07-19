import { Component, OnInit, Input } from '@angular/core';
import { Clientes } from 'src/app/interfaces/Cliente';
import { ClienteService } from 'src/app/cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from 'src/app/modal.service';
import { AuthService } from 'src/app/auth.service';
import { Factura } from 'src/app/interfaces/Factura';
import { FacturasService } from 'src/app/facturas.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Clientes;
  titulo: string = 'Detalle del cliente';
  private fotoSeleccionada: File;
  progreso: number = 0;

  constructor(private service: ClienteService,
    private modalService: ModalService,
    private auth: AuthService,
    private facturaService: FacturasService
  ) { }

  ngOnInit() {

  }
  delete(factura: Factura): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estás seguro?',
      text: `Seguro  que desea eliminar la factura ${factura.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.facturaService.delete(factura.id).subscribe(
          response => {
            this.cliente.facturas = this.cliente.facturas.filter(f => f !== factura );
            swalWithBootstrapButtons.fire(
              'Factura eliminada',
              `Factura ${factura.descripcion} eliminado con éxito`,
              'success'
            )
          }
        );

      }
    });
  }
  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire(
        'Error seleccionar imagen: ',
        'El archivo debe ser tipo imagen',
        'error'
      );
      this.fotoSeleccionada = null;
    }

  }
  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire(
        'Error Upload: ',
        'debe seleccionar una foto',
        'error'
      );
    } else {
      this.service.subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe(cliente => {
          if (cliente.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((cliente.loaded / cliente.total) * 100);
          } else if (cliente.type === HttpEventType.Response) {
            let response: any = cliente.body;
            this.cliente = response.cliente as Clientes;
            this.modalService.notificarUpload.emit(this.cliente);
            Swal.fire(
              'La foto se ha subido completamente',
              response.mensaje,
              'success'
            );
          }

        });
    }
  }
}
