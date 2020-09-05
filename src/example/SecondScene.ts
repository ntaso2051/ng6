import * as PIXI from 'pixi.js';
import GameManager from '../example/GameManager';
import Scene from '../example/Scene';
import FirstScene from '../example/FirstScene';

export default class SecondScene extends Scene {
  private text!: PIXI.Text;

  // private count: number = 0;

  constructor() {
    super();

    const renderer = GameManager.instance.game.renderer;

    this.text = new PIXI.Text(
      'first Scene',
      new PIXI.TextStyle({
        fontSize: 64,
        fill: 0xffffff,
      })
    );
    this.text.interactive = true;
    this.text.anchor.set(0.5, 0.5);
    this.text.position.set(renderer.width * 0.5, renderer.height * 0.5);
    this.text.on('pointerdown', this.nextScene);
    this.addChild(this.text);
  }

  public update(dt: number): void {
    super.update(dt);
    this.text.text = `second Scene\n`;
  }

  public nextScene(): void {
    GameManager.loadScene(new FirstScene());
  }
}
