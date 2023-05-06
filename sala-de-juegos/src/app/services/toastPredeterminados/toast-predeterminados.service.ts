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
}
