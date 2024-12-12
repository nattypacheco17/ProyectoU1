import { RouterModule, Routes } from '@angular/router';
import { GameCodeComponent } from './game-code/game-code.component';
import { Componente2Component } from './componente2/componente2.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'game-code', component: GameCodeComponent},
    { path: 'componente2', component: Componente2Component},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
