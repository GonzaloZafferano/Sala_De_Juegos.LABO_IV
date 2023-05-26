import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreUsuariosService } from 'src/app/services/firestoreUsuarios/firestore-usuarios.service';
import { validarConfirmacionDeClave, validarCorreo, validarSiCorreoExisteAsync, validarSiUsuarioExisteAsync } from 'src/app/validaciones/validar-correo-clave';
import { FirestoreLoginService } from 'src/app/services/firestoreAuthLog/firestore-auth-login.service';
import { Usuario } from 'src/app/models/usuario';
import { ToastPredeterminadosService } from 'src/app/services/toastPredeterminados/toast-predeterminados.service';
import { Router } from '@angular/router';
import { LogsDeUsuarioService } from 'src/app/services/logsDeUsuario/logs-de-usuario.service';
import { Log } from 'src/app/models/log';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  form!: FormGroup;
  cargando: boolean = false;

  constructor(private logDeUsuario: LogsDeUsuarioService, private router: Router, private firestoreLogin: FirestoreLoginService, private fsUsuarioService: FirestoreUsuariosService, private toastPredeterminado: ToastPredeterminadosService) { }

  ngOnInit(): void {
    this.form = new FormGroup
      (
        {
          nombreUsuario: new FormControl('',
            {
              validators: [Validators.pattern('^[a-zA-Z1-9]+$')],
              asyncValidators: validarSiUsuarioExisteAsync(this.fsUsuarioService),
              updateOn: 'blur'
            }
          ),
          correo: new FormControl('',
            {
              validators: [validarCorreo()],
              asyncValidators: validarSiCorreoExisteAsync(this.fsUsuarioService),
              updateOn: 'blur',
            }
          ),
          clave: new FormControl('',
            {
              validators: [
                Validators.minLength(6)
              ]
            }
          ),
          confirmarClave: new FormControl('')
        },
        [validarConfirmacionDeClave(6)]
      );
  }

  get nombreUsuario() {
    return this.form.get('nombreUsuario');
  }
  get correo() {
    return this.form.get('correo');
  }
  get clave() {
    return this.form.get('clave');
  }
  get confirmarClave() {
    return this.form.get('confirmarClave');
  }

  registrarUsuario() {
    this.cargando = true;
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

    if (hayError || hayCamposVacios) {
      this.toastPredeterminado.error(mensajeError, 'Registro inválido.');
      this.cargando = false;
    }

    if (!hayError && !hayCamposVacios) {
      this.registrarUsuarioEnFirestore();
    }
  }

  private registrarUsuarioEnFirestore() {
    let mensajeError = '';
    this.firestoreLogin.registrarUsuario(this.correo?.value, this.clave?.value)
      .then(x => {
        let idUsuario = x.user?.uid;

        if (idUsuario != null) {
          let usuario = new Usuario(this.nombreUsuario?.value, this.correo?.value, this.clave?.value, new Date(), idUsuario);
          this.limpiarFormulario();
          this.fsUsuarioService.cargarUsuarioConIdAsignado(usuario)
            .then(
              x => {
                this.logDeUsuario.cargarUsuarioConIdAsignado(new Log(usuario.id));
                this.toastPredeterminado.exito('El registro se ha completado exitosamente!.', 'Registro exitoso');
             
                this.router.navigate(['../home']);

                setTimeout(() => {
                  this.cargando = false;                  
                }, 1000);
              }
            )
        } else {
          this.toastPredeterminado.error('Ha ocurrido un error al intentar guardar los datos del usuario registrado.', 'Ha ocurrido un error.');
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
          case 'auth/email-already-in-use':
            mensajeError = "El correo electrónico ingresado ya está en uso.";
            break;
          default:
            mensajeError = "Ha ocurrido un error y no se pudo registrar el usuario.";
            break;
        }

        if (mensajeError != '') {
          this.toastPredeterminado.error(mensajeError, 'Ha ocurrido un error!');
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
}
