import * as PIXI from 'pixi.js';
import UI from './UI';

export default class SlotGame {
  public static readonly width: number = 800;
  public static readonly height: number = 640;
  public static readonly resources: string[] = [
    '/assets/character.png',
    '/assets/water.png',
    '/assets/stairs.png',
    '/assets/green.png',
  ];

  private app!: PIXI.Application;
  private ui!: UI;
  private onReady: () => void = () => {};

  constructor() {
      if(!document.body){
          throw new Error('window is not ready');
      }

      // PIXI.Applicationのインスタンス化
      this.app=new PIXI.Application({
          width: SlotGame.width,
          height: SlotGame.height,
          backgroundColor: 0x1099bb,
      });

      // canvasをDOMに追加
      document.body.appendChild(this.app.view);

      // リソースのロード
      for(let i=0;i<SlotGame.resources.length;i++){
          const resource=SlotGame.resources[i];
          this.app.loader.add(resource);
      }

      // リソースをロード、その後、UIと初期化完了イベントを飛ばすコールバック
      this.app.loader.load(()=>{
          this.ui=new UI();
          this.onReady();
      });
  }

  public start(): void {
      if(!this.ui){
          this.onReady=()=>this.start();
          return;
      }

      this.app.stage.addChild(this.ui);
      this.app.ticker.add(()=>{
          this.ui.update();
      });
  }
}
