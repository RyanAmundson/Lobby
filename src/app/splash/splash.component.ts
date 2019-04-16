import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GameService } from "../_services/game.service";
import { VERSION } from '../../environments/version';
import { PlayerAPI } from '../_api/players.api';
import { GameAPI } from '../_api/game.api';

@Component({
  selector: "splash",
  templateUrl: "./splash.component.html",
  styleUrls: ["./splash.component.scss"]
})
export class SplashComponent {
  @ViewChild("nameInput") nameInput;
  @ViewChild("gameInput") gameInput;
  gameId;
  playerId;
  name;
  version = VERSION.version;

  constructor(
    public playerAPI: PlayerAPI,
    public gameAPI: GameAPI,
    public router: Router,
    public gameState: GameService
  ) {}

  async joinGame() {
    if (!this.name || !this.gameId) return;

    let isNewGame = false;
    const game = await this.gameAPI.getGame(this.gameId);
    if (!game) {
      console.log("no game, creating new one.");
      isNewGame = true;
      this.gameId = this.gameId.toLowerCase()
      await this.gameAPI.newGame(this.gameId);
      this.playerId = await this.playerAPI.addPlayer(this.gameId, this.name);
      this.playerAPI.setPartyLeader(this.gameId, this.playerId);
      this.gameAPI.setGameState(this.gameId, "lobby");
    } else {
      this.playerId = await this.playerAPI.getPlayerIdByName(this.gameId, this.name);
      if (!this.playerId) {
        this.playerId = await this.playerAPI.addPlayer(this.gameId, this.name);
      }
    }

    this.gameState.gameId = this.gameId;
    this.gameState.playerId = this.playerId;
    this.router.navigate(["lobby"]);
  }

  deleteAllGames() {
    this.gameAPI.deleteAllGames();
  }
}
