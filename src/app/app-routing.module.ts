import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SplashComponent } from "./splash/splash.component";
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
  {
    path: "splash",
    component: SplashComponent
  },
  {
    path: "lobby",
    component: LobbyComponent
  },
  {
    path: "",
    component: SplashComponent
  },
  {
    path: "**",
    component: SplashComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
