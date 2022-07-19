import Phaser from 'phaser';

class Preload extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

    preload(){
        this.load.tilemapTiledJSON('level_1', 'assets/map_level_1.json');
        this.load.tilemapTiledJSON('level_2', 'assets/map_level_2.json');

        this.load.image('tiles-1', 'assets/main_lev_build_1.png');
        this.load.image('tiles-2','assets/Terrain.png');
        this.load.image('tiles-3','assets/Decorations.png');
        this.load.image('tiles-4','assets/Medieval.png');
        this.load.image('iceball', 'assets/weapons/improved_fireball_001.png');
        this.load.image('menu-bg', 'assets/background01.png');
        this.load.image('back', 'assets/back.png');
        

        this.load.spritesheet('player','assets/player/move_sprit.png', {
          frameWidth: 30, frameHeight: 53
        });
        this.load.spritesheet('player_jump','assets/player/jump.png', {
          frameWidth: 30, frameHeight: 53
        });

        this.load.spritesheet('snake', 'assets/enemy/enemy_sheet.png', {
          frameWidth: 32, frameHeight: 64, spacing: 32
        })

        this.load.spritesheet('player-throw','assets/player/throw_attack.png', {
          frameWidth: 40, frameHeight: 53
        });
        this.load.spritesheet('hit-sheet', 'assets/weapons/hit_effect_sheet.png', {
          frameWidth: 32, frameHeight: 32
        })
        this.load.audio('theme', 'assets/music/theme_music.wav');
        this.load.audio('projectile-launch', 'assets/music/projectile_launch.wav');
        this.load.audio('jump', 'assets/music/jump.wav');
        this.load.audio('step', 'assets/music/step_mud.wav');


        this.load.once('complete', () => {
          this.startGame();
        })
    }
    

    startGame() {
      this.registry.set('level', 1);
      this.registry.set('unlocked-levels', 1);
      this.scene.start('MenuScene')
      }
    }
    
    export default Preload;





  