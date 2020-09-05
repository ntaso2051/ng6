import * as PIXI from 'pixi.js';
import UpdateObject from '../interfaces/UpdateObject';
import Transition from '../interfaces/Transition';
import Fade from '../example/transition/Fade';

export default abstract class Scene extends PIXI.Container {
    protected transitionIn: Transition = new Fade(1.0, 0.0, -0.01);
    protected transitionOut: Transition = new Fade(0.0, 1.0, 0.01);

  protected objectsToUpdate: UpdateObject[] = [];

  public update(delta: number): void {
    if (this.transitionIn.isActive()) {
      this.transitionIn.update(delta);
    } else if (this.transitionOut.isActive()) {
      this.transitionOut.update(delta);
    }
  }

  protected registerUpdatingObject(object: UpdateObject): void {
    this.objectsToUpdate.push(object);
  }

  protected updateRegisteredObjects(delta: number): void {
    const nextObjectstoUpdate = [];

    for (let i = 0; i < this.objectsToUpdate.length; i++) {
      const obj = this.objectsToUpdate[i];
      if (!obj || obj.isDestroyed()) {
        continue;
      }
      obj.update(delta);
      nextObjectstoUpdate.push(obj);
    }

    this.objectsToUpdate = nextObjectstoUpdate;
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
