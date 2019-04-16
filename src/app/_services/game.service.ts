import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { PlayerAPI } from '../_api/players.api';
import { GameAPI } from '../_api/game.api';

@Injectable()
export class GameService {
  _alive;
  _player;
  _players;
  _game;

  _gameId = sessionStorage.getItem("gameId");
  _playerId = sessionStorage.getItem("playerId");

  get playerId() {
    return this._playerId;
  }
  set playerId(id) {
    sessionStorage.setItem("playerId", id);
    this._playerId = id;
  }
  get gameId() {
    return this._gameId;
  }
  set gameId(id) {
    sessionStorage.setItem("gameId", id);
    this._gameId = id;
  }
  get game() {
    return this._game;
  }
  get player() {
    return this._player;
  }
  get playerName() {
    return this._player.name;
  }

  constructor(
    public playerAPI:PlayerAPI,
    public gameAPI: GameAPI,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  async init(gameId, playerId) {
    this.playerId = playerId;
    this.gameId = gameId;
    this._player = this.playerAPI.player(gameId, playerId).subscribe(player => {
      this._player = player;
    });

    this.gameAPI.game(gameId).subscribe(game => {
      if (!game) {
        console.error("no game found");
        this.snackBar.open("no game found");
        this.router.navigate(["splash"]);
      } else {
        this._game = game;
      }
    });
  }
}
