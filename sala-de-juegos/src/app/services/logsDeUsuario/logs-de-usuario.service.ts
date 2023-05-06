import { Injectable } from '@angular/core';
import { FirestoreDBService } from '../firestoreDB/firestore-db.service';
import { Log } from 'src/app/models/log';

@Injectable({
  providedIn: 'root'
})
export class LogsDeUsuarioService {
  nombreColeccion: string = 'logsDeUsuarios';
  constructor(private firestoreDB: FirestoreDBService) { }

  cargarUsuarioConIdAsignado(log: Log) {
    return this.firestoreDB.guardarObjetoConIdAsignado(this.nombreColeccion, { ...log });
  }
  
  obtenerListaDeLogs() {
    return this.firestoreDB.traerListaDeObjetos(this.nombreColeccion);
  }
  
  obtenerListadoDeLogsObservable() {
    return this.firestoreDB.traerListaDeObjetosConObservable(this.nombreColeccion);
  }
}
