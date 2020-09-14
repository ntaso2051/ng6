import * as PIXI from 'pixi.js';
import UpdateObject from '../interfaces/UpdateObject';
import Immediate from './transition/Immediate';
import Transition from '../interfaces/Transition';
// import Fade from './transition/Fade';

export default abstract class Scene extends PIXI.Container {
  protected transitionIn: Transition = new Immediate();
  protected transitionOut: Transition = new Immediate();

  protected objectsToUpdate: UpdateObject[] = [];

  public update(delta: number): void {
    // メインループ
    if (this.transitionIn.isActive()) {
      this.transitionIn.update(delta);
    } else if (this.transitionOut.isActive()) {
      this.transitionOut.update(delta);
    }
  }

  // 更新するオブジェクトの登録
  protected registeredUpdatingObject(object: UpdateObject): void {
    // console.log(object);
    this.objectsToUpdate.push(object);
  }

  // 登録されたオブジェクトの更新
  protected updateRegisteredObjects(delta: number): void {
    // console.log(delta);
    const nextObjectsToUpdate: UpdateObject[] = [];

    for (let i = 0; i < this.objectsToUpdate.length; i++) {
      const obj = this.objectsToUpdate[i];
      if (!obj || obj.isDestroyed()) {
        continue;
      }
      obj.update(delta);
      nextObjectsToUpdate.push(obj);
    }

    this.objectsToUpdate = nextObjectsToUpdate;
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
    }

    this.transitionOut.begin();
  }
}
