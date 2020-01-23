import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clientes } from './interfaces/Cliente';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes'
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });



  constructor(private http: HttpClient, private router: Router) { }
  getClientes(): Observable<Clientes[]> {

    return this.http.get<Clientes[]>(this.urlEndPoint);
  }
  create(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(this.urlEndPoint, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e=>{

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: e.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
        return throwError(e);
      })
    );
      
  }
  getCliente(id): Observable<Clientes> {
    return this.http.get<Clientes>(`${this.urlEndPoint}/${id}`).pipe(



      catchError(e => {
        this.router.navigate(['/inicio']);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: e.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
        return throwError(e);
      })
    );
  }
  update(cliente: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e=>{

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: e.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
        return throwError(e);
      })
    );
  }
  delete(id: number): Observable<Clientes> {
    return this.http.delete<Clientes>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }
}