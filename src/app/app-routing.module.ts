import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { FormComponent } from './componentes/form/form.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';


const routes: Routes = [

  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'crear', component: FormComponent },
  { path: 'crear/:id', component: FormComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'detalle/:id', component: DetalleComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
