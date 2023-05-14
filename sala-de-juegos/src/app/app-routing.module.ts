import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login/login.guard';
import { HomeGuard } from './guards/home/home.guard';
import { RegistroGuard } from './guards/registro/registro.guard';


const routes: Routes = [
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule), canActivate : [LoginGuard] },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate : [HomeGuard] },
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate : [HomeGuard] },
  { path: 'registro', loadChildren: () => import('./modules/registro/registro.module').then(m => m.RegistroModule),  canActivate : [RegistroGuard]  },
  { path: 'quien-soy', loadChildren: () => import('./modules/quien-soy/quien-soy.module').then(m => m.QuienSoyModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
