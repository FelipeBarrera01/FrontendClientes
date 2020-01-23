import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { FormComponent } from './componentes/form/form.component';


const routes: Routes = [
  {path: '', redirectTo:'inicio', pathMatch:'full', component: ClientesComponent},
  {path:'crear', component: FormComponent},
  {path:'crear/:id', component: FormComponent},
  {path: 'clientes', component: ClientesComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
