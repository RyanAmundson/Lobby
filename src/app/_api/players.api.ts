import { Injectable } from "@angular/core";
import { FirebaseApp } from "@angular/fire";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Game, Player, Pool } from "../_models/models";
import { DataSnapshot } from "@angular/fire/database/interfaces";
import { Observable } from "rxjs";

@Injectable()
export class PlayerAPI {
  constructor(public db: AngularFireDatabase, public http: HttpClient) {}


  getPlayers(gameId: string): Promise<Player[]> {
    return this.db.database
      .ref(`games/${gameId}/players`)
      .once("value")
      .then((dataSnapshot: DataSnapshot) => dataSnapshot.val());
  }

  getPlayer(gameId: string, playerId: string): Promise<Player> {
    return this.db.database
      .ref(`games/${gameId}/players/${playerId}`)
      .once("value")
      .then((dataSnapshot: DataSnapshot) => {
        return dataSnapshot.val();
      });
  }

  getPlayerIdByName(gameId: string, name: string): Promise<string> {
    return this.db.database
      .ref(`games/${gameId}/players`)
      .once("value")
      .then((dataSnapshot: DataSnapshot) => {
        if (dataSnapshot.val()) {
          const players = Object.entries(dataSnapshot.val()).filter(
            (a: any) => a[1].name === name
          );
          if (players && players[0]) {
            const pid = players[0][0];
            return pid;
          }
          return null;
        }
      });
  }

  async addPlayer(gameId: string, name: string): Promise<string> {
    const players = await this.db.database
      .ref(`games/${gameId}/players`)
      .once("value");
    const first = players.val() ? false : true;

    return this.db.database.ref(`games/${gameId}/players`).push({
      name, // shorthand
      isPartyLeader: first
    } as Player).key;
  }

  player(gameId: string, playerId: string): Observable<Player> {
    return this.db
      .object(`games/${gameId}/players/${playerId}`)
      .valueChanges() as Observable<Player>;
  }

  players(gameId: string): Observable<Player[]> {
    return this.db.list(`games/${gameId}/players`).valueChanges() as Observable<
      Player[]
    >;
  }

  removePlayer(gameId: string, playerId: string): Promise<void> {
    return this.db.object(`games/${gameId}/players/${playerId}`).remove();
  }

  getPlayerRef(gameId: string, playerId: string) {
    return this.db.database.ref(`games/${gameId}/players/${playerId}`);
  }

  setPartyLeader(gameId: string, playerId: string): Promise<any> {
    return this.db.database
      .ref(`games/${gameId}/players`)
      .once("value")
      .then(players => {
        players.forEach(player => {
          this.db.database
            .ref(`games/${gameId}/players/${player.key}/isPartyLeader`)
            .set(false);
        });
        this.db.database
          .ref(`games/${gameId}/players/${playerId}/isPartyLeader`)
          .set(true);
      });
  }

}
