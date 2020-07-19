import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Observable, throwError, pipe } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Clientes } from './interfaces/Cliente';
import { catchError, map, take, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Region } from './interfaces/Region';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:9080/api/clientes'
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });




  constructor(private http: HttpClient, private router: Router) { }
  /*
    private agregarAuthorizationHeader() {
      let token = this.auth.token;
      if ( token != null ) {
        return this.httpHeaders.append('Authorization', 'Bearer ' + token);
      }
      return this.httpHeaders;
    }


    private isNoAutorizado(e): boolean {
      if(e.status == 401 ){
        if(this.auth.isAuthenticated()){
          this.auth.logout();
        }
        this.router.navigate(['/login']);
        return true;
      }
      if ( e.status == 403){
        Swal.fire(
          'Acceso denegado', `Hola ${this.auth.usuario.username} no tienes acceso a este recurso!`, 'warning'
        );
        this.router.navigate(['/clientes']);
        return true;
      }
      return false;
    }
   */
  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }

  getClientes(page: number): Observable<any[]> {

    return this.http.get<Clientes[]>(this.urlEndPoint + '/page/' + page).pipe(

      tap((response: any) => {
        (response.content as Clientes[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map((response: any) => {

        (response.content as Clientes[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        });
        return response;
      }),
      tap(response => {
        (response.content as Clientes[]).forEach(cliente => {

        });
      })
    );
  }
  create(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(this.urlEndPoint, cliente)
    .pipe(
      map((response:any) => response.cliente as Clientes),
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        if(e.error.message){
        console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
  getCliente(id): Observable<Clientes> {
    return this.http.get<Clientes>(`${this.urlEndPoint}/${id}`).pipe(

      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
        }
        if(e.error.message) {
          console.error(e.error.mensaje);
          }
        return throwError(e);
      })
    );
  }
  update(cliente: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }
        if(e.error.message){
          console.error(e.error.mensaje);
          }
        return throwError(e);
      })
    );
  }
  delete(id: number): Observable<Clientes> {
    return this.http.delete<Clientes>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(
        e => {
          if(e.error.message){
            console.error(e.error.mensaje);
            }
          return throwError(e);
        }
      )
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true

    });

    return this.http.request(req);


  }


}
