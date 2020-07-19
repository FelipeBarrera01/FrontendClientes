import { ItemFactura } from './ItemFactura';
import { Clientes } from './Cliente';

export class Factura {
  id: number;
  descripcion: string;
  observacion: string;
  items: ItemFactura [];
  cliente: Clientes;
  total: number;
  createAt: string;

  calcularGranTotal(): number {
    this.total = 0;
    this.items.forEach((item: ItemFactura) =>{
      this.total += item.calcularImporte();
    });
    return this.total;
  }
}
