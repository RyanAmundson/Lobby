import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { GameService } from "../_services/game.service";
import { GameSettings } from "../_models/models";
import { WriteToFeed } from "../_decorators/write-to-feed.decorator";
import { PlayerAPI } from '../_api/players.api';
import { GameAPI } from '../_api/game.api';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.scss"]
})
export class LobbyComponent {
  gameId = this.gameState.gameId;
  playerId = this.gameState.playerId;
  curPlayer = this.playerAPI.getPlayer(this.gameId, this.playerId);
  players;
  tabs = ["Players", "Settings"];
  settings: GameSettings = new GameSettings();

  constructor(
    public playerAPI:PlayerAPI,
    public gameAPI: GameAPI,
    public router: Router,
    public gameState: GameService,
    public snack:MatSnackBar 
  ) {
    this.players = this.playerAPI.players(this.gameId);
    this.gameAPI.game(this.gameId).subscribe((game) => {
      if(!game) {
        snack.open("Lobby Closed",null,{duration:1500});
        this.router.navigate(["splash"]);
      }
    })
  }

  async start() {
  }

  ngOnDestroy(): void {
  }
}
