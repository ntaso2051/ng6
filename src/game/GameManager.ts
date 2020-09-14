import * as PIXI from 'pixi.js';
import Scene from './Scene';

export default class GameMangager {
  public static instance: GameMangager;
  public game!: PIXI.Application;
  private sceneTransitionOutFinished: boolean = true;
  private currentScene?: Scene;

  constructor(app: PIXI.Application) {
    if (GameMangager.instance) {
      throw new Error('GameManager can be instantiate only once');
    }
    this.game = app;
  }

  public static start(params: {
    glWidth: number;
    glHeight: number;
    backgroundColor: 0x222222;
  }): void {
    // PIXI.Applicationを生成
    const game = new PIXI.Application({
      width: params.glWidth,
      height: params.glHeight,
      backgroundColor: params.backgroundColor,
    });
    // GameManagerをインスタンス化
    GameMangager.instance = new GameMangager(game);
    // canvasをDOMに追加
    document.body.appendChild(game.view);

    game.ticker.add((delta: number) => {
      // メインループ
      // console.log(delta);
      if(this.instance.currentScene){
        this.instance.currentScene.update(delta);
      }
    });
  }

  // シーン遷移に関する処理系
  public static transitionInIfPossible(newScene: Scene): boolean {
    const instance = GameMangager.instance;

    if (!instance.sceneTransitionOutFinished) {
      return false;
    }

    if (instance.currentScene) {
      instance.currentScene.destroy();
    }
    instance.currentScene = newScene;

    if (instance.game) {
      instance.game.stage.addChild(newScene);
    }

    newScene.beginTransitionIn((_: Scene) => {});

    return true;
  }

  public static loadScene(newScene: Scene): void {
    const instance = GameMangager.instance;

    if (instance.currentScene) {
      instance.sceneTransitionOutFinished = false;
      instance.currentScene.beginTransitionOut((_: Scene) => {
        instance.sceneTransitionOutFinished = true;
        GameMangager.transitionInIfPossible(newScene);
      });
    } else {
      instance.sceneTransitionOutFinished = true;
      GameMangager.transitionInIfPossible(newScene);
    }
  }
}
