import * as PIXI from 'pixi.js';
import UpdateObject from '../interfaces/UpdateObject';
import Immediate from './transition/Immediate';
import Transition from '../interfaces/Transition';

export default abstract class Scene extends PIXI.Container {
  protected transitionIn: Transition = new Immediate();
  protected transitionOut: Transition = new Immediate();

  public update(delta: number): void {
    // メインループ
    this.updateRegisteredObjects(delta);
  }

  // 更新するオブジェクトの登録
  protected registeredUpdatingObject(object: UpdateObject): void {
    console.log(object);
  }

  // 登録されたオブジェクトの更新
  protected updateRegisteredObjects(delta: number): void {
    console.log(delta);
  }

  // シーン開始のトランジション　引数は終了時のコールバック
  public beginTransitionIn(onTransitionFinished: (scene: Scene) => void): void {
    this.transitionIn.setCallback(() => onTransitionFinished(this));

    const container = this.transitionIn.getContainer();
    if (container) {
      this.addChild(container);
    }

    this.transitionIn.begin();
  }

  public beginTransitionOut(
    onTransitionFinished: (scene: Scene) => void
  ): void {
    this.transitionOut.setCallback(() => onTransitionFinished(this));
    const container = this.transitionOut.getContainer();
    if (container) {
      this.addChild(container);
      this.transitionOut.begin();
    }
  }
}
