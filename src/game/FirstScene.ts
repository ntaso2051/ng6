import Scene from './Scene';
import * as PIXI from 'pixi.js';
import GameManager from './GameManager';
import SecondScene from './SecondScene';
import Fade from './transition/Fade';

export default class FirstScene extends Scene {
  private text!: PIXI.Text;
  private count: number = 0;

  constructor() {
    super();

    this.transitionIn = new Fade(1.0, 0.0, -0.01);
    this.transitionOut = new Fade(0.0, 1.0, 0.01);

    const renderer = GameManager.instance.game.renderer;

    this.text = new PIXI.Text(
      'first scene',
      new PIXI.TextStyle({
        fontSize: 64,
        fill: 0xffffff,
        fontFamily: 'MisakiGothic',
      })
    );
    this.text.interactive = true;
    this.text.anchor.set(0.5, 0.5);
    this.text.position.set(renderer.width * 0.5, renderer.height * 0.5);
    this.addChild(this.text);

    this.text.on('pointerdown', this.nextScene);
  }

  public update(dt: number): void {
    super.update(dt);

    this.text.text = `first scene\n${this.count++}`;
  }

  public nextScene(): void {
    GameManager.loadScene(new SecondScene());
    console.log(`to second scene`);
  }
}
