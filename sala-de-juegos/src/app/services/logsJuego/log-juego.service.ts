import { Injectable } from '@angular/core';
import { FirestoreDBService } from '../firestoreDB/firestore-db.service';
import { LogJuego } from 'src/app/models/logJuego';

@Injectable({
  providedIn: 'root'
})
export class LogJuegoService {
  nombreColeccion: string = 'logsDeJuego';
  constructor(private firestoreDB: FirestoreDBService) { }

  cargarLogDeJuego(logJuego: LogJuego) {
    return this.firestoreDB.guardarObjetoSinIdAsignado(this.nombreColeccion, { ...logJuego });
  }
  
  obtenerListaDeLogs() {
    return this.firestoreDB.traerListaDeObjetos(this.nombreColeccion);
  }
  
  obtenerListadoDeLogsObservable() {
    return this.firestoreDB.traerListaDeObjetosConObservable(this.nombreColeccion);
  }
}
