"use strict";(self.webpackChunksala_de_juegos=self.webpackChunksala_de_juegos||[]).push([[592],{6417:(D,_,n)=>{n.d(_,{u:()=>i});var i=(()=>{return(r=i||(i={}))[r.asc=0]="asc",r[r.desc=1]="desc",i;var r})()},1117:(D,_,n)=>{n.d(_,{n:()=>i});var i=(()=>{return(r=i||(i={}))[r.igual=0]="igual",r[r.distinto=1]="distinto",r[r.mayor=2]="mayor",r[r.mayorOIgual=3]="mayorOIgual",r[r.menor=4]="menor",r[r.menorOIgual=5]="menorOIgual",i;var r})()},8335:(D,_,n)=>{n.d(_,{Z:()=>i});class i{constructor(d="",l=new Date){this.id=d,this.fecha=l}}},2531:(D,_,n)=>{n.d(_,{b:()=>i});class i{constructor(d="",l="",b="",c=new Date,a=""){this.usuario=d,this.correo=l,this.clave=b,this.id=a,this.fechaRegistro=c}}},9814:(D,_,n)=>{n.d(_,{V:()=>c});var i=n(5861),r=n(9313),d=n(6417),l=n(1117),b=n(4650);let c=(()=>{class a{constructor(t){this.firestore=t}guardarObjetoSinIdAsignado(t,e){const s=(0,r.hJ)(this.firestore,t),u=(0,r.JU)(s);return e.id=u.id,(0,r.pl)(u,e)}guardarObjetoConIdAsignado(t,e){const s=(0,r.hJ)(this.firestore,t),u=(0,r.JU)(s);return(0,r.pl)(u,e)}traerListaDeObjetos(t){var e=this;return(0,i.Z)(function*(){const s=(0,r.hJ)(e.firestore,t),u=yield(0,r.PL)(s).then(f=>f),h=[];return u.forEach(f=>{h.push(f.data())}),h})()}traerListaDeObjetosConObservable(t){const e=(0,r.hJ)(this.firestore,t);return(0,r.BS)(e)}traerListaDeObjetosFiltrada(t,e,s,u){var h=this;return(0,i.Z)(function*(){const f=(0,r.hJ)(h.firestore,t);let v;v=(0,r.IO)(f,(0,r.ar)(e,u==l.n.igual?"==":"!=",s));const m=yield(0,r.PL)(v).then(O=>O),E=[];return m.forEach(O=>{E.push(O.data())}),E})()}traerListaDeObjetosFiltradaConObservable(t,e,s,u){const h=(0,r.hJ)(this.firestore,t);return(0,r.BS)((0,r.IO)(h,(0,r.ar)(e,u==l.n.igual?"==":"!=",s)))}traerListaDeObjetosOrdenadaConObservable(t,e,s){const u=(0,r.hJ)(this.firestore,t);return(0,r.BS)((0,r.IO)(u,(0,r.Xo)(e,s==d.u.asc?"asc":"desc")))}modificarObjeto(t,e){(0,r.hJ)(this.firestore,t);const u=(0,r.JU)(e.id);return(0,r.r7)(u,{...e})}eliminarObjeto(t,e){const s=(0,r.hJ)(this.firestore,t),u=(0,r.JU)(s,e);return(0,r.oe)(u)}}return a.\u0275fac=function(t){return new(t||a)(b.LFG(r.gg))},a.\u0275prov=b.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})()},6643:(D,_,n)=>{n.d(_,{u:()=>b});var i=n(5861),r=n(1117),d=n(4650),l=n(9814);let b=(()=>{class c{constructor(o){this.firestoreDB=o,this.nombreColeccion="usuarios"}cargarUsuarioConIdAsignado(o){return this.firestoreDB.guardarObjetoConIdAsignado(this.nombreColeccion,{...o})}traerUsuarioPorId(o){var t=this;return(0,i.Z)(function*(){let e=yield t.firestoreDB.traerListaDeObjetosFiltrada(t.nombreColeccion,"id",o,r.n.igual);return e&&e.length>0?e[0]:null})()}obtenerListaDeUsuarios(){return this.firestoreDB.traerListaDeObjetos(this.nombreColeccion)}obtenerListadoDeUsuariosObservable(){return this.firestoreDB.traerListaDeObjetosConObservable(this.nombreColeccion)}modificarUsuario(o){return this.firestoreDB.modificarObjeto(this.nombreColeccion,o)}eliminarUsuario(o){return this.firestoreDB.eliminarObjeto(this.nombreColeccion,o)}traerListaDeCorreosFiltradaConObservable(o){return this.firestoreDB.traerListaDeObjetosFiltradaConObservable(this.nombreColeccion,"correo",o,r.n.igual)}traerListaDeUsuariosFiltradaConObservable(o){return this.firestoreDB.traerListaDeObjetosFiltradaConObservable(this.nombreColeccion,"usuario",o,r.n.igual)}traerListaDeCorreosFiltrada(o){return this.firestoreDB.traerListaDeObjetosFiltrada(this.nombreColeccion,"correo",o,r.n.igual)}}return c.\u0275fac=function(o){return new(o||c)(d.LFG(l.V))},c.\u0275prov=d.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),c})()},6939:(D,_,n)=>{n.d(_,{n:()=>d});var i=n(4650),r=n(9814);let d=(()=>{class l{constructor(c){this.firestoreDB=c,this.nombreColeccion="logsDeUsuarios"}cargarUsuarioConIdAsignado(c){return this.firestoreDB.guardarObjetoConIdAsignado(this.nombreColeccion,{...c})}obtenerListaDeLogs(){return this.firestoreDB.traerListaDeObjetos(this.nombreColeccion)}obtenerListadoDeLogsObservable(){return this.firestoreDB.traerListaDeObjetosConObservable(this.nombreColeccion)}}return l.\u0275fac=function(c){return new(c||l)(i.LFG(r.V))},l.\u0275prov=i.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})()},904:(D,_,n)=>{n.d(_,{U5:()=>r,kK:()=>b,qc:()=>d,y$:()=>c});var i=n(4004);function r(a){return o=>{const t=o.get("clave"),e=o.get("confirmarClave"),s={};return t?.value!==e?.value&&(s.clavesDistintas={hayError:!0,mensajeError:"Las clave y confirmaci\xf3n NO conciden."}),(null==e||null==e.value||""!=e.value&&e.value.length<4)&&(s.longitudInvalida={hayError:!0,mensajeError:`La confirmaci\xf3n de clave debe contener por lo menos ${a} caracteres. \n`}),Object.keys(s).length?(o.get("confirmarClave")?.setErrors(s),s):(o.get("confirmarClave")?.setErrors(null),null)}}function d(){return a=>{let t="",e=!1;if(null!=a&&null!=a.value&&a.value.length>0&&!/^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/.test(a.value)&&(t+="El formato de correo electr\xf3nico es invalido. ",e=!0),e){const s={errorCorreo:t};return a?.setErrors(s),s}return a?.setErrors(null),null}}function b(a){return o=>a.traerListaDeUsuariosFiltradaConObservable(o.value).pipe((0,i.U)(e=>{if(e.length>0){const s={errorUsuario:"El nombre de usuario ya existe."};return o.setErrors(s),s}return null}))}function c(a){return o=>a.traerListaDeCorreosFiltradaConObservable(o.value).pipe((0,i.U)(e=>{if(e.length>0){const u={errorCorreo:"El correo electr\xf3nico ingresado ya existe."};return o.setErrors(u),u}return null}))}}}]);