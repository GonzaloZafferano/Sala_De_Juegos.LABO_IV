import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LogJuego } from 'src/app/models/logJuego';
import { FirestoreLoginService } from 'src/app/services/firestoreAuthLog/firestore-auth-login.service';
import { FirestoreUsuariosService } from 'src/app/services/firestoreUsuarios/firestore-usuarios.service';
import { FormateoService } from 'src/app/services/formateo/formateo.service';
import { LogJuegoService } from 'src/app/services/logsJuego/log-juego.service';
import { ToastPredeterminadosService } from 'src/app/services/toastPredeterminados/toast-predeterminados.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent {
  suscripcionMazo: any;
  suscripcionCartas: any;
  rutaCartaRevesEscondida: string = 'assets/mayormenor/cartaReves.jpg';
  rutaReves: string = '';
  cartas: any;
  cartaReves: any;
  cartaActual: any;
  indiceCarta: number = 0;
  aciertos: number = 0;
  errores: number = 0;
  empates: number = 0;
  rotar: boolean = false;
  rotarActual: boolean = false;
  deshabilitarMazo: boolean = false;
  deshabilitarBotones: boolean = false;
  textoBoton: string = '';
  spinner: boolean = false;
  constructor(private http: HttpClient, private logJuego: LogJuegoService,
    private loginService: FirestoreLoginService, private usuarioService: FirestoreUsuariosService,
    private formatear: FormateoService, private toast: ToastPredeterminadosService) {
  }

  ngOnInit() {
    this.reiniciar(true);
  }

  obtenerCartas() {
    this.spinner = true;
    if (this.suscripcionMazo)
      this.suscripcionMazo.unsubscribe();

    //https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
    this.suscripcionMazo = this.http.get('https://deckofcardsapi.com/api/deck/new/shuffle/').subscribe(x => {
      let mazo = x as any;

      if (this.suscripcionCartas)
        this.suscripcionCartas.unsubscribe();

      this.suscripcionCartas = this.http.get(`https://deckofcardsapi.com/api/deck/${mazo.deck_id}/draw/?count=52`).subscribe(x => {
        this.cartas = x as any;
        this.cartaActual = this.cartas.cards[this.indiceCarta++];
        this.cartaReves = this.cartas.cards[this.indiceCarta++];
        this.rutaReves = this.rutaCartaRevesEscondida;
        this.spinner = false;
      });
    });
  }

  reiniciar(esPrimeraVez: boolean) {

    if (!esPrimeraVez) {
      if ((this.aciertos != 0 || this.empates != 0 || this.errores != 0)) {
        if (this.aciertos > 0)
          this.cargarDatosDeGanador();
        this.toast.empate(`JUEGO TERMINADO! SE REINICIARAN LAS CARTAS. HAS SUMADO ${this.aciertos} PUNTOS!`, ' ');
      } else
        this.toast.empate(`JUEGO TERMINADO! SE REINICIARAN LAS CARTAS. NO SE HAN CONTABILIZADO PUNTOS!`, ' ');
    }
    this.textoBoton = 'REINICIAR';
    this.indiceCarta = 0;
    this.aciertos = 0;
    this.errores = 0;
    this.empates = 0;
    this.rutaReves = this.rutaCartaRevesEscondida;
    this.rotar = true;
    this.rotarActual = !this.rotarActual;
    this.obtenerCartas();
    this.deshabilitarMazo = true;
    this.deshabilitarBotones = false;
  }

  proximaCarta() {
    if (this.indiceCarta <= 51) {
      this.cartaActual = this.cartaReves;
      this.rotarActual = !this.rotarActual;
      this.cartaReves = this.cartas.cards[this.indiceCarta++];
      this.rutaReves = this.rutaCartaRevesEscondida;
      this.rotar = !this.rotar;
      this.deshabilitarMazo = true;
      this.deshabilitarBotones = false;
    }
  }

  adivinar(respuesta: number) {
    if (this.indiceCarta <= 52) {
      this.rutaReves = this.cartaReves.image;
      this.rotar = !this.rotar;

      let numeroEscondido = this.obtenerNumeroDeCarta(this.cartaReves.value);
      let valorActual = this.obtenerNumeroDeCarta(this.cartaActual.value);

      if (respuesta == 1) {
        if (numeroEscondido == valorActual) {
          this.empates++;
          this.toast.empate('LAS CARTAS TIENEN EL MISMO VALOR, SE OTORGA EL EMPATE!', ' ');
        }
        else if (numeroEscondido > valorActual) {
          this.aciertos++;
          this.toast.gano('ADIVINO!', ' ');
        }
        else {
          this.errores++;
          this.toast.perdio('NO ACERTO!', ' ');
        }
      } else {
        if (numeroEscondido == valorActual) {
          this.empates++;
          this.toast.empate('LAS CARTAS TIENEN EL MISMO VALOR, SE OTORGA EL EMPATE!', ' ');
        }
        else if (numeroEscondido < valorActual) {
          this.aciertos++;
          this.toast.gano('ADIVINO!', ' ');
        }
        else {
          this.errores++;
          this.toast.perdio('NO ACERTO!', ' ');
        }
      }
      this.deshabilitarMazo = false;
      this.deshabilitarBotones = true;
    }

    if (this.indiceCarta > 51) {
      this.deshabilitarMazo = true;
      this.deshabilitarBotones = true;
      this.cargarDatosDeGanador();
      setTimeout(() => {
        this.textoBoton = 'JUGAR DE NUEVO';
        this.toast.empate(`JUEGO TERMINADO! SE USARON TODAS LAS CARTAS DEL MAZO. HAS SUMADO ${this.aciertos} PUNTOS!`, 'JUEGO TERMINADO');
      }, 700);
    }
  }

  obtenerNumeroDeCarta(carta: any) {
    let numeroCarta;
    switch (carta) {
      case 'ACE':
        numeroCarta = 14;
        break;
      case 'KING':
        numeroCarta = 13;
        break;
      case 'QUEEN':
        numeroCarta = 12;
        break;
      case 'JACK':
        numeroCarta = 11;
        break;
      default:
        numeroCarta = parseInt(carta);
        break;
    }
    return numeroCarta;
  }


  async cargarDatosDeGanador() {
    let aciertos = this.aciertos;
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
      logJuego.juego = 'MAYORMENOR';
      logJuego.puntos = aciertos;
      this.logJuego.cargarLogDeJuego(logJuego);
    }
  }
}
