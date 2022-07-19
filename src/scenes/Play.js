import Phaser from 'phaser';
import Player from '../entities/Player';
//import Snake from '../entities/Snake';
import Enemies from '../groups/Enemies';

import initAnims from '../anims';
import EventEmitter from '../events/Emitter';



class Play extends Phaser.Scene {
  constructor(config) {
    super('PlayScene');
    this.config = config;
  }

  preload() {
    
  }
    

  create({gameStatus}) {
       
    this.playBgMusic();

       const map = this.createMap();
       const layers = this.createLayers(map);
       
       const playerZones = this.getPlayerZones(layers.playerZones);
       const player = this.createPlayer(playerZones.start);
       
       const enemies = this.createEnemies(layers.enemySpawns, layers.platformsColliders);

       this.createEnemyColliders(enemies, {
        colliders: {
          platformsColliders: layers.platformsColliders,
        player
        }
      });


       
       this.createPlayerColliders(player, {
        colliders: {
          platformsColliders: layers.platformsColliders
        }
      });

      this.createBackButton();
      //this.createGameEvents();
      this.createEndOfLevel(playerZones.end, player);
      this.setupFollowupCameraOn(player);
      if (gameStatus === 'PLAYER_LOOSE') { return; }

      this.createGameEvents();
    
      initAnims(this.anims);
  }

  finishDrawing(pointer, layer) {
    this.line.x2 = pointer.worldX;
    this.line.y2 = pointer.worldY;

    this.graphics.clear();
    this.graphics.strokeLineShape(this.line);

    this.tileHits = layer.getTilesWithinShape(this.line);

    if (this.tileHits.length > 0) {
      this.tileHits.forEach(tile => {
        tile.index !== -1 && tile.setCollision(true)
      })
    }
    this.drawDebug(layer);

    this.plotting = false;
    }

    playBgMusic() {
      if (this.sound.get('theme')) { return; }
  
      this.sound.add('theme', {loop: true, volume: 0.09}).play();
    }

    createMap(){
      const map = this.make.tilemap({key: `level_${this.getCurrentLevel()}`});
       map.addTilesetImage('main_lev_build_1', 'tiles-1');
       map.addTilesetImage('Terrain', 'tiles-2');
       map.addTilesetImage('Decorations', 'tiles-3');
       map.addTilesetImage('Medieval', 'tiles-4');
       return map;
    }

    createLayers(map){
      const tileset1 = map.getTileset('main_lev_build_1');
      const tileset2 = map.getTileset('Terrain');
      const tileset3 = map.getTileset('Decorations');
      const tileset4 = map.getTileset('Terrain');
      const tileset5 = map.getTileset('Medieval');
      const background = map.createStaticLayer('background',tileset4);
      const platformsColliders = map.createStaticLayer('platforms_colliders', tileset1).setAlpha(0);
      const environment = map.createStaticLayer('enviroments', [tileset1, tileset3,tileset5]);
      const platforms = map.createStaticLayer('plataforms',[tileset2,tileset3]);
      const playerZones = map.getObjectLayer('player_zones');
      const enemySpawns = map.getObjectLayer('enemy_spawns');
      
      

      platformsColliders.setCollisionByProperty({collides: true});




      return{ environment, platforms, platformsColliders, background, playerZones, enemySpawns  };
    }
    createBackButton() {
      const btn = this.add.image(this.config.rightBottomCorner.x, this.config.rightBottomCorner.y, 'back')
        .setOrigin(1)
        .setScrollFactor(0)
        .setScale(2)
        .setInteractive()
  
      btn.on('pointerup', () => {
        this.scene.start('MenuScene');
      })
  
    }

    createGameEvents() {
      EventEmitter.on('PLAYER_LOOSE', () => {
        console.log('Helko!');
        this.scene.restart({gameStatus: 'PLAYER_LOOSE'});
      })
    }
    createPlayer(start) {
      return new Player(this, start.x, start.y); 
    }

    createEnemies(spawnLayer, platformsColliders) {
      const enemies = new Enemies(this);
      const enemyTypes = enemies.getTypes();

      spawnLayer.objects.forEach((spawnPoint, i) => {
        //if (i === 1) { return; }
        const enemy = new enemyTypes[spawnPoint.type](this, spawnPoint.x, spawnPoint.y);
        enemy.setPlatformColliders(platformsColliders)
        enemies.add(enemy);
      })
      return enemies;
    }

    onPlayerCollision(enemy, player) {
      player.takesHit(enemy);
    }

    onWeaponHit(entity, source) {
      entity.takesHit(source);
    }

    createEnemyColliders(enemies, { colliders }) {
      enemies
        .addCollider(colliders.platformsColliders)
        .addCollider(colliders.player, this.onPlayerCollision)
      .addCollider(colliders.player.projectiles, this.onWeaponHit)
     
    }
    

    createPlayerColliders(player, { colliders }) {
      player
        .addCollider(colliders.platformsColliders)
    }
    
    setupFollowupCameraOn(player) {
      const { height, width, mapOffset, zoomFactor } = this.config;
      this.physics.world.setBounds(0, 0, width + mapOffset, height + 200);
      this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor);
      this.cameras.main.startFollow(player);
    }


    getPlayerZones(playerZonesLayer) {
      const playerZones = playerZonesLayer.objects;
      return {
        start: playerZones.find(zone => zone.name === 'startZone'),
        end: playerZones.find(zone => zone.name === 'endZone')
      }
    }

    getCurrentLevel() {
      return this.registry.get('level') || 1;
    }

    createEndOfLevel(end, player) {
      const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end')
        .setAlpha(0)
        .setSize(5, 200)
        .setOrigin(0.5, 1)
        .setSize(5, this.config.height)
        .setOrigin(0.5, 1);

    const eolOverlap = this.physics.add.overlap(player, endOfLevel, () => {
      eolOverlap.active = false;

      if (this.registry.get('level') === this.config.lastLevel) {
        this.scene.start('CreditsScene');
        return;
      }

      this.registry.inc('level', 1);
      this.registry.inc('unlocked-levels', 1);

      this.scene.restart({gameStatus: 'LEVEL_COMPLETED'})
    })
    }

    
}


export default Play;