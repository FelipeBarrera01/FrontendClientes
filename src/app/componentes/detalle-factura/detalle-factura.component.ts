import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/facturas.service';
import { Factura } from 'src/app/interfaces/Factura';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent implements OnInit {

  factura: Factura;
  titulo: string = 'Factura';
  constructor(private facturasService: FacturasService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.facturasService.getFactura(id).subscribe(factura => this.factura = factura);
    });
  }

}
