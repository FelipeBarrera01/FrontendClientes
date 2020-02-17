import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { ClienteService } from './cliente.service';
import {HttpClientModule} from '@angular/common/http';
import { FormComponent } from './componentes/form/form.component';
import {FormsModule} from '@angular/forms';
import { PaginatorComponent } from './componentes/paginator/paginator.component';
import {MatDatepickerModule} from '@angular/material';
import { MatMomentDateModule} from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetalleComponent } from './componentes/detalle/detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    FooterComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,MatDatepickerModule, MatMomentDateModule, BrowserAnimationsModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
