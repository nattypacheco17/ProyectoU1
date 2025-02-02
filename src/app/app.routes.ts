import { RouterModule, Routes } from '@angular/router';
import { GameCodeComponent } from './game-code/game-code.component';
import { Componente2Component } from './componente2/componente2.component';
import { NgModule } from '@angular/core';
import { PrincipalComponent } from './principal/principal.component';
import { TablaComponent } from './tabla/tabla.component';
import { Componente5Component } from './componente5/componente5.component';
import { PlayerNameNumberComponent } from './player-name-number/player-name-number.component';

export const routes: Routes = [
  { path: '', component: PrincipalComponent},
  { path: 'componente2', component: Componente2Component},
  { path: 'tabla', component: TablaComponent},
  { path: 'game-code', component: GameCodeComponent},
  { path: 'componente5', component: Componente5Component},
  { path: 'PlayerNameNumber', component: PlayerNameNumberComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
