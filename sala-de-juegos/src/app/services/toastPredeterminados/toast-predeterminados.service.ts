import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastPredeterminadosService {
  constructor(private toastr: ToastrService) { }

  exito(mensaje : string = '', titulo : string = ''){
    const successOptions = {
      toastClass: 'toast-custom-success',
      timeOut: 4000,
      extendedTimeOut: 1000,
      enableHtml: true,
      positionClass: 'toast-custom-position',
    };

    this.toastr.success(mensaje != '' ? mensaje : 'Se ha completado la operación con éxito!.', 
    titulo != '' ? titulo : 'Operación exitosa.', 
    successOptions);
  }

  error(mensaje : string = '', titulo : string = ''){
    const errorOptions = {
      toastClass: 'toast-custom-error',
      timeOut: 4000,
      extendedTimeOut: 1000,
      enableHtml: true,
      positionClass: 'toast-custom-position',
    };

    this.toastr.error(mensaje != '' ? mensaje : 'Ha ocurrido un error al procesar la operación.', 
    titulo != '' ? titulo : 'Ha ocurrido un error.', 
    errorOptions);
  }

  perdio(mensaje : string = '', titulo : string = '', timeOut : number = 4000){
    const errorOptions = {
      toastClass: 'toast-custom-perdio',
      timeOut: timeOut,
      extendedTimeOut: 1000,
      enableHtml: true,
      positionClass: 'toast-custom-juego-position',
    };

    this.toastr.error(mensaje != '' ? mensaje : 'HA PERDIDO!!!.', 
    titulo != '' ? titulo : 'Ha perdido.', 
    errorOptions);
  }

  gano(mensaje : string = '', titulo : string = '', timeOut : number = 5000){
    const successOptions = {
      toastClass: 'toast-custom-gano',
      timeOut: timeOut,
      extendedTimeOut: 1000,
      enableHtml: true,
      positionClass: 'toast-custom-juego-position',     
      //closeButton : true,
      buttons: [
        {
          text: 'Botón adicional',
          action : ()=>{
            alert();
          }
          // action: (toast) => {
          //   // Acción al hacer clic en el botón adicional
          //   this.toastr.remove(toast.toastId);
          //   // Aquí puedes realizar la acción deseada
          // }
        }
      ]
    };

    this.toastr.success(mensaje != '' ? mensaje : 'HA GANADO!!!.', 
    titulo != '' ? titulo : 'Ha ganado.', 
    successOptions);
  }

  empate(mensaje : string = '', titulo : string = ''){
    const successOptions = {
      toastClass: 'toast-custom-empate',
      timeOut: 3000,
      extendedTimeOut: 1000,
      enableHtml: true,
      positionClass: 'toast-custom-juego-position',     
      //closeButton : true,
      buttons: [
        {
          text: 'Botón adicional',
          action : ()=>{
            alert();
          }
          // action: (toast) => {
          //   // Acción al hacer clic en el botón adicional
          //   this.toastr.remove(toast.toastId);
          //   // Aquí puedes realizar la acción deseada
          // }
        }
      ]
    };

    this.toastr.success(mensaje != '' ? mensaje : 'HA GANADO!!!.', 
    titulo != '' ? titulo : 'Ha ganado.', 
    successOptions);
  }

}
