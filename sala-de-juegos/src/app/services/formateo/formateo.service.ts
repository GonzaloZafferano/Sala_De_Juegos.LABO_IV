import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormateoService {
  constructor() { }

  obtenerFechaString(fecha: any, aaaaMMdd: boolean = false, hms: boolean = false) {
    if (!(fecha instanceof Date))
      fecha = new Date(fecha.fecha.seconds * 1000);

    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let anio = fecha.getFullYear();

    let cadenaDia = dia < 10 ? '0' + dia.toString() : dia.toString();
    let cadenaMes = mes < 10 ? '0' + mes.toString() : mes.toString();

    if (hms) {
      let hora = fecha.getHours();
      let minutos = fecha.getMinutes();
      let segundos = fecha.getSeconds();

      let cadenaHoras = hora < 10 ? '0' + hora.toString() : hora.toString();
      let cadenaMinutos = minutos < 10 ? '0' + minutos.toString() : minutos.toString();
      let cadenaSegundos = segundos < 10 ? '0' + segundos.toString() : segundos.toString();

      if (aaaaMMdd)
        return anio.toString() + '-' + cadenaMes + '-' + cadenaDia + ' ' + cadenaHoras + ':' + cadenaMinutos + ':' + cadenaSegundos;
      return cadenaDia + '-' + cadenaMes + '-' + anio.toString() + ' ' + cadenaHoras + ':' + cadenaMinutos + ':' + cadenaSegundos;
    }
    if (aaaaMMdd)
      return anio.toString() + '-' + cadenaMes + '-' + cadenaDia;
    return cadenaDia + '-' + cadenaMes + '-' + anio.toString();
  }
}
