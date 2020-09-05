import GameManager from './example/GameManager';

window.onload = () => {
  GameManager.start({
    glWidth: 1136,
    glHeight: 640,
    bgColor: 0x222222,
  });
};
