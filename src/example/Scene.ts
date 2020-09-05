import * as PIXI from 'pixi.js';
import UpdateObject from '../interfaces/UpdateObject'

export default abstract class Scene extends PIXI.Container {
    public update(delta: number): void {
        this.updateRegisteredObjects(delta);
    }

    protected registerUpdatingObject(object: UpdateObject): void {
        console.log(object);
    }

    protected updateRegisteredObjects(delta: number): void {
        console.log(delta);
    }

    public beginTransitionIn(onTransitionFinished: (scene: Scene)=>void): void {
        onTransitionFinished(this);
    }

    public beginTransitionOut(onTransitionFinished: (scene: Scene)=>void): void {
        onTransitionFinished(this);
    }

}