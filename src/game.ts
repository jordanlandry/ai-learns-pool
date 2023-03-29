import { Ball } from "./ball";
import { Player } from "./player";

export class Game {
  balls: Ball[];
  player: Player;

  constructor() {
    this.balls = [];
    this.player = new Player("John", 0);
  }
}
