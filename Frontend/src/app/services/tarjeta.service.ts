import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TarjetaCredito } from '../models/tarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  url = 'https://localhost:44384/';
  apiUrl = 'api/TarjetaCredito/';
  list: TarjetaCredito[];
  private actualizarFormulario = new BehaviorSubject<TarjetaCredito>({} as any);

  constructor(private http: HttpClient) {

  }

  addTarjeta(tarjeta: TarjetaCredito): Observable<TarjetaCredito>{

    return this.http.post<TarjetaCredito>(this.url + this.apiUrl, tarjeta);
  }

  getTarjeta(){
    this.http.get(this.url + this.apiUrl).toPromise().then(data => {
      this.list = data as TarjetaCredito[];
    });
  }

  deteleTarjeta(id: number): Observable<TarjetaCredito>{
    return this.http.delete<TarjetaCredito>(this.url + this.apiUrl + id);
  }

  updateTarjetaCredito(id: number, tarjeta: TarjetaCredito): Observable<TarjetaCredito>{
    return this.http.put<TarjetaCredito>(this.url + this.apiUrl + id, tarjeta);
  }

  updateTarjeta(tarjeta){
    this.actualizarFormulario.next(tarjeta);

  }

  obtenerTarjeta(): Observable<TarjetaCredito>{
    return this.actualizarFormulario.asObservable();
  }

}
