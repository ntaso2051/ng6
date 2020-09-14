import Transition from '../../interfaces/Transition';
import * as PIXI from 'pixi.js';

export default class Immediate implements Transition {
  private onTransitionFinished: () => void = () => {};
  private finished: boolean = false;

  // transitionに載るコンテナインスタンスを返す
  public getContainer(): PIXI.Container | null {
    return null;
  }

  // トランジションの開始処理。即終了する。
  public begin(): void {
    this.finished = true;
    this.onTransitionFinished();
  }

  // トランジションが開始したかどうかを返す。Immediateなので常にfalse;
  public isBegan(): boolean {
    return false;
  }

  // トランジションが終了したかどうかを返す。
  public isFinished(): boolean {
    return this.finished;
  }

  // トランジションアニメーションが実行中かどうかを返す。
  public isActive(): boolean {
    return false;
  }

  // トランジションの更新
  public update(_dt: number): void {
    return;
  }

  // トランジション終了時のコールバックを登録。
  public setCallback(callback: () => void): void {
    this.onTransitionFinished = callback;
  }
}
