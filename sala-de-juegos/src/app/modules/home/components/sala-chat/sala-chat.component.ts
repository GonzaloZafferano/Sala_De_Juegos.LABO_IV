import { Component } from '@angular/core';
import { Mensaje } from 'src/app/models/mensaje';
import { FirestoreLoginService } from 'src/app/services/firestoreAuthLog/firestore-auth-login.service';
import { FirestoreUsuariosService } from 'src/app/services/firestoreUsuarios/firestore-usuarios.service';
import { MensajeService } from 'src/app/services/mensaje/mensaje.service';

@Component({
  selector: 'app-sala-chat',
  templateUrl: './sala-chat.component.html',
  styleUrls: ['./sala-chat.component.css']
})
export class SalaChatComponent {
  listaDeMensajes: any[] | undefined;
  mensajeEscrito: string = '';
  suscripcion: any;  
  textoBoton: string = 'Enviar';
  textoInput: string = '';
  usuarioActualNombre: string = '';
  enviandoMensaje : boolean = false;
  cargando : boolean = false;

  constructor(private mensajeService: MensajeService, private loginService: FirestoreLoginService,
 private usuarioService: FirestoreUsuariosService) { }

  async ngOnInit() {
    this.cargando = true;
    this.suscripcion = this.mensajeService.obtenerListadoDeMensajesOrdenadoObservable().subscribe(x => {
      this.listaDeMensajes = x;
      setTimeout(() => {
        this.cargando = false;
      }, 1000);
    });

    let usuarioActual = this.loginService.getUsuarioActualBasico;   
    if (usuarioActual) {
      let usuario = await this.usuarioService.traerUsuarioPorId(usuarioActual.id); 
      this.usuarioActualNombre = usuario?.['usuario'];
    }   
  }

  ngOnDestroy() {
    if (this.suscripcion)
      this.suscripcion.unsubscribe();
  }

  get usuarioLogueadoId() {
    return this.loginService.getUsuarioActualCompleto?.uid;
  }

  async enviarMensaje() {
    if (this.mensajeEscrito != '' && !this.enviandoMensaje) {
      this.enviandoMensaje = true;
      let mensajeNuevo = new Mensaje();
      mensajeNuevo.fecha = new Date();
      mensajeNuevo.mensaje = this.mensajeEscrito;
      mensajeNuevo.usuario = this.usuarioActualNombre;
      mensajeNuevo.usuarioId = this.usuarioLogueadoId;    
      this.mensajeService.cargarMensaje(mensajeNuevo).then(x =>{
        this.enviandoMensaje = false;
      }); 
    
      this.mensajeEscrito = '';
    }
  }
}
