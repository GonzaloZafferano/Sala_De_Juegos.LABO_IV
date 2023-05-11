import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  guardarItem(clave: string, valor: any) {
    localStorage.setItem(clave, JSON.stringify(valor));
  }

  obtenerItem(clave: string) {
    const item = localStorage.getItem(clave);
    if (item != null)
      return JSON.parse(item);
    else
      return item;
  }

  eliminarItem(clave: string) {
    localStorage.removeItem(clave);
  }
}
