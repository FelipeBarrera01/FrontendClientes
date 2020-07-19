import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'App angular';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  logout():void{

    Swal.fire(
      'Logout', `Hola ${this.auth.usuario.username}, has cerrado sesión`, 'success'
    );
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
