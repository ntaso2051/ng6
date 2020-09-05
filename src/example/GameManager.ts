import * as PIXI from 'pixi.js';
import Scene from './Scene';

export default class GameManager {
  public static instance: GameManager;
  public game!: PIXI.Application;

  //シーン遷移が完了したか否かのフラグ
  private sceneTransitionOutFinished: boolean = true;

  //現在のシーン
  private currentScene?: Scene;

  constructor(app: PIXI.Application) {
    if (GameManager.instance) {
      throw new Error('GameManager can be instantiate only once');
    }

    this.game = app;
  }

  public static start(params: {
    glWidth: number;
    glHeight: number;
    bgColor: number;
  }): void {
    const game = new PIXI.Application({
      width: params.glWidth,
      height: params.glHeight,
      backgroundColor: params.bgColor,
    });
    const instance = new GameManager(game);
    GameManager.instance = instance;

    document.body.appendChild(game.view);

    game.ticker.add((delta: number) => {
      if (instance.currentScene) {
        instance.currentScene.update(delta);
      }
    });
  }

  // 可能であれば、新しいシーンへの移動を開始
  public static transitionInIfPossible(newScene: Scene): boolean {
    const instance = GameManager.instance;

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
    const instance = GameManager.instance;

    if (instance.currentScene) {
      instance.sceneTransitionOutFinished = false;
      instance.currentScene.beginTransitionOut((_: Scene) => {
        instance.sceneTransitionOutFinished = true;
        GameManager.transitionInIfPossible(newScene);
      });
    } else {
      instance.sceneTransitionOutFinished = true;
      GameManager.transitionInIfPossible(newScene);
    }
  }
}
