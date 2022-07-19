import Enemy from './enemy';
import initAnims from './anims/snakeAnims';
class Snake extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'snake');
    initAnims(scene.anims);
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.active) { return; }
    if (this.isPlayingAnims('snake-hurt')) { return; }


    this.play('snake-idle', true);
  }

  takesHit(source) {
    super.takesHit(source);
    this.play('snake-hurt', true);
  }
}


export default Snake;