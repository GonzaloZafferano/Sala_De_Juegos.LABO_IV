import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SalaChatComponent } from './components/sala-chat/sala-chat.component';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './juegos/mayor-menor/mayor-menor.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { PreguntadosComponent } from './juegos/preguntados/preguntados.component';
import { BatallaDragonBallComponent } from './juegos/batalla-dragon-ball/batalla-dragon-ball.component';

const routes: Routes = [ 
  {
    path: '', component: HomeComponent,
    children: [ //Los que esten marcados como 'children' se cargaran en el <router-outlet></router-outlet> del que este como componente padre
      { path: '', component: BienvenidoComponent }, //Este se cargara dentro del componente padre 'HomeComponent'
      { path: 'chat', component: SalaChatComponent }, //Este se cargara dentro del componente padre 'HomeComponent'
      { path: 'ahorcado', component: AhorcadoComponent }, //Este se cargara dentro del componente padre 'HomeComponent'
      { path: 'mayor-menor', component: MayorMenorComponent }, //Este se cargara dentro del componente padre 'HomeComponent'
      { path: 'preguntados', component: PreguntadosComponent }, //Este se cargara dentro del componente padre 'HomeComponent'
      { path: 'batallaDragonBall', component: BatallaDragonBallComponent }, //Este se cargara dentro del componente padre 'HomeComponent'
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
