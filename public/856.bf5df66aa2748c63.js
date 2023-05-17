"use strict";(self.webpackChunksala_de_juegos=self.webpackChunksala_de_juegos||[]).push([[856],{7856:(w,g,a)=>{a.r(g),a.d(g,{RegistroModule:()=>E});var f=a(6895),c=a(6647),t=a(433),m=a(904),d=a(2531),p=a(8335),r=a(4650),v=a(6939),h=a(7677),U=a(6643),C=a(4443);function b(e,i){if(1&e&&(r.ynx(0),r.TgZ(1,"small",16),r._uU(2),r.qZA(),r.BQk()),2&e){const o=r.oxw();r.xp6(2),r.hij(" ",null==o.nombreUsuario?null:o.nombreUsuario.getError("errorUsuario")," ")}}function Z(e,i){1&e&&(r.ynx(0),r.TgZ(1,"small",16),r._uU(2," Formato inv\xe1lido para el nombre de usuario. "),r.qZA(),r.BQk())}function x(e,i){if(1&e&&(r.ynx(0),r.TgZ(1,"small",16),r._uU(2),r.qZA(),r.BQk()),2&e){const o=r.oxw();r.xp6(2),r.Oqu(null==o.correo?null:o.correo.getError("errorCorreo"))}}function y(e,i){if(1&e&&(r.ynx(0),r.TgZ(1,"small",16),r._uU(2),r.qZA(),r.BQk()),2&e){const o=r.oxw();r.xp6(2),r.hij(" La clave debe contener por lo menos ",null==o.clave?null:o.clave.getError("minlength").requiredLength," caracteres. ")}}function R(e,i){if(1&e&&(r.ynx(0),r.TgZ(1,"small",16),r._uU(2),r.qZA(),r.BQk()),2&e){const o=r.oxw();r.xp6(2),r.hij(" ",null==o.confirmarClave?null:o.confirmarClave.getError("clavesDistintas").mensajeError," ")}}function I(e,i){if(1&e&&(r.ynx(0),r.TgZ(1,"small",16),r._uU(2),r.qZA(),r.BQk()),2&e){const o=r.oxw();r.xp6(2),r.hij(" ",null==o.confirmarClave?null:o.confirmarClave.getError("longitudInvalida").mensajeError," ")}}const A=[{path:"",component:(()=>{class e{constructor(o,n,s,l,u){this.logDeUsuario=o,this.router=n,this.firestoreLogin=s,this.fsUsuarioService=l,this.toastPredeterminado=u}ngOnInit(){this.form=new t.cw({nombreUsuario:new t.NI("",{validators:[t.kI.pattern("^[a-zA-Z]+$")],asyncValidators:(0,m.kK)(this.fsUsuarioService),updateOn:"blur"}),correo:new t.NI("",{validators:[(0,m.qc)()],asyncValidators:(0,m.y$)(this.fsUsuarioService),updateOn:"blur"}),clave:new t.NI("",{validators:[t.kI.minLength(6)]}),confirmarClave:new t.NI("")},[(0,m.U5)(6)])}get nombreUsuario(){return this.form.get("nombreUsuario")}get correo(){return this.form.get("correo")}get clave(){return this.form.get("clave")}get confirmarClave(){return this.form.get("confirmarClave")}registrarUsuario(){let o=!1,n=!1;for(const l in this.form.controls)if(this.form.controls.hasOwnProperty(l)){const u=this.form.controls[l];u.errors&&(o=!0),(null==u.value||""==u.value)&&(n=!0)}let s="";o&&(s+="Hay campos con errores, por favor corr\xedjalos para poder registrarse. </br>"),n&&(s+="Hay campos vac\xedos, por favor compl\xe9telos para poder registrarse."),(o||n)&&this.toastPredeterminado.error(s,"Registro inv\xe1lido."),!o&&!n&&this.registrarUsuarioEnFirestore()}registrarUsuarioEnFirestore(){let o="";this.firestoreLogin.registrarUsuario(this.correo?.value,this.clave?.value).then(n=>{let s=n.user?.uid;if(null!=s){let l=new d.b(this.nombreUsuario?.value,this.correo?.value,this.clave?.value,new Date,s);this.limpiarFormulario(),this.fsUsuarioService.cargarUsuarioConIdAsignado(l).then(u=>{this.logDeUsuario.cargarUsuarioConIdAsignado(new p.Z(l.id)),this.toastPredeterminado.exito("El registro se ha completado exitosamente!.","Registro exitoso"),this.router.navigate(["../home"])})}else this.toastPredeterminado.error("Ha ocurrido un error al intentar guardar los datos del usuario registrado.","Ha ocurrido un error.")}).catch(n=>{switch(n.code){case"auth/invalid-email":o="Formato de correo electr\xf3nico inv\xe1lido.";break;case"auth/missing-password":o="Falta ingresar la contrase\xf1a.";break;case"auth/weak-password":o="La contrase\xf1a debe contener al menos 6 caracteres.";break;case"auth/email-already-in-use":o="El correo electr\xf3nico ingresado ya est\xe1 en uso.";break;default:o="Ha ocurrido un error y no se pudo registrar el usuario."}""!=o&&this.toastPredeterminado.error(o,"Ha ocurrido un error!")})}limpiarFormulario(){this.form.reset();for(const o in this.form.controls)this.form.controls.hasOwnProperty(o)&&this.form.controls[o].setValue("")}}return e.\u0275fac=function(o){return new(o||e)(r.Y36(v.n),r.Y36(c.F0),r.Y36(h.I),r.Y36(U.u),r.Y36(C.j))},e.\u0275cmp=r.Xpm({type:e,selectors:[["app-registro"]],decls:35,vars:7,consts:[[1,"container"],[1,"card","p-4","mt-4","w-50","centrar","sombra"],[3,"formGroup","ngSubmit"],["for","nombreUsuario",1,"form-label"],["type","text","id","nombreUsuario","formControlName","nombreUsuario",1,"form-control"],[4,"ngIf"],["for","correo",1,"form-label"],["type","email","id","correo","formControlName","correo",1,"form-control"],["for","clave",1,"form-label"],["type","password","id","clave","formControlName","clave",1,"form-control"],["for","confirmarClave",1,"form-label"],["type","password","id","confirmarClave","formControlName","confirmarClave",1,"form-control"],[1,"d-flex","justify-content-between","align-items-center"],[1,"mt-3"],["routerLink","../login",1,""],["type","submit",1,"btn","btn-primary","mt-2","fw-bold","fs-5"],[1,"d-block","text-danger"]],template:function(o,n){1&o&&(r.TgZ(0,"div",0)(1,"div",1)(2,"form",2),r.NdJ("ngSubmit",function(){return n.registrarUsuario()}),r.TgZ(3,"fieldset")(4,"legend"),r._uU(5," Complete sus datos para registrarse "),r.qZA(),r.TgZ(6,"div")(7,"label",3),r._uU(8,"Ingrese un nombre de usuario"),r.qZA(),r._UZ(9,"input",4),r.YNc(10,b,3,1,"ng-container",5),r.YNc(11,Z,3,0,"ng-container",5),r.qZA(),r.TgZ(12,"div")(13,"label",6),r._uU(14,"Ingrese su correo electr\xf3nico"),r.qZA(),r._UZ(15,"input",7),r.YNc(16,x,3,1,"ng-container",5),r.qZA(),r.TgZ(17,"div")(18,"label",8),r._uU(19,"Ingrese una contrase\xf1a"),r.qZA(),r._UZ(20,"input",9),r.YNc(21,y,3,1,"ng-container",5),r.qZA(),r.TgZ(22,"div")(23,"label",10),r._uU(24,"Reingrese la contrase\xf1a"),r.qZA(),r._UZ(25,"input",11),r.YNc(26,R,3,1,"ng-container",5),r.YNc(27,I,3,1,"ng-container",5),r.qZA(),r.TgZ(28,"div",12)(29,"label",13),r._uU(30,"\xbfYa pose\xe9 una cuenta? Ingrese "),r.TgZ(31,"a",14),r._uU(32,"AQUI"),r.qZA()(),r.TgZ(33,"button",15),r._uU(34," Registrar "),r.qZA()()()()()()),2&o&&(r.xp6(2),r.Q6J("formGroup",n.form),r.xp6(8),r.Q6J("ngIf",null==n.nombreUsuario?null:n.nombreUsuario.hasError("errorUsuario")),r.xp6(1),r.Q6J("ngIf",null==n.nombreUsuario?null:n.nombreUsuario.hasError("pattern")),r.xp6(5),r.Q6J("ngIf",null==n.correo?null:n.correo.hasError("errorCorreo")),r.xp6(5),r.Q6J("ngIf",null==n.clave?null:n.clave.hasError("minlength")),r.xp6(5),r.Q6J("ngIf",null==n.confirmarClave?null:n.confirmarClave.hasError("clavesDistintas")),r.xp6(1),r.Q6J("ngIf",null==n.confirmarClave?null:n.confirmarClave.hasError("longitudInvalida")))},dependencies:[f.O5,c.rH,t._Y,t.Fj,t.JJ,t.JL,t.sg,t.u],styles:[".centrar[_ngcontent-%COMP%]{margin:0 auto}.sombra[_ngcontent-%COMP%]{box-shadow:10px 10px 50px #ff060633;border-radius:30px}"]}),e})()}];let T=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({imports:[c.Bz.forChild(A),c.Bz]}),e})(),E=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({imports:[f.ez,T,t.u5,t.UX]}),e})()}}]);