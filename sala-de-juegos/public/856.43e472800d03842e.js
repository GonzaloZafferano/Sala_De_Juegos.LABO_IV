"use strict";(self.webpackChunksala_de_juegos=self.webpackChunksala_de_juegos||[]).push([[856],{7856:(j,g,i)=>{i.r(g),i.d(g,{RegistroModule:()=>w});var f=i(6895),u=i(6647),t=i(433),m=i(904),d=i(2531),p=i(8335),r=i(4650),v=i(6939),h=i(7677),x=i(6643),U=i(4443);function _(o,n){1&o&&(r.TgZ(0,"div",3)(1,"span",4),r._uU(2,"Cargando..."),r.qZA(),r._UZ(3,"div",5),r.qZA())}function C(o,n){if(1&o&&(r.ynx(0),r.TgZ(1,"small",23),r._uU(2),r.qZA(),r.BQk()),2&o){const e=r.oxw(2);r.xp6(2),r.hij(" ",null==e.nombreUsuario?null:e.nombreUsuario.getError("errorUsuario")," ")}}function Z(o,n){1&o&&(r.ynx(0),r.TgZ(1,"small",23),r._uU(2," Formato inv\xe1lido para el nombre de usuario (letras y n\xfameros solamente). "),r.qZA(),r.BQk())}function b(o,n){if(1&o&&(r.ynx(0),r.TgZ(1,"small",23),r._uU(2),r.qZA(),r.BQk()),2&o){const e=r.oxw(2);r.xp6(2),r.Oqu(null==e.correo?null:e.correo.getError("errorCorreo"))}}function y(o,n){if(1&o&&(r.ynx(0),r.TgZ(1,"small",23),r._uU(2),r.qZA(),r.BQk()),2&o){const e=r.oxw(2);r.xp6(2),r.hij(" La clave debe contener por lo menos ",null==e.clave?null:e.clave.getError("minlength").requiredLength," caracteres. ")}}function A(o,n){if(1&o&&(r.ynx(0),r.TgZ(1,"small",23),r._uU(2),r.qZA(),r.BQk()),2&o){const e=r.oxw(2);r.xp6(2),r.hij(" ",null==e.confirmarClave?null:e.confirmarClave.getError("clavesDistintas").mensajeError," ")}}function I(o,n){if(1&o&&(r.ynx(0),r.TgZ(1,"small",23),r._uU(2),r.qZA(),r.BQk()),2&o){const e=r.oxw(2);r.xp6(2),r.hij(" ",null==e.confirmarClave?null:e.confirmarClave.getError("longitudInvalida").mensajeError," ")}}function R(o,n){if(1&o){const e=r.EpF();r.TgZ(0,"div",6)(1,"div",7)(2,"div",8)(3,"form",9),r.NdJ("ngSubmit",function(){r.CHM(e);const s=r.oxw();return r.KtG(s.registrarUsuario())}),r.TgZ(4,"fieldset")(5,"legend"),r._uU(6," Complete sus datos para registrarse "),r.qZA(),r.TgZ(7,"div")(8,"label",10),r._uU(9,"Ingrese un nombre de usuario"),r.qZA(),r._UZ(10,"input",11),r.YNc(11,C,3,1,"ng-container",12),r.YNc(12,Z,3,0,"ng-container",12),r.qZA(),r.TgZ(13,"div")(14,"label",13),r._uU(15,"Ingrese su correo electr\xf3nico"),r.qZA(),r._UZ(16,"input",14),r.YNc(17,b,3,1,"ng-container",12),r.qZA(),r.TgZ(18,"div")(19,"label",15),r._uU(20,"Ingrese una contrase\xf1a"),r.qZA(),r._UZ(21,"input",16),r.YNc(22,y,3,1,"ng-container",12),r.qZA(),r.TgZ(23,"div")(24,"label",17),r._uU(25,"Reingrese la contrase\xf1a"),r.qZA(),r._UZ(26,"input",18),r.YNc(27,A,3,1,"ng-container",12),r.YNc(28,I,3,1,"ng-container",12),r.qZA(),r.TgZ(29,"div",19)(30,"label",20),r._uU(31,"\xbfYa pose\xe9 una cuenta? Ingrese "),r.TgZ(32,"a",21),r._uU(33,"AQUI"),r.qZA()(),r.TgZ(34,"button",22),r._uU(35," Registrar "),r.qZA()()()()()()()}if(2&o){const e=r.oxw();r.xp6(3),r.Q6J("formGroup",e.form),r.xp6(8),r.Q6J("ngIf",null==e.nombreUsuario?null:e.nombreUsuario.hasError("errorUsuario")),r.xp6(1),r.Q6J("ngIf",null==e.nombreUsuario?null:e.nombreUsuario.hasError("pattern")),r.xp6(5),r.Q6J("ngIf",null==e.correo?null:e.correo.hasError("errorCorreo")),r.xp6(5),r.Q6J("ngIf",null==e.clave?null:e.clave.hasError("minlength")),r.xp6(5),r.Q6J("ngIf",null==e.confirmarClave?null:e.confirmarClave.hasError("clavesDistintas")),r.xp6(1),r.Q6J("ngIf",null==e.confirmarClave?null:e.confirmarClave.hasError("longitudInvalida"))}}const T=[{path:"",component:(()=>{class o{constructor(e,a,s,l,c){this.logDeUsuario=e,this.router=a,this.firestoreLogin=s,this.fsUsuarioService=l,this.toastPredeterminado=c,this.cargando=!1}ngOnInit(){this.form=new t.cw({nombreUsuario:new t.NI("",{validators:[t.kI.pattern("^[a-zA-Z1-9]+$")],asyncValidators:(0,m.kK)(this.fsUsuarioService),updateOn:"blur"}),correo:new t.NI("",{validators:[(0,m.qc)()],asyncValidators:(0,m.y$)(this.fsUsuarioService),updateOn:"blur"}),clave:new t.NI("",{validators:[t.kI.minLength(6)]}),confirmarClave:new t.NI("")},[(0,m.U5)(6)])}get nombreUsuario(){return this.form.get("nombreUsuario")}get correo(){return this.form.get("correo")}get clave(){return this.form.get("clave")}get confirmarClave(){return this.form.get("confirmarClave")}registrarUsuario(){this.cargando=!0;let e=!1,a=!1;for(const l in this.form.controls)if(this.form.controls.hasOwnProperty(l)){const c=this.form.controls[l];c.errors&&(e=!0),(null==c.value||""==c.value)&&(a=!0)}let s="";e&&(s+="Hay campos con errores, por favor corr\xedjalos para poder registrarse. </br>"),a&&(s+="Hay campos vac\xedos, por favor compl\xe9telos para poder registrarse."),(e||a)&&(this.toastPredeterminado.error(s,"Registro inv\xe1lido."),this.cargando=!1),!e&&!a&&this.registrarUsuarioEnFirestore()}registrarUsuarioEnFirestore(){let e="";this.firestoreLogin.registrarUsuario(this.correo?.value,this.clave?.value).then(a=>{let s=a.user?.uid;if(null!=s){let l=new d.b(this.nombreUsuario?.value,this.correo?.value,this.clave?.value,new Date,s);this.limpiarFormulario(),this.fsUsuarioService.cargarUsuarioConIdAsignado(l).then(c=>{this.logDeUsuario.cargarUsuarioConIdAsignado(new p.Z(l.id)),this.toastPredeterminado.exito("El registro se ha completado exitosamente!.","Registro exitoso"),this.router.navigate(["../home"]),setTimeout(()=>{this.cargando=!1},1e3)})}else this.toastPredeterminado.error("Ha ocurrido un error al intentar guardar los datos del usuario registrado.","Ha ocurrido un error."),this.cargando=!1}).catch(a=>{switch(a.code){case"auth/invalid-email":e="Formato de correo electr\xf3nico inv\xe1lido.";break;case"auth/missing-password":e="Falta ingresar la contrase\xf1a.";break;case"auth/weak-password":e="La contrase\xf1a debe contener al menos 6 caracteres.";break;case"auth/email-already-in-use":e="El correo electr\xf3nico ingresado ya est\xe1 en uso.";break;default:e="Ha ocurrido un error y no se pudo registrar el usuario."}""!=e&&(this.toastPredeterminado.error(e,"Ha ocurrido un error!"),this.cargando=!1)})}limpiarFormulario(){this.form.reset();for(const e in this.form.controls)this.form.controls.hasOwnProperty(e)&&this.form.controls[e].setValue("")}}return o.\u0275fac=function(e){return new(e||o)(r.Y36(v.n),r.Y36(u.F0),r.Y36(h.I),r.Y36(x.u),r.Y36(U.j))},o.\u0275cmp=r.Xpm({type:o,selectors:[["app-registro"]],decls:4,vars:2,consts:[[1,"container"],["class","d-flex justify-content-center","style","align-items: center; height: 100% !important;",4,"ngIf","ngIfElse"],["formulario",""],[1,"d-flex","justify-content-center",2,"align-items","center","height","100% !important"],[1,"m-3","fs-3","fw-bold","text-light"],[1,"spinner-border","text-light",2,"align-self","center","scale","1.2"],[1,"row","w-100","d-flex","justify-content-center","ml-0"],[1,"col","col-12","justify-content-center","col-lg-6"],[1,"card","p-4","mt-4","centrar","sombra-luminosa"],[3,"formGroup","ngSubmit"],["for","nombreUsuario",1,"form-label"],["type","text","id","nombreUsuario","formControlName","nombreUsuario",1,"form-control"],[4,"ngIf"],["for","correo",1,"form-label"],["type","email","id","correo","formControlName","correo",1,"form-control"],["for","clave",1,"form-label"],["type","password","id","clave","formControlName","clave",1,"form-control"],["for","confirmarClave",1,"form-label"],["type","password","id","confirmarClave","formControlName","confirmarClave",1,"form-control"],[1,"d-flex","justify-content-between","align-items-center"],[1,"mt-3"],["routerLink","../login",1,""],["type","submit",1,"btn","btn-primary","mt-2","fw-bold"],[1,"d-block","text-danger"]],template:function(e,a){if(1&e&&(r.TgZ(0,"div",0),r.YNc(1,_,4,0,"div",1),r.YNc(2,R,36,7,"ng-template",null,2,r.W1O),r.qZA()),2&e){const s=r.MAs(3);r.xp6(1),r.Q6J("ngIf",a.cargando)("ngIfElse",s)}},dependencies:[f.O5,u.rH,t._Y,t.Fj,t.JJ,t.JL,t.sg,t.u],styles:[".centrar[_ngcontent-%COMP%]{margin:0 auto}*[_ngcontent-%COMP%]{font-size:1.05em}.sombra[_ngcontent-%COMP%]{box-shadow:10px 10px 50px #ff060633;border-radius:30px}"]}),o})()}];let E=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=r.oAB({type:o}),o.\u0275inj=r.cJS({imports:[u.Bz.forChild(T),u.Bz]}),o})(),w=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=r.oAB({type:o}),o.\u0275inj=r.cJS({imports:[f.ez,E,t.u5,t.UX]}),o})()}}]);