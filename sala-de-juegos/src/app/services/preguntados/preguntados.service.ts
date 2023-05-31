import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  constructor(private http: HttpClient) { }

  obtenerImagenes() {
    return this.http.get('https://digimon-api.vercel.app/api/digimon');
  }
}
