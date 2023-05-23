import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LogJuego } from 'src/app/models/logJuego';
import { FirestoreLoginService } from 'src/app/services/firestoreAuthLog/firestore-auth-login.service';
import { FirestoreUsuariosService } from 'src/app/services/firestoreUsuarios/firestore-usuarios.service';
import { ToastPredeterminadosService } from 'src/app/services/toastPredeterminados/toast-predeterminados.service';
import { LogJuegoService } from 'src/app/services/logsJuego/log-juego.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent {

  randomA: number = -1;
  randomB: number = -1;
  randomC: number = -1;
  randomD: number = -1;
  suscripcion: any;
  digimones: any[] = [];
  indiceCorrecto: number = -1;
  spinner: boolean = false;
  constructor(private http: HttpClient, private toast: ToastPredeterminadosService,
    private router : Router,
    private loginService: FirestoreLoginService,
    private usuarioService: FirestoreUsuariosService,
    private LogJuegoService: LogJuegoService) { }

  ngOnInit() {
    this.obtenerDigimones();

    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     // Aquí se ejecuta cuando la página se está refrescando     
    //   }
    // });
  }

  ngOnDestroy(){

  }
  obtenerDigimones() {
    this.spinner = true;
    if (this.suscripcion)
      this.suscripcion.unsubscribe();
    this.suscripcion = this.http.get('https://digimon-api.vercel.app/api/digimon').subscribe(x => {
      let listadoDeDigimones = x as any;

      this.randomA = this.obtenerRandom(listadoDeDigimones);
      this.randomB = this.obtenerRandom(listadoDeDigimones);
      this.randomC = this.obtenerRandom(listadoDeDigimones);
      this.randomD = this.obtenerRandom(listadoDeDigimones);

      this.digimones.push(listadoDeDigimones[this.randomA]);
      this.digimones.push(listadoDeDigimones[this.randomB]);
      this.digimones.push(listadoDeDigimones[this.randomC]);
      this.digimones.push(listadoDeDigimones[this.randomD]);

      this.indiceCorrecto = Math.floor(Math.random() * (4));
      setTimeout(() => {
        this.spinner = false;

      }, 1000);
    });

  }

  reintentar() {
    this.limpiar();
    this.obtenerDigimones();
  }
  limpiar() {
    this.indiceCorrecto = -1;
    this.randomA = -1;
    this.randomB = -1;
    this.randomC = -1;
    this.randomD = -1;
    this.digimones = [];
  }

  obtenerRandom(lista: any[]) {
    let random = -1;
    do {
      random = Math.floor(Math.random() * (lista.length));

    } while (this.randomA == random ||
    this.randomB == random ||
    this.randomC == random ||
      this.randomD == random);
    return random;
  }

  eleccion(indiceElegido: any) {
    if (this.indiceCorrecto == indiceElegido) {
      this.toast.gano('Felicidades!! Ha acertado! <br>Sumo +1 punto!', ' ');
      this.cargarGanador();
    } else {
      this.toast.perdio(`Ha fallado!! La respuesta es '${this.digimones[this.indiceCorrecto].name}'. <br>Reintente nuevamente.!`, ' ');
    }

    setTimeout(() => {
      this.reintentar();
    }, 1000);
  }


  async cargarGanador() {
    //DATOS DE GANADOR
    let usuarioActual = this.loginService.getUsuarioActualBasico;
    let usuarioActualNombre = '';
    if (usuarioActual) {
      let usuario = await this.usuarioService.traerUsuarioPorId(usuarioActual.id);
      usuarioActualNombre = usuario?.['usuario'];
      let logJuego = new LogJuego();
      logJuego.fecha = new Date();
      logJuego.idUsuario = usuarioActual.id;
      logJuego.nombreUsuario = usuarioActualNombre;
      logJuego.juego = 'PREGUNTADOS';
      logJuego.puntos = 1;
      this.LogJuegoService.cargarLogDeJuego(logJuego);
    }

  }
}
