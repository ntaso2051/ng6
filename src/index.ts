import * as WebFont from 'webfontloader';
// import * as PIXI from 'pixi.js';
import GameManager from './game/GameManager';
import TitleScene from './game/Scenes/TitleScene';
// import './game/Config';

// let fontLoaded: boolean = false;
// let windowLoaded: boolean = false;

WebFont.load({
  custom: {
    families: ['misaki_gothic.ttf'],
    urls: ['./base.css'],
  },
  active: () => {
    // fontLoaded = true;
    initGame();
  },
});
window.onload = () => {
  // windowLoaded = true;
  //if (fontLoaded) {
    initGame();
  //}
};
function initGame(): void {
  GameManager.start({
    glWidth: 800,
    glHeight: 640,
    backgroundColor: 0x222222,
  });
  // 最初のシーンの読み込み
  GameManager.loadScene(new TitleScene());

  // コンソールからオブジェクトを調査できるように window に生やす
  Debug: {
    (window as any).GameManager = GameManager;
  }
}
