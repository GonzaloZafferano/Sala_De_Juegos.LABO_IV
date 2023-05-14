import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreLoginService } from 'src/app/services/firestoreAuthLog/firestore-auth-login.service';
import { FirestoreUsuariosService } from 'src/app/services/firestoreUsuarios/firestore-usuarios.service';
import { FormateoService } from 'src/app/services/formateo/formateo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  suscripcion: any;
  spinner : boolean = false;
  usuarioActual: Usuario | undefined;

  constructor(public loginService: FirestoreLoginService,
    private fsUsuarioService: FirestoreUsuariosService,
    private formateo: FormateoService) { }

  ngOnInit() {
    this.verificarEstadoDeUsuario();
  }

  ngOnDestroy() {
    if (this.suscripcion)
      this.suscripcion.unsubscribe();
  }

  verificarEstadoDeUsuario() {
    this.spinner = true;
   this.suscripcion = this.loginService.ObtenerCambiosDeEstado().subscribe(usuario => {
      if (usuario) {
        let idUsuario = usuario.uid;
        if (idUsuario) {
          this.fsUsuarioService.traerUsuarioPorId(idUsuario)
            .then(x => {
              if (x != null) {
                let usuarioActual = x as any;             
                usuarioActual.fechaRegistro = new Date(usuarioActual.fechaRegistro.seconds * 1000);
                this.usuarioActual = usuarioActual;
                this.spinner = false;                
              }
            }).catch(x =>{
              this.spinner = false;
            });
        } 
      }
    });
  }

  obtenerFechaString(usuario: any) {
    if (usuario)
      return this.formateo.obtenerFechaString(usuario.fechaRegistro)
    else
      return '';
  }
}
