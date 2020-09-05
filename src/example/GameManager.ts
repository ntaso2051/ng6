import * as PIXI from 'pixi.js';

export default class GameManager {
  public static instance: GameManager;
  public game!: PIXI.Application;

  constructor(app: PIXI.Application) {
    if (GameManager.instance) {
      throw new Error('GameManager can be instantiate only once');
    }

    this.game = app;
  }

  public static start(params: {
      glWidth: number,
      glHeight: number,
      bgColor: number
  }): void {
      const game=new PIXI.Application({
          width: params.glWidth,
          height: params.glHeight,
          backgroundColor: params.bgColor
      });
      const instance=new GameManager(game);
      GameManager.instance=instance;

      document.body.appendChild(game.view);

      game.ticker.add((delta: number)=>{
          console.log(delta);
      })
  }
}
