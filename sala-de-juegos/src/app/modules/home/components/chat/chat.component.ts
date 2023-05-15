import { Component, Input } from '@angular/core';
import { Mensaje } from 'src/app/models/mensaje';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreLoginService } from 'src/app/services/firestoreAuthLog/firestore-auth-login.service';
import { FirestoreUsuariosService } from 'src/app/services/firestoreUsuarios/firestore-usuarios.service';
import { FormateoService } from 'src/app/services/formateo/formateo.service';
import { MensajeService } from 'src/app/services/mensaje/mensaje.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @Input() usuarioLogueadoId: string = '';
  @ViewChild('contenedor', { static: false }) contenedor: ElementRef | undefined;
  mensajes: any[] | undefined;
  cargando: boolean = false;
  suscripcion: any;

  constructor(private formateo: FormateoService, private mensajeService: MensajeService) { }

  async ngOnInit() {
    this.cargando = true;
    this.suscripcion = this.mensajeService.obtenerListadoDeMensajesOrdenadoObservable().subscribe(x => {
      this.mensajes = x;

      let usuarioSubioScroll = this.contenedor?.nativeElement.scrollTop + 120 <
        this.contenedor?.nativeElement.scrollHeight - this.contenedor?.nativeElement.clientHeight;

      if (!usuarioSubioScroll)
        this.scrollDown();

      this.cargando = false;
    });
  }

  ngOnDestroy() {
    if (this.suscripcion)
      this.suscripcion.unsubscribe();
  }
  obtenerFechaString(mensaje: any) {
    return this.formateo.obtenerFechaString(mensaje, false, true)
  }

  scrollDown() {
    setTimeout(() => {
      if (this.contenedor) {
        //FORMA 1
        // this.contenedor.nativeElement.scrollTop = this.contenedor?.nativeElement.scrollHeight;

        //FORMA 2
        const contenedor = this.contenedor.nativeElement;
        const ultimoHijo = contenedor.lastElementChild;
        if (ultimoHijo) {
          ultimoHijo.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }
    }, 300);
  }
}
