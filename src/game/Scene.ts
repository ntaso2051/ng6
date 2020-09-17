import * as PIXI from 'pixi.js';
import UpdateObject from '../interfaces/UpdateObject';
import Immediate from './transition/Immediate';
import Transition from '../interfaces/Transition';
import LoaderAddParam from '../interfaces/PixiTypePolyfill/LoaderAddParam';
import GameMangager from './GameManager';
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

  // リソースのリストを返す
  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    return [];
  }

  // リソースダウンロードを開始
  public beginLoadResource(onLoaded: () => void): Promise<void> {
    return new Promise((resolve) => {
      this.loadInitialResource(() => resolve());
    })
      .then(() => {
        onLoaded();
      })
      .then(() => {
        this.onResourceLoaded();
      });
  }

  protected loadInitialResource(onLoaded: () => void): void {
    const assets = this.createInitialResourceList();
    const filteredAssets = this.filterLoadedAssets(assets);

    if (filteredAssets.length > 0) {
      GameMangager.instance.game.loader
        .add(filteredAssets)
        .load(() => onLoaded());
    } else {
      onLoaded();
    }
  }

  // beginLoadResource完了時のコールバックメソッド
  protected onResourceLoaded(): void {}

  private filterLoadedAssets(
    assets: (LoaderAddParam | string)[]
  ): LoaderAddParam[] {
    const assetMap = new Map<string, LoaderAddParam>();

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      if (typeof asset == 'string') {
        if (
          !GameMangager.instance.game.loader.resources[asset] &&
          !assetMap.has(asset)
        ) {
          assetMap.set(asset, { name: asset, url: asset });
        }
      } else {
        if (
          !GameMangager.instance.game.loader.resources[asset.name] &&
          !assetMap.has(asset.name)
        ) {
          assetMap.set(asset.name, asset);
        }
      }
    }
    return Array.from(assetMap.values());
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
