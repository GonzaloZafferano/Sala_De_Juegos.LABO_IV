import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormateoService } from 'src/app/services/formateo/formateo.service';
import { ToastPredeterminadosService } from 'src/app/services/toastPredeterminados/toast-predeterminados.service';
//El HttpClientModule se DEBE insertar en el array de imports, del APP.MODULE 
import Swal from 'sweetalert2';
import { LogJuegoService } from 'src/app/services/logsJuego/log-juego.service';
import { LogJuego } from 'src/app/models/logJuego';
import { FirestoreLoginService } from 'src/app/services/firestoreAuthLog/firestore-auth-login.service';
import { FirestoreUsuariosService } from 'src/app/services/firestoreUsuarios/firestore-usuarios.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {
  suscripcion: any;
  palabra: string = '';
  letras: any[] = [];
  abc: any[] = []
  cantidadLetrasAcertadas: number = 0;
  cantidadErrores: number = 0;
  spinner: boolean = false;
  bloquearBotones = false;
  rutaImagen = '';
  imagenes: string[] = [
    'assets/ahorcado/imagen0.png',
    'assets/ahorcado/imagen1.png',
    'assets/ahorcado/imagen2.png',
    'assets/ahorcado/imagen3.png',
    'assets/ahorcado/imagen4.png',
    'assets/ahorcado/imagen5.png',
    'assets/ahorcado/imagen6.png',
    'assets/ahorcado/imagen7.png',
  ]

  constructor(private http: HttpClient, private loginService: FirestoreLoginService, private usuarioService: FirestoreUsuariosService, private formatear: FormateoService, private logJuego: LogJuegoService) {
    this.otraVez()
  }

  ngOnInit() {
    this.obtenerPalabra();
  }

  cargarAbecedario() {
    let letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
    this.abc = letras.map(x =>
      ({ letra: x, habilitado: true })
    );
  }

  obtenerPalabra() {
    if (this.suscripcion)
      this.suscripcion.unsubscribe();

    this.spinner = true;
    //https://random-word-api.herokuapp.com/word?number=1&lang=es
    //https://clientes.api.greenborn.com.ar/public-random-word?c=1
    this.suscripcion = this.http.get('https://clientes.api.greenborn.com.ar/public-random-word').subscribe(x => {

      //Obtengo la palabra
      let palabra = (x as string[])[0];

      //REMUEVO LOS ACENTOS
      this.palabra = this.formatear.obtenerPalabraSinAcentos(palabra);

      let letras = this.palabra.split('');
      this.letras = letras.map(x => ({ letra: x, visible: false }));

      this.spinner = false;
    });
  }

  revisar(letra: string) {
    if (this.palabra.toUpperCase().includes(letra)) {
      let item = this.abc.filter(x => x.letra == letra)[0];
      item.habilitado = false;
      let letras = this.letras.filter(x => x.letra.toUpperCase() == letra);
      letras.map(x => x.visible = true);
      this.cantidadLetrasAcertadas += letras.length;

      if (this.hayGanador()) {
        this.gano();
      }
    } else {
      this.cantidadErrores++;
      this.rutaImagen = this.imagenes[this.cantidadErrores];
      if (this.cantidadErrores == 7) {
        this.perdio();
      }
    }
  }

  hayGanador() {
    return this.cantidadLetrasAcertadas == this.palabra.length;
  }

  perdio() {
    this.bloquearBotones = true;
    Swal.fire({
      title: 'HA PERDIDO!!!',
      text: `SE HA QUEDADO SIN INTENTOS!!! LA PALABRA ERA '${this.palabra}'.`,
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      confirmButtonText: 'Jugar otra vez!',
      icon: 'error', //info
      reverseButtons: true,
      customClass: {
        container: 'sw-container-perdio',
        cancelButton: 'sw-cancel',
        confirmButton: 'sw-confirm',
        title: 'sw-title',
        htmlContainer: 'sw-texto',
        popup: 'sw-popup',
      },
    }).then((result: { isConfirmed: any; }) => { //SOLO SE ESTA INDICANDO EL TIPO DE DATO
      if (result.isConfirmed) {
        this.otraVez();
      }
    });
  }

  async cargarDatosDeGanador() {
    //CARGA DATOS DE JUEGO
    let usuarioActual = this.loginService.getUsuarioActualBasico;
    let usuarioActualNombre = '';
    if (usuarioActual) {
      let usuario = await this.usuarioService.traerUsuarioPorId(usuarioActual.id);
      usuarioActualNombre = usuario?.['usuario'];
      let logJuego = new LogJuego();
      logJuego.fecha = new Date();
      logJuego.idUsuario = usuarioActual.id;
      logJuego.nombreUsuario = usuarioActualNombre;
      logJuego.juego = 'AHORCADO';
      logJuego.puntos = 1;
      this.logJuego.cargarLogDeJuego(logJuego);
    }
  }

  async gano() {
    this.bloquearBotones = true;
    this.cargarDatosDeGanador();

    Swal.fire({
      title: 'HA GANADO!!!',
      text: `FELICITACIONES!!! LO HA CONSEGUIDO CON ${this.cantidadErrores} ${(this.cantidadErrores == 1 ? 'ERROR' : 'ERRORES')}!!!.`,
      icon: 'success',
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      confirmButtonText: 'Jugar otra vez!',
      customClass: {
        container: 'sw-container',
        cancelButton: 'sw-cancel',
        confirmButton: 'sw-confirm',
        title: 'sw-title',
        htmlContainer: 'sw-texto',
        popup: 'sw-popup',
      },
      reverseButtons: true
    }).then((result: { isConfirmed: any; }) => { //SOLO SE ESTA INDICANDO EL TIPO DE DATO
      if (result.isConfirmed) {
        this.otraVez();
      }
    });
  }

  otraVez() {
    this.cantidadErrores = 0;
    this.cantidadLetrasAcertadas = 0;
    this.palabra = '';
    this.letras = [];
    this.rutaImagen = this.imagenes[0];
    this.bloquearBotones = false;
    this.cargarAbecedario();
    this.obtenerPalabra();
  }
}
