import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Log } from 'src/app/models/log';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreLoginService } from 'src/app/services/firestoreAuthLog/firestore-auth-login.service';
import { FirestoreUsuariosService } from 'src/app/services/firestoreUsuarios/firestore-usuarios.service';
import { LogsDeUsuarioService } from 'src/app/services/logsDeUsuario/logs-de-usuario.service';
import { ToastPredeterminadosService } from 'src/app/services/toastPredeterminados/toast-predeterminados.service';
import { validarCorreo } from 'src/app/validaciones/validar-correo-clave';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  usuario: Usuario = new Usuario();
  cargando: boolean = false;

  constructor(private logDeUsuario: LogsDeUsuarioService, private router: Router, private firestoreLogin: FirestoreLoginService, private fsUsuarioService: FirestoreUsuariosService, private toastPredeterminado: ToastPredeterminadosService) { }

  ngOnInit(): void {
    this.firestoreLogin.usuarioAceptoTeminos = false;

    this.form = new FormGroup
      (
        {
          correo: new FormControl('',
            {
              validators: [validarCorreo()],
            }
          ),
          clave: new FormControl('',
            {
              validators: [
                Validators.minLength(6)
              ]
            }
          ),
        },
      );
  }

  get correo() {
    return this.form.get('correo');
  }
  get clave() {
    return this.form.get('clave');
  }

  iniciarSesion() {
    this.cargando = true;
    //console.log(this.form.value);
    let hayError = false;
    let hayCamposVacios = false;

    for (const control in this.form.controls) {
      if (this.form.controls.hasOwnProperty(control)) {
        const item = this.form.controls[control];
        if (item.errors)
          hayError = true;
        if (item.value == null || item.value == '')
          hayCamposVacios = true;
      }
    }

    let mensajeError = '';
    if (hayError)
      mensajeError += 'Hay campos con errores, por favor corríjalos para poder registrarse. </br>';

    if (hayCamposVacios)
      mensajeError += 'Hay campos vacíos, por favor complételos para poder registrarse.';

    if (hayError || hayCamposVacios){
      this.toastPredeterminado.error(mensajeError, 'Error.');
      this.cargando = false;
    }

    if (!hayError && !hayCamposVacios) {
      this.loguearUsuario();
    }
  }

  loguearUsuario() {
    let mensajeError = '';

    this.firestoreLogin.loguearUsuario(this.correo?.value, this.clave?.value)
      .then(async x => {
        let idUsuario = x.user?.uid;

        if (idUsuario != null) {
          await this.fsUsuarioService.traerUsuarioPorId(idUsuario)
            .then(x => {
              if (x != null) {
                let usuario = x as any;
                this.usuario.clave = usuario.clave;
                this.usuario.correo = usuario.correo;
                this.usuario.usuario = usuario.usuario;
                this.usuario.id = usuario.id;
                this.usuario.fechaRegistro = usuario.fechaRegistro;

                this.logDeUsuario.cargarUsuarioConIdAsignado(new Log(this.usuario.id));
                this.toastPredeterminado.exito(`Bienvenido/a ${this.usuario.usuario}!`, 'Login exitoso!');

                this.firestoreLogin.usuarioAceptoTeminos = true;
                this.router.navigate(['../home']);

                setTimeout(() => {
                  this.cargando = false;
                }, 1000);
              } else
                mensajeError = 'Ha ocurrido un error al intentar cargar los datos del usuario.';
            }).catch();
        } else
          mensajeError = 'Ha ocurrido un error al intentar cargar los datos del usuario.';

        if (mensajeError != '') {
          this.toastPredeterminado.error(mensajeError);
          this.cargando = false;
        }
      })
      .catch((e) => {
        switch (e.code) {
          case 'auth/invalid-email':
            mensajeError = "Formato de correo electrónico inválido.";
            break;
          case 'auth/missing-password':
            mensajeError = "Falta ingresar la contraseña.";
            break;
          case 'auth/weak-password':
            mensajeError = "La contraseña debe contener al menos 6 caracteres.";
            break;
          case 'auth/wrong-password':
            mensajeError = 'La contraseña ingresada es inválida.';
            break;
          case 'auth/user-not-found':
            mensajeError = 'Usuario no encontrado.';
            break;
          default:
            mensajeError = "Ha ocurrido un error y no se pudo cargar el usuario.";
            break;
        }
        if (mensajeError != '') {
          this.toastPredeterminado.error(mensajeError, 'Ha ocurrido un error.');
          this.cargando = false;
        }
      });
  }

  private limpiarFormulario() {
    this.form.reset();
    for (const control in this.form.controls) {
      if (this.form.controls.hasOwnProperty(control)) {
        const item = this.form.controls[control];
        item.setValue('');
      }
    }
  }

  listaUsuarios: any = [
    {
      correo: 'prueba@prueba.com',
      clave: '111111'
    },
    {
      correo: 'nicolas@prueba.com',
      clave: '111111'
    },
    {
      correo: 'gonzalo@prueba.com',
      clave: '111111'
    }
  ];

  cargarUsuarioDefault(index: number) {
    this.correo?.setValue(this.listaUsuarios[index].correo);
    this.clave?.setValue(this.listaUsuarios[index].clave);
  }
}
