export default anims => {
    anims.create({
        key: 'idle',
        frames:  anims.generateFrameNumbers('player', {start: 0, end: 0}),
        frameRate: 5,
        repeat: -1
      })

    anims.create({
        key: 'run',
        frames:  anims.generateFrameNumbers('player', {start: 0, end: 2}),
        frameRate: 5,
        repeat: -1
      })

      anims.create({
        key: 'jump',
        frames:  anims.generateFrameNumbers('player_jump', {start: 0, end: 0}),
        frameRate: 5,
        repeat: 1
      })
      anims.create({
        key: 'throw',
        frames:  anims.generateFrameNumbers('player-throw', {start: 0, end: 2}),
        frameRate: 3,
        repeat: 0
      })
  }