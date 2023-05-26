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
  aciertos: number = 0;
  errores: number = 0;
  digimones: any[] = [];
  indiceCorrecto: number = -1;
  spinner: boolean = false;
  bloquear : boolean = false;
  constructor(private http: HttpClient, private toast: ToastPredeterminadosService,
    private router: Router,
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

  ngOnDestroy() {

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
    this.bloquear = false;
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
    let finJuego = false;
    if (this.indiceCorrecto == indiceElegido) {
      this.aciertos++;

      if (this.aciertos == 5) {
        this.toast.gano('CORRECTO!! <br>Ha acertado 5 veces! <br>Suma +5 puntos!', ' ');
        this.cargarGanador();
        finJuego = true;
      }
      else {
        this.toast.gano('CORRECTO!!', ' ',1000);
      }
    } else {
      this.errores++;
      if (this.errores == 3) {
        this.toast.perdio(`INCORRECTO!! <br>La respuesta es '${this.digimones[this.indiceCorrecto].name}' <br>Tiene 3 errores! <br>FIN DEL JUEGO.`, ' ');
        finJuego = true;
      } else {
        this.toast.perdio(`INCORRECTO!! <br>La respuesta es '${this.digimones[this.indiceCorrecto].name}'.`, ' ',1500);
      }
    }

    setTimeout(() => {
      if (!finJuego)
        this.reintentar();
        else
        this.bloquear = true;
    }, 1000);
  }

  reiniciar() {
    this.errores = 0;
    this.aciertos = 0;
    this.reintentar();
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
      logJuego.puntos = 5;
      this.LogJuegoService.cargarLogDeJuego(logJuego);
    }

  }
}
