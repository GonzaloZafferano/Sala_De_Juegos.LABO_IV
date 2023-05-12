import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate : [LoginGuard] },
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate : [LoginGuard] },
  { path: 'registro', loadChildren: () => import('./modules/registro/registro.module').then(m => m.RegistroModule) },
  { path: 'quien-soy', loadChildren: () => import('./modules/quien-soy/quien-soy.module').then(m => m.QuienSoyModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
