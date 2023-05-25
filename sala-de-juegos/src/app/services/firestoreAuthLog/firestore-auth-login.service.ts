import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class FirestoreLoginService {
  suscripcion: any;
  usuarioActual: any;
  //Esta variable me permite controlar en tiempo real si hay un usuario logueado.
  usuarioEstaLogueado : boolean = false;
  public usuarioAceptoTeminos : boolean = false;

  constructor(private auth: AngularFireAuth, private localStorage: LocalStorageService, private route : Router) {
    this.suscripcion = this.auth.authState.subscribe(usuario => {
      if (usuario) {
        this.usuarioActual = usuario;
        this.localStorage.guardarItem('usuario', { id: usuario.uid, mail: usuario.email });
        this.usuarioEstaLogueado = true;    
      }else{
        //this.route.navigateByUrl('login');
      }
    });
  }

  //Esta propiedad no se actualiza en tiempo real, 
  //requiere ser invocada para informar si el usuario esta logueado. Pero la ventaja
  //es que al invocarse, da una respuesta inmediata sin delay.
  //Es decir, al iniciar sesion se usa esta prop. Para control en tiempo real, la variable.
  get getUsuarioEstaLogueado() {
    this.usuarioEstaLogueado = this.localStorage.obtenerItem('usuario') != null;
    return this.usuarioEstaLogueado;
  }

  get getUsuarioActualBasico() {  
    return this.localStorage.obtenerItem('usuario');
  }

  get getUsuarioActualCompleto() {
    return this.usuarioActual;
  }

  registrarUsuario(usuario: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(usuario, password);
  }

  loguearUsuario(usuario: string, password: string) {
    return this.auth.signInWithEmailAndPassword(usuario, password);
  }

  desloguear() {
    this.localStorage.eliminarItem('usuario');
    this.usuarioEstaLogueado = false;
    return this.auth.signOut();
  }

  ObtenerCambiosDeEstado() {
    return this.auth.authState;
  }
}
