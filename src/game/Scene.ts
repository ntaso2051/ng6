import * as PIXI from 'pixi.js';
import UpdateObject from '../interfaces/UpdateObject'

export default abstract class Scene extends PIXI.Container {
    public update(delta: number): void{
        // メインループ
        this.updateRegisteredObjects(delta);
    }

    // 更新するオブジェクトの登録
    protected registeredUpdatingObject(object: UpdateObject): void{
        console.log(object);
    }

    // 登録されたオブジェクトの更新
    protected updateRegisteredObjects(delta: number): void{
        console.log(delta);
    }

    // シーン開始のトランジション　引数は終了時のコールバック
    public beginTransitionIn(onTransitionFinished: (scene: Scene)=>void): void{
        
        onTransitionFinished(this);
    }

    public beginTransitionOut(onTransitionFinished: (scene: Scene)=>void): void{

        onTransitionFinished(this);
    }
}