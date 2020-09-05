import GameManager from './example/GameManager';
import FirstScene from './example/FirstScene';

window.onload = () => {
  GameManager.start({
    glWidth: 1136,
    glHeight: 640,
    bgColor: 0x222222,
  });

  GameManager.loadScene(new FirstScene());
};
