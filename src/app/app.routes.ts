import { RouterModule, Routes } from '@angular/router';
import { GameCodeComponent } from './game-code/game-code.component';
import { Componente2Component } from './componente2/componente2.component';
import { NgModule } from '@angular/core';
import { PrincipalComponent } from './principal/principal.component';
import { Componente1Component } from './componente1/componente1.component';

export const routes: Routes = [
  { path: '', component: PrincipalComponent},
  { path: 'componente1', component: Componente1Component},
  { path: 'componente2', component: Componente2Component},
    { path: 'game-code', component: GameCodeComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
