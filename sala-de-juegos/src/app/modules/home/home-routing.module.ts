import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SalaChatComponent } from './components/sala-chat/sala-chat.component';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [ //Los que esten marcados como 'children' se cargaran en el <router-outlet></router-outlet> del que este como componente padre
      { path: 'chat', component: SalaChatComponent }, //Este se cargara dentro del componente padre 'HomeComponent'
      { path: 'ahorcado', component: AhorcadoComponent }, //Este se cargara dentro del componente padre 'HomeComponent'
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
