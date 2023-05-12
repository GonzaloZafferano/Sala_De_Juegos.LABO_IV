import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreLoginService } from 'src/app/services/firestoreAuthLog/firestore-auth-login.service';
import { FirestoreUsuariosService } from 'src/app/services/firestoreUsuarios/firestore-usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  suscripcion : any;
  usuarioActual? : Usuario;
  constructor(public loginService: FirestoreLoginService, private fsUsuarioService : FirestoreUsuariosService) { }

  ngOnInit() { 
    this.verificarEstadoDeUsuario();  
  //  this.obtenerUser(); 
  }

  ngOnDestroy(){
    if(this.suscripcion)
    this.suscripcion.unsubscribe();
  }

  verificarEstadoDeUsuario() {   
    this.loginService.ObtenerCambiosDeEstado().subscribe(usuario => {     
      if (usuario) {
        let idUsuario = usuario.uid;
        if (idUsuario) {
          this.fsUsuarioService.traerUsuarioPorId(idUsuario)
            .then(x => {
              if (x.length > 0) {
                let usuarioActual = x[0] as any;
                usuarioActual.fechaRegistro = new Date(usuarioActual.fechaRegistro.seconds * 1000);
                this.usuarioActual = usuarioActual;
              }
            });
        } else {
          this.usuarioActual = new Usuario();
        }
      }
    });
  }

  obtenerUser(){
    this.loginService.obtenerUsuarioActual().currentUser.then(x =>{
      let a = x;

      debugger;
    });
  }

  obtenerFechaString(usuarioLogueado: any, aaaaMMdd: boolean = false) { 
    if(usuarioLogueado){
      let fecha = usuarioLogueado.fechaRegistro;
      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      let anio = fecha.getFullYear();
  
      let cadenaDia = dia < 10 ? '0' + dia.toString() : dia.toString();
      let cadenaMes = mes < 10 ? '0' + mes.toString() : mes.toString();
  
      if (aaaaMMdd)
        return anio.toString() + '-' + cadenaMes + '-' + cadenaDia;
  
      return cadenaDia + '-' + cadenaMes + '-' + anio.toString();
    }
    return '';
  }
}
