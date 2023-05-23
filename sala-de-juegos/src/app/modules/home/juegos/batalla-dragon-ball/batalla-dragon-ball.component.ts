import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { FirestoreLoginService } from 'src/app/services/firestoreAuthLog/firestore-auth-login.service';
import { ToastPredeterminadosService } from 'src/app/services/toastPredeterminados/toast-predeterminados.service';
import { LogJuegoService } from 'src/app/services/logsJuego/log-juego.service';
import { LogJuego } from 'src/app/models/logJuego';
import { FirestoreUsuariosService } from 'src/app/services/firestoreUsuarios/firestore-usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-batalla-dragon-ball',
  templateUrl: './batalla-dragon-ball.component.html',
  styleUrls: ['./batalla-dragon-ball.component.css']
})
export class BatallaDragonBallComponent {
  private buttonPositionX: number = 0;
  private buttonPositionY: number = 0;
  private contenedorAncho: number = 0;
  private contenedorAlto: number = 0;
  private anchoBoton: number = 0;
  private altoBoton: number = 0;
  private y: number = -100;
  public vida: number = 100;
  public vidaCell: number = 100;
  public cargaKi: boolean = false;
  public golpe: boolean = false;
  public golpeACell: boolean = false;
  public imagenProtagonista: string = 'assets/batalladragonball/gohan2.png';
  private numero: number = 0;
  coolDownKi: boolean = false;
  vencidos: number = 0;
  explosionDeEnemigo: any;
  reubicacion: any;
  enemigos: any[] = [];
  finDelJuego: boolean = true;
  explosionGohanVisible: boolean = false;
  jefe: boolean = false;
  escena: boolean = false;
  movimientosCell: any;
  cell: any;
  steps: number = 10;
  mensajeVisible: boolean = false;
  puntos: number = 0;

  constructor(private toast: ToastPredeterminadosService,
    private loginService: FirestoreLoginService,
    private usuarioService: FirestoreUsuariosService,
    private LogJuegoService: LogJuegoService) { }
  resetear() {
    this.jefe = false;
    this.finDelJuego = false;
    this.vida = 100;
    this.vidaCell = 100;
    this.golpe = false;
    this.cargaKi = false;
    this.imagenProtagonista = 'assets/batalladragonball/gohan2.png';
    this.vencidos = 0;
    this.y = -100;
    this.numero = 0;
    this.steps = 10;
    this.mensajeVisible = false;
    this.enemigos = this.obtenerEnemigos();
    this.cell = this.obtenerCell();
    this.puntos = 0;
    this.reubicar();
  }

  obtenerCell() {
    return { vivo: true, imagenVivo: 'assets/batalladragonball/cell.png', imagenVencido: 'assets/batalladragonball/cellV.png' };
  }

  obtenerEnemigos() {
    return [
      { vivo: true, posicion: this.posicionUnica(), imagenVivo: 'assets/batalladragonball/cell1.png', imagenVencido: 'assets/batalladragonball/cell1E.png' },
      { vivo: true, posicion: this.posicionUnica(), imagenVivo: 'assets/batalladragonball/cell2.png', imagenVencido: 'assets/batalladragonball/cell2E.png' },
      { vivo: true, posicion: this.posicionUnica(), imagenVivo: 'assets/batalladragonball/cell3.png', imagenVencido: 'assets/batalladragonball/cell3E.png' },
      { vivo: true, posicion: this.posicionUnica(), imagenVivo: 'assets/batalladragonball/cell4.png', imagenVencido: 'assets/batalladragonball/cell4E.png' },
      { vivo: true, posicion: this.posicionUnica(), imagenVivo: 'assets/batalladragonball/cell5.png', imagenVencido: 'assets/batalladragonball/cell5E.png' }
    ];
  }

  posicionUnica() {
    return { numero: this.numero += 1, y: this.y += 100, x: Math.floor(Math.random() * (900 - 0 + 1)) + 0 }
  }

  @ViewChild('contenedor', { static: true }) contenedor: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('protagonista', { static: false }) protagonista: ElementRef | undefined;
  @ViewChild('explosion', { static: false }) explosion: ElementRef | undefined;
  @ViewChild('cellDiv', { static: false }) cellDiv: ElementRef | undefined;
  @ViewChild('explosionVillanos', { static: false }) explosionVillanos: ElementRef | undefined;



  ngAfterViewInit() {
    if (this.protagonista) {
      const buttonRect: DOMRect = this.protagonista.nativeElement.getBoundingClientRect();
      this.altoBoton = buttonRect.height;
      this.anchoBoton = buttonRect.width;

      if (this.contenedor) {

        const containerRect: DOMRect = this.contenedor.nativeElement.getBoundingClientRect();
        this.contenedorAncho = containerRect.width;
        this.contenedorAlto = containerRect.height;
        this.buttonPositionX = buttonRect.left - containerRect.left;
        this.buttonPositionY = buttonRect.top - containerRect.top;
      }
    }
  }

  comenzar() {
    this.resetear();
    this.ataques(300);
  }

  reubicar() {
    if (this.reubicacion)
      this.reubicacion.unsubscribe();

    this.reubicacion = interval(3000).subscribe(() => {
      this.y = -100;
      this.numero = 0;
      this.enemigos.map(x => {
        if (x.vivo)
          x.posicion = this.posicionUnica()
      });
    });
  }

  ataques(intervalo: number) {
    if (this.explosionDeEnemigo)
      this.explosionDeEnemigo.unsubscribe();

    this.explosionDeEnemigo = interval(intervalo).subscribe(() => {
      this.ataqueEnemigo();
    });
  }

  movimientosDeCell() {
    if (this.movimientosCell)
      this.movimientosCell.unsubscribe();
    this.movimientosCell = interval(750).subscribe(() => {
      this.moverACell();
    });
  }

  moverACell() {
    let x = Math.floor(Math.random() * (900 - 0 + 1)) + 0;
    let y = Math.floor(Math.random() * (385 - 0 + 1)) + 0;
    if (this.cellDiv) {
      this.cellDiv.nativeElement.style.display = 'inline-block';
      this.cellDiv.nativeElement.style.transform = `translate(${x}px, ${y}px)`;
    }
  }
  elevarKI() {
    this.cargaKi = true;
    this.coolDownKi = true;
    if (this.vida <= 90)
      this.vida += 10;
    this.imagenProtagonista = 'assets/batalladragonball/gohanKI.gif';
    setTimeout(() => {
      this.imagenProtagonista = 'assets/batalladragonball/gohan2.png';
      this.cargaKi = false;
    }, 1000);

    setTimeout(() => {
      this.coolDownKi = false;
    }, 5000);
  }
  ngOnInit() {

  }

  ataqueEnemigo() {
    if (this.explosion) {

      let x = Math.floor(Math.random() * (965 - 0 + 1)) + 0;
      let y = Math.floor(Math.random() * (220 - 0 + 1)) + 0;
      this.explosion.nativeElement.style.display = 'inline-block';
      this.explosion.nativeElement.style.transform = `translate(${x}px, ${y}px)`;

      if ((x + 50) >= this.buttonPositionX + 80 &&
        (x) <= (this.buttonPositionX + 100) &&
        (y + 50) >= this.buttonPositionY + 120 && //y > 100
        (y) <= (this.buttonPositionY + 180)
      ) {
        if (!this.cargaKi) {

          this.golpe = true;
          this.vida -= 20;

          if (this.vida <= 0 && !this.mensajeVisible) {
            if(this.puntos > 0){
              this.cargarGanador();
            }
            this.mensajeVisible = true;
            this.imagenProtagonista = 'assets/batalladragonball/gohan2V.png';
            this.toast.perdio(`Te han vencido! Sumaste ${this.puntos} puntos!<br>Presiona en 'Comenzar' para intentarlo de nuevo!`, ' ');
            setTimeout(() => {
              this.finJuego();
            }, 1000);
          }
          setTimeout(() => {
            this.golpe = false;
          }, 300);
        }
      }
    }


  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (!this.finDelJuego)
      this.moverProtagonista(event);
  }


  moverProtagonista(event: KeyboardEvent) {
    let pasos = this.steps;
    switch (event.key) {
      case 'ArrowUp':
        this.buttonPositionY = Math.max(-100, this.buttonPositionY - pasos);
        break;
      case 'ArrowDown':
        this.buttonPositionY = Math.min(this.contenedorAlto - this.altoBoton, this.buttonPositionY + pasos);
        break;
      case 'ArrowLeft':
        this.buttonPositionX = Math.max(0, this.buttonPositionX - pasos);
        break;
      case 'ArrowRight':
        this.buttonPositionX = Math.min(this.contenedorAncho - this.anchoBoton, this.buttonPositionX + pasos);
        break;
      default:
        return;
    }

    if (this.protagonista)
      this.protagonista.nativeElement.style.transform = `translate(${this.buttonPositionX}px, ${this.buttonPositionY}px)`;

  }

  ataque(enemigo: any) {
    this.vencidos++;
    enemigo.vivo = false;
    this.puntos++;
    if (this.vencidos == 5) {
      this.explosionGohanVisible = false;

      this.finExplosiones();
      this.finMovimientoCellJr();
      this.toast.gano('Felicitaciones! Has derrotado a los Cell Jr!! Sin embargo...', ' ');

      setTimeout(() => {
        this.enemigos = [];
        this.steps = 35;
        this.escena = true;
        this.jefe = true;
        setTimeout(() => {
          this.escena = false;
          this.cell = this.obtenerCell();
          this.movimientosDeCell();
          this.ataques(70);
        }, 7000);
      }, 3000);

    }
  }

  finExplosiones() {
    if (this.explosionDeEnemigo)
      this.explosionDeEnemigo.unsubscribe();
    if (this.explosion) {
      this.explosion.nativeElement.style.display = 'none';
    }
  }

  finMovimientoCellJr() {
    if (this.reubicacion)
      this.reubicacion.unsubscribe();
  }
  finMovimientosCell() {
    if (this.movimientosCell)
      this.movimientosCell.unsubscribe();
  }

  finJuego() {
    this.finDelJuego = true;
    this.explosionGohanVisible = false;

    this.finMovimientosCell();
    this.finMovimientoCellJr();
    this.finExplosiones();
  }

  async ataqueCell() {
    if (!this.finDelJuego) {
      this.puntos++;
      this.vidaCell -= 10;
      this.golpeACell = true;
      setTimeout(() => {
        this.golpeACell = false;
      }, 300);
      if (this.vidaCell <= 0) {
        this.puntos += 5;
        this.cargarGanador();

        this.cell.vivo = false;
        this.finJuego();
        this.toast.gano(`Felicidades! Haz derrotado a Cell y salvaste la tierra! <br>Sumaste ${this.puntos} puntos!`, ' ');
      }
    }
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
      logJuego.juego = 'BATALLADRAGONBALL';
      logJuego.puntos = this.puntos;
      this.LogJuegoService.cargarLogDeJuego(logJuego);
    }
  }
  clickContenedorVillanos(event: any) {
    if (!this.finDelJuego) {

      if (!this.escena) {
        if (this.vencidos < 5 || this.jefe)
          this.explosionGohanVisible = true;

        if (this.explosionVillanos)
          this.explosionVillanos.nativeElement.style.display = 'inline-block';

        if (this.explosionVillanos) {

          this.explosionVillanos.nativeElement.style.left = event.clientX + 'px';
          this.explosionVillanos.nativeElement.style.top = event.clientY + 'px';
        }
      }
    }
  }
}
