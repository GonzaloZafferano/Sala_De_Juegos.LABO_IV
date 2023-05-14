import { Injectable } from '@angular/core';
import { TipoIgualdad } from 'src/app/enums/TipoIgualdad';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreDBService } from '../firestoreDB/firestore-db.service';
import { Mensaje } from 'src/app/models/mensaje';
import { Orden } from 'src/app/enums/Orden';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private nombreColeccion: string = 'mensajes';

  constructor(private firestoreDB: FirestoreDBService) {
  }

  cargarMensaje(mensaje: Mensaje) {
    return this.firestoreDB.guardarObjetoSinIdAsignado(this.nombreColeccion, { ...mensaje });
  }

  obtenerListadoDeMensajesObservable() {
    return this.firestoreDB.traerListaDeObjetosConObservable(this.nombreColeccion);
  }

  obtenerListadoDeMensajesOrdenadoObservable() {
    return this.firestoreDB.traerListaDeObjetosOrdenadaConObservable(this.nombreColeccion, 'fecha', Orden.asc);
  }
}
