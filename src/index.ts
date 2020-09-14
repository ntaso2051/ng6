// import * as PIXI from 'pixi.js';
import GameManager from './game/GameManager';
import FirstScene from './game/FirstScene';

window.onload = () => {
  GameManager.start({
    glWidth: 1136,
    glHeight: 640,
    backgroundColor: 0x222222,
  });
  // 最初のシーンの読み込み
  GameManager.loadScene(new FirstScene());

  // コンソールからオブジェクトを調査できるように window に生やす
  Debug: {
    (window as any).GameManager = GameManager;
  }
};
