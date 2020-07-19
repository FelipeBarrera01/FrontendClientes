import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { FormComponent } from './componentes/form/form.component';
import { InicioComponent } from './componentes/inicio/inicio.component';

import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { DetalleFacturaComponent } from './componentes/detalle-factura/detalle-factura.component';
import { FacturasService } from './facturas.service';
import { FacturasComponent } from './componentes/facturas/facturas.component';


const routes: Routes = [

  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'crear', component: FormComponent, canActivate: [ AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  { path: 'crear/:id', component: FormComponent, canActivate: [ AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'facturas/:id', component: DetalleFacturaComponent, canActivate: [ AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
  { path: 'facturas/form/:clienteId', component: FacturasComponent, canActivate: [ AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
