import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.auth.isAuthenticated()) {
      if (this.isTokenExpirado()) {
        this.auth.logout();
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    let role = next.data['role'] as string;
    if (this.auth.hasRole(role)) {
      return true;
    }
    Swal.fire(
      'Acceso denegado', `Hola ${this.auth.usuario.username} no tienes acceso a este recurso!`, 'warning'
    );
    this.router.navigate(['/clientes']);
    return false;
  }

  isTokenExpirado(): boolean{
  let token = this.auth.token;
  let payload = this.auth.obtenerDatosToken(token);
  let now = new Date().getTime() / 1000;

  if( payload.exp < now){
    return true;
  }
  return false;
  }
}
