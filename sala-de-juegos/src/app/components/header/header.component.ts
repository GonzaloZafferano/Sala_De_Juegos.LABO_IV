import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreLoginService } from 'src/app/services/firestoreAuthLog/firestore-auth-login.service';
import { FirestoreUsuariosService } from 'src/app/services/firestoreUsuarios/firestore-usuarios.service';
import { ToastPredeterminadosService } from 'src/app/services/toastPredeterminados/toast-predeterminados.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private suscripcion: any;
  public usuarioEstaLogueado: boolean = false;

  constructor(private router: Router, private firestoreLogin: FirestoreLoginService, private toast: ToastPredeterminadosService) {
  }

  ngOnInit() {
    this.verificarEstadoDeUsuario();
  }
 
  ngOnDestroy() {
    if (this.suscripcion)
      this.suscripcion.unsubscribe();
  }

  desloguear() {
    this.firestoreLogin.desloguear();
    this.toast.exito('Sesión cerrada con exito.', ' ');
    this.router.navigate(['../login']);
  }

  verificarEstadoDeUsuario() {
    this.suscripcion = this.firestoreLogin.ObtenerCambiosDeEstado().subscribe(usuario => {
      //' !! ': Convierte a la variable en booleano. Si es null o undefined, es FALSE, caso contrario TRUE.
      this.usuarioEstaLogueado = !!usuario; //Null o undefined = No hay usuario logueado = false.         
    });
  }
}
