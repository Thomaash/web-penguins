import imageAngel from '@/assets/penguins/angel.gif'
import imageBalloons from '@/assets/penguins/balloons.gif'
import imageDigger from '@/assets/penguins/digger.gif'
import imageExplosion from '@/assets/penguins/explosion.gif'
import imageFloater from '@/assets/penguins/floater.gif'
import imageMinerLeft from '@/assets/penguins/miner_left.gif'
import imageMinerRight from '@/assets/penguins/miner_right.gif'
import imageReader from '@/assets/penguins/reader.gif'
import imageSitter from '@/assets/penguins/sitter.gif'
import imageSkaterLeft from '@/assets/penguins/skater_left.gif'
import imageSkaterRight from '@/assets/penguins/skater_right.gif'
import imageSliderLeft from '@/assets/penguins/slider_left.gif'
import imageSliderRight from '@/assets/penguins/slider_right.gif'
import imageSupermanLeft from '@/assets/penguins/superman_left.gif'
import imageSupermanRight from '@/assets/penguins/superman_right.gif'
import imageTumbler from '@/assets/penguins/tumbler.gif'
import imageWaiter from '@/assets/penguins/waiter.gif'
import imageWalkerLeft from '@/assets/penguins/walker_left.gif'
import imageWalkerRight from '@/assets/penguins/walker_right.gif'
import imageXmasWalkerLeft from '@/assets/penguins/xmas_walker_left.gif'
import imageXmasWalkerRight from '@/assets/penguins/xmas_walker_right.gif'

import { CustomSpecimenType } from './custom-specimen-type'
import { SpecimenGroup } from './types'
import {
  walking,
  ghostMoving,
  falling,
  waiting,
  excavating
} from './stepBuilders'
import { Species } from './species'

export enum PenguinZIndex {
  Normal = 0,
  Explosion = 10,
  Miner = 20,
  Flier = 30
}

export function createDefaultSpecies (amount: number = 20): Species {
  const species = new Species(amount)

  const d = new Date()
  const env = {
    xmas: d.getMonth() === 11 && Math.abs(d.getDate() - 24) <= 4
  }

  species.add(
    [SpecimenGroup.Dead],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.FallingGliding,
      offset: { x: 23, y: 30 },
      src: imageAngel,
      stepBuilder: ghostMoving(-Math.PI / 2, 20, window.innerHeight + 100),
      zIndex: PenguinZIndex.Flier
    })
  ).add(
    [SpecimenGroup.Gliding, SpecimenGroup.Entering],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 63 },
      src: imageBalloons,
      stepBuilder: falling(30, 'linear'),
      zIndex: PenguinZIndex.Flier
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.FallingGliding,
      offset: { x: 16, y: 32 },
      src: imageDigger,
      stepBuilder: excavating(Math.PI / 2),
      zIndex: PenguinZIndex.Miner
    })
  ).add(
    [SpecimenGroup.Clicked],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.Dead,
      offset: { x: 16, y: 32 },
      src: imageExplosion,
      stepBuilder: waiting(1000, 500),
      zIndex: PenguinZIndex.Explosion
    })
  ).add(
    [SpecimenGroup.Gliding, SpecimenGroup.Entering],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 32 },
      src: imageFloater,
      stepBuilder: falling(20, 'linear'),
      zIndex: PenguinZIndex.Flier
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.FallingGliding,
      offset: { x: 16, y: 32 },
      src: imageMinerLeft,
      stepBuilder: excavating(Math.PI * (0.5 + 0.25), 2),
      zIndex: PenguinZIndex.Miner
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.FallingGliding,
      offset: { x: 16, y: 32 },
      src: imageMinerRight,
      stepBuilder: excavating(Math.PI * (0.5 - 0.25), 2),
      zIndex: PenguinZIndex.Miner
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 32 },
      src: imageReader,
      stepBuilder: waiting(10000, 20000),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 32 },
      src: imageSitter,
      stepBuilder: waiting(5000, 5000),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 15, y: 30 },
      src: imageSkaterLeft,
      stepBuilder: walking(-60, 'ease-in-out'),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 15, y: 30 },
      src: imageSkaterRight,
      stepBuilder: walking(60, 'ease-in-out'),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 15 },
      src: imageSliderLeft,
      stepBuilder: walking(-100, 'ease-out'),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 15 },
      src: imageSliderRight,
      stepBuilder: walking(100, 'ease-out'),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.FallingGliding,
      offset: { x: 15, y: 30 },
      src: imageSupermanLeft,
      stepBuilder: ghostMoving(
        -Math.PI * 0.7,
        400,
        Math.hypot(window.innerWidth, window.innerHeight) + 100,
        'ease-in'
      ),
      zIndex: PenguinZIndex.Flier
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.FallingGliding,
      offset: { x: 15, y: 30 },
      src: imageSupermanRight,
      stepBuilder: ghostMoving(
        -Math.PI * 0.3,
        400,
        Math.hypot(window.innerWidth, window.innerHeight) + 100,
        'ease-in'
      ),
      zIndex: PenguinZIndex.Flier
    })
  ).add(
    [SpecimenGroup.FallingDying],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.Dead,
      offset: { x: 16, y: 32 },
      src: imageTumbler,
      stepBuilder: falling(200, 'ease-in'),
      zIndex: PenguinZIndex.Flier
    })
  ).add(
    [SpecimenGroup.FallingGliding],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.Gliding,
      offset: { x: 16, y: 32 },
      src: imageTumbler,
      stepBuilder: falling(200, 'ease-in', 80),
      zIndex: PenguinZIndex.Flier
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 32 },
      src: imageWaiter,
      stepBuilder: waiting(5000, 5000),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 32 },
      src: imageWalkerLeft,
      stepBuilder: walking(-20),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 32 },
      src: imageWalkerRight,
      stepBuilder: walking(20),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [env.xmas ? SpecimenGroup.GroundDwelling : SpecimenGroup.Hidden],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 44 },
      src: imageXmasWalkerLeft,
      stepBuilder: walking(-20),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [env.xmas ? SpecimenGroup.GroundDwelling : SpecimenGroup.Hidden],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 44 },
      src: imageXmasWalkerRight,
      stepBuilder: walking(20),
      zIndex: PenguinZIndex.Normal
    })
  )

  return species
}
