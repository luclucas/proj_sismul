import BaseScene from './BaseScene';

class MenuScene extends BaseScene {

  constructor(config) {
    super('MenuScene', config);

    this.menu = [
      {scene: 'PlayScene', text: 'Jogar'},
      {scene: 'LevelScene', text: 'Escolher Level'},
      {scene: 'InfoScene', text: 'Como Jogar'},
      {scene: null, text: 'Sair'},
    ]
  }

  create() {
    super.create();

    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  setupMenuEvents(menuItem) {
    const textGO = menuItem.textGO;
    textGO.setInteractive();

    textGO.on('pointerover', () => {
      textGO.setStyle({fill: '#00FF27'});
    })

    textGO.on('pointerout', () => {
      textGO.setStyle({fill: '#0013FF'});
    })

    textGO.on('pointerup', () => {
      menuItem.scene && this.scene.start(menuItem.scene);

      if (menuItem.text === 'Sair') {
        this.game.destroy(true);
      }
    })
  }
}

export default MenuScene;

