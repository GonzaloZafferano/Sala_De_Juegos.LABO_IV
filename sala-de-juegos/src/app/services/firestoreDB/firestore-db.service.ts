import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, DocumentReference, Firestore, collection, collectionData, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Orden } from 'src/app/enums/Orden';
import { TipoIgualdad } from 'src/app/enums/TipoIgualdad';

@Injectable({
  providedIn: 'root'
})

export class FirestoreDBService {
  constructor(private firestore: Firestore) { }

  guardarObjetoSinIdAsignado(nombreColeccion: string, objetoAGuardar: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    const documentoNuevo: DocumentReference<DocumentData> = doc(coleccion);
    objetoAGuardar.id = documentoNuevo.id;
    return setDoc(documentoNuevo, objetoAGuardar);
  }

  guardarObjetoConIdAsignado(nombreColeccion: string, objetoAGuardar: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    const documentoNuevo: DocumentReference<DocumentData> = doc(coleccion);
    return setDoc(documentoNuevo, objetoAGuardar);
  }

  async traerListaDeObjetos(nombreColeccion: string) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    const docs = await getDocs(coleccion)
      .then((docs) => {
        return docs;
      });
    const listaDeObjetos: DocumentData[] = [];
    docs.forEach(item => {
      listaDeObjetos.push(item.data());
    });
    return listaDeObjetos;
  }

  traerListaDeObjetosConObservable(nombreColeccion: string) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    return collectionData(coleccion);
  }

  async traerListaDeObjetosFiltrada(nombreColeccion: string, columna: string, valorBuscado: string, tipoIgualdad: TipoIgualdad) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    let q;
    if (tipoIgualdad == TipoIgualdad.igual)
      q = query(coleccion, where(columna, '==', valorBuscado));
    else
      q = query(coleccion, where(columna, '!=', valorBuscado));

    const docs = await getDocs(q)
      .then((docs) => {       
        return docs;
      });
    const listaDeObjetos: DocumentData[] = [];
    docs.forEach(item => {
      listaDeObjetos.push(item.data());
    });
    return listaDeObjetos;
  }

  traerListaDeObjetosFiltradaConObservable(nombreColeccion: string, columna: string, valorBuscado: string, tipoIgualdad: TipoIgualdad) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);

    if (tipoIgualdad == TipoIgualdad.igual)
      return collectionData(query(coleccion, where(columna, '==', valorBuscado)));
    else
      return collectionData(query(coleccion, where(columna, '!=', valorBuscado)));
  }

  traerListaDeObjetosOrdenadaConObservable(nombreColeccion: string, columna: string, orden: Orden) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    if (orden == Orden.asc)
      return collectionData(query(coleccion, orderBy(columna, 'asc')));
    else
      return collectionData(query(coleccion, orderBy(columna, 'desc')));
  }

  modificarObjeto(nombreColeccion: string, objetoAModificar: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    const documentoOriginal: DocumentReference<DocumentData> = doc(objetoAModificar.id);
    return updateDoc(documentoOriginal, { ...objetoAModificar });
  }

  eliminarObjeto(nombreColeccion: string, id: string) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    const documentoAEliminar: DocumentReference<DocumentData> = doc(coleccion, id);
    return deleteDoc(documentoAEliminar);
  }
}
