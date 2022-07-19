import BaseScene from './BaseScene';

class CreditsScene extends BaseScene {

  constructor(config) {
    super('CreditsScene', {...config, canGoBack: true});

    this.menu = [
      {scene: null, text: 'Obrigado por jogar!!!'},
      {scene: null, text: 'Criadores: Bruno Gomes, '},
      {scene: null, text: 'Fernando Miguel e'},
      {scene: null, text: 'Luciano Lucas'}
      
    ]
  }

  create() {
    super.create();
    this.createMenu(this.menu, () => {});
  }
}

export default CreditsScene;