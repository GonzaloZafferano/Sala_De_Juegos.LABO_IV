import { Component, Input } from '@angular/core';
import { Mensaje } from 'src/app/models/mensaje';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreLoginService } from 'src/app/services/firestoreAuthLog/firestore-auth-login.service';
import { FirestoreUsuariosService } from 'src/app/services/firestoreUsuarios/firestore-usuarios.service';
import { FormateoService } from 'src/app/services/formateo/formateo.service';
import { MensajeService } from 'src/app/services/mensaje/mensaje.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  textoBoton: string = 'Enviar Mensaje';
  @Input() mensajes : any[] | undefined;
  @Input() usuarioLogueadoId : string = '';
  constructor(private formateo: FormateoService){}

  async ngOnInit() {   
  }

  ngOnDestroy() {
  }

  obtenerFechaString(mensaje: any) {
    return this.formateo.obtenerFechaString(mensaje, false, true)
  }
}
