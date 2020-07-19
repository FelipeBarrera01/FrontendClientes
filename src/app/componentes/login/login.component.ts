import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = 'haga login';
  usuario: Usuario;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.isAuthenticated() ) {
      Swal.fire(
        'Login', `Hola ${this.auth.usuario.username } ya estás autenticado`, 'info'
      );
      this.router.navigate(['/clientes']);
    }
  }

  login():void{
    if(this.usuario.username == null || this.usuario.password) {
      Swal.fire(
        'Error Login', 'Username o password vacías', 'error'
      );
      return;
      this.auth.login(this.usuario).subscribe(res => {
        let payload = JSON.parse(atob(res.access_token.split('.')[1]));
        this.auth.guardarUsuario(res.access_token);
        this.auth.guardarToken(res.access_token);
        let usuario = this.auth.usuario;
        this.router.navigate(['/clientes']);
        Swal.fire(
          'Login', `Hola ${payload.user_name}, has iniciado sesión con éxito!` , 'success'
        );
      }, err => {
        if ( err.status === 400) {
          Swal.fire(
            'Error Login', 'Username o password incorrecta', 'error'
          );
        }
      }

      );
    }
  }


}
