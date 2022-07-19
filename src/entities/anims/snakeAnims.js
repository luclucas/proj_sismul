export default anims => {
    anims.create({
      key: 'snake-idle',
      frames: anims.generateFrameNumbers('snake', {start: 0, end: 8}),
      frameRate: 8,
      repeat: -1
    })

    anims.create({
      key: 'snake-hurt',
      frames: anims.generateFrameNumbers('snake', {start: 21, end: 22}),
      frameRate: 10,
      repeat: 0
    })
  }