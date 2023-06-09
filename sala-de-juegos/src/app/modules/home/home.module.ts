import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/chat.component';
import { SalaChatComponent } from './components/sala-chat/sala-chat.component';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './juegos/mayor-menor/mayor-menor.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { PreguntadosComponent } from './juegos/preguntados/preguntados.component';
import { BatallaDragonBallComponent } from './juegos/batalla-dragon-ball/batalla-dragon-ball.component';

@NgModule({
  declarations: [      
    ChatComponent, SalaChatComponent, AhorcadoComponent, MayorMenorComponent, BienvenidoComponent, PreguntadosComponent, BatallaDragonBallComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
  ]
})
export class HomeModule { }
