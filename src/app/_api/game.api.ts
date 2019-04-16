import { Injectable } from "@angular/core";
import { FirebaseApp } from "@angular/fire";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Game, Player, Pool } from "../_models/models";
import { DataSnapshot } from "@angular/fire/database/interfaces";
import { Observable } from "rxjs";

@Injectable()
export class GameAPI {
  constructor(public db: AngularFireDatabase, public http: HttpClient) {}

  resetGame(gameId: string): Promise<any> {
    let playersRef = this.db.database.ref(`games/${gameId}/players`);
    let p2 = playersRef.remove();
    return p2;
  }

  newGame(id?: string): Promise<string> {
    if (id) {
      return this.db.database
        .ref(`games/${id}`)
        .set({
          players: []
        })
        .then(() => {
          return id;
        });
    } else {
      let ref = this.db.database.ref(`games`).push({
        players: [],
      });
      return ref.then(() => {
        return ref.key;
      });
    }
  }

  getGame(gameId: string): Promise<Game> {
    return this.db.database
      .ref(`games/${gameId}`)
      .once("value")
      .then(res => res.val());
  }

  game(gameId: string): Observable<Game> {
    return this.db.object(`games/${gameId}`).valueChanges() as Observable<Game>;
  }

  deleteGame(gameId: string) {
    return this.db.object(`games/${gameId}`).remove() as Promise<any>;
  }

  deleteAllGames() {
    return this.db.database.ref("games").remove() as Promise<any>;
  }

  setGameState(gameId: string, state: string): Promise<any> {
    return this.db.database.ref(`games/${gameId}/settings/state`).set(state);
  }

  getGameState(gameId: string): Promise<any> {
    return this.db.database.ref(`games/${gameId}/settings/state`).once("value");
  }

  gameState(gameId: string): Observable<any> {
    return this.db.object(`games/${gameId}/settings/state`).valueChanges();
  }

  getSettings(gameId: string): Promise<any> {
    return this.db.database
      .ref(`games/${gameId}`)
      .child("settings")
      .once("value");
  }
}
