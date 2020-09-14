import Scene from './Scene';
import * as PIXI from 'pixi.js';
import GameManager from './GameManager';
import FirstScene from './FirstScene';

export default class SecondScene extends Scene {
  private text!: PIXI.Text;
  private count: number = 0;

  constructor() {
    super();

    const renderer = GameManager.instance.game.renderer;

    this.text = new PIXI.Text(
      'second scene',
      new PIXI.TextStyle({
        fontSize: 64,
        fill: 0xffffff,
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

      this.text.text=`second scene\n${this.count++}`;
  }

  public nextScene(): void{
      GameManager.loadScene(new FirstScene());
      console.log('to firstscene');
  }
}