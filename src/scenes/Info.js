import BaseScene from './BaseScene';

class InfoScene extends BaseScene {

  constructor(config) {
    super('InfoScene', {...config, canGoBack: true});

    this.menu = [
      {scene: null, text: 'Aperte "Q" para atirar e'},
      {scene: null, text: 'use as setinhas para se '},
      {scene: null, text: 'movimentar até a margem'},
      {scene: null, text: 'direita de cada fase.'}
      
      
    ]
  }

  create() {
    super.create();
    this.createMenu(this.menu, () => {});
  }
}

export default InfoScene;