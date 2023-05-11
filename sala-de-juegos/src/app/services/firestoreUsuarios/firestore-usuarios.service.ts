import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreDBService } from '../firestoreDB/firestore-db.service';
import { TipoIgualdad } from 'src/app/enums/TipoIgualdad';
import { FirestoreLoginService } from '../firestoreAuthLog/firestore-auth-login.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class FirestoreUsuariosService {
  private nombreColeccion: string = 'usuarios';
  private suscripcion: any;
  constructor(private firestoreDB: FirestoreDBService, private loginService: FirestoreLoginService, private localStorage: LocalStorageService) {
    if (this.suscripcion)
      this.suscripcion.unsubscribe();
    this.suscripcion = this.loginService.ObtenerCambiosDeEstado().subscribe(usuario => {
      if (usuario)
        this.localStorage.guardarItem('usuario', usuario)
      else
        this.localStorage.eliminarItem('usuario');
    });
  }

  get usuarioEstaLogueado (){
    return this.localStorage.obtenerItem('usuario') != null;
  }

  get usuarioActual(){
    return this.localStorage.obtenerItem('usuario');
  }

  cargarUsuarioConIdAsignado(usuario: Usuario) {
    return this.firestoreDB.guardarObjetoConIdAsignado(this.nombreColeccion, { ...usuario });
  }

  traerUsuarioPorId(idUsuario: string) {
    return this.firestoreDB.traerListaDeObjetosFiltrada(this.nombreColeccion, 'id', idUsuario, TipoIgualdad.igual);
  }

  obtenerListaDeUsuarios() {
    return this.firestoreDB.traerListaDeObjetos(this.nombreColeccion);
  }

  obtenerListadoDeUsuariosObservable() {
    return this.firestoreDB.traerListaDeObjetosConObservable(this.nombreColeccion);
  }

  modificarUsuario(usuario: Usuario) {
    return this.firestoreDB.modificarObjeto(this.nombreColeccion, usuario);
  }

  eliminarUsuario(id: string) {
    return this.firestoreDB.eliminarObjeto(this.nombreColeccion, id);
  }







  //TODO borrar si no se usa
  cargarUsuarioSinIdAsignado(usuario: Usuario) {
    return this.firestoreDB.guardarObjetoSinIdAsignado(this.nombreColeccion, { ...usuario });
  }

  //SIN USO
  traerListaDeUsuariosFiltradaConObservable(nombreUsuario: string) {
    return this.firestoreDB.traerListaDeObjetosFiltradaConObservable(this.nombreColeccion, 'usuario', nombreUsuario, TipoIgualdad.igual);
  }

  //PODRIA USARSE CON UN '%algo%' ??
  traerListaDeCorreosFiltrada(correoElectronico: string) {
    return this.firestoreDB.traerListaDeObjetosFiltrada(this.nombreColeccion, 'correo', correoElectronico, TipoIgualdad.igual);
  }

  traerListaDeCorreosFiltradaConObservable(correoElectronico: string) {
    return this.firestoreDB.traerListaDeObjetosFiltradaConObservable(this.nombreColeccion, 'correo', correoElectronico, TipoIgualdad.igual);
  }
}
