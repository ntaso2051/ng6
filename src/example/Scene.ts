import * as PIXI from 'pixi.js';
import UpdateObject from '../interfaces/UpdateObject';
import Transition from '../interfaces/Transition';
import Immediate from '../example/transition/Immediate';

export default abstract class Scene extends PIXI.Container {
  protected transitionIn: Transition = new Immediate();
  protected transitionOut: Transition = new Immediate();

  public update(delta: number): void {
    if (this.transitionIn.isActive()) {
      this.transitionIn.update(delta);
    } else if (this.transitionOut.isActive()) {
      this.transitionOut.update(delta);
    }
  }

  protected registerUpdatingObject(object: UpdateObject): void {
    console.log(object);
  }

  protected updateRegisteredObjects(delta: number): void {
    console.log(delta);
  }

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
