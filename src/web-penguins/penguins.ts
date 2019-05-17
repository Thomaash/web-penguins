import { CustomSpecimenType } from './custom-specimen-type'
import { SpecimenGroup } from './types'
import {
  walking,
  ghostMoving,
  falling,
  waiting,
  excavating
} from './step-builders'
import { Species } from './species'

const imageAngel = 'gpl3/angel.gif'
const imageBalloons = 'gpl3/balloons.gif'
const imageDigger = 'gpl3/digger.gif'
const imageExplosion = 'gpl3/explosion.gif'
const imageFloater = 'gpl3/floater.gif'
const imageMinerLeft = 'gpl3/miner_left.gif'
const imageMinerRight = 'gpl3/miner_right.gif'
const imageReader = 'gpl2/reader.gif'
const imageSitter = 'gpl2/sitter.gif'
const imageSkaterLeft = 'gpl3/skater_left.gif'
const imageSkaterRight = 'gpl3/skater_right.gif'
const imageSliderLeft = 'gpl3/slider_left.gif'
const imageSliderRight = 'gpl3/slider_right.gif'
const imageSupermanLeft = 'gpl3/superman_left.gif'
const imageSupermanRight = 'gpl3/superman_right.gif'
const imageTumbler = 'gpl3/tumbler.gif'
const imageWaiter = 'gpl3/waiter.gif'
const imageWalkerLeft = 'gpl3/walker_left.gif'
const imageWalkerRight = 'gpl3/walker_right.gif'
const imageXmasWalkerLeft = 'gpl3/xmas_walker_left.gif'
const imageXmasWalkerRight = 'gpl3/xmas_walker_right.gif'

export enum PenguinZIndex {
  Normal = 0,
  Explosion = 10,
  Miner = 20,
  Flier = 30
}

export function createDefaultSpecies (assetsPath: string, amount: number = 20): Species {
  assetsPath = assetsPath.replace(/\/$/, '')
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
      src: `${assetsPath}/${imageAngel}`,
      stepBuilder: ghostMoving(-Math.PI / 2, 20, window.innerHeight + 100),
      zIndex: PenguinZIndex.Flier
    })
  ).add(
    [SpecimenGroup.Gliding, SpecimenGroup.Entering],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 63 },
      src: `${assetsPath}/${imageBalloons}`,
      stepBuilder: falling(30, 'linear'),
      zIndex: PenguinZIndex.Flier
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.FallingGliding,
      offset: { x: 16, y: 32 },
      src: `${assetsPath}/${imageDigger}`,
      stepBuilder: excavating(Math.PI / 2),
      zIndex: PenguinZIndex.Miner
    })
  ).add(
    [SpecimenGroup.Clicked],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.Dead,
      offset: { x: 16, y: 32 },
      src: `${assetsPath}/${imageExplosion}`,
      stepBuilder: waiting(1000, 500),
      zIndex: PenguinZIndex.Explosion
    })
  ).add(
    [SpecimenGroup.Gliding, SpecimenGroup.Entering],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 32 },
      src: `${assetsPath}/${imageFloater}`,
      stepBuilder: falling(20, 'linear'),
      zIndex: PenguinZIndex.Flier
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.FallingGliding,
      offset: { x: 16, y: 32 },
      src: `${assetsPath}/${imageMinerLeft}`,
      stepBuilder: excavating(Math.PI * (0.5 + 0.25), 2),
      zIndex: PenguinZIndex.Miner
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.FallingGliding,
      offset: { x: 16, y: 32 },
      src: `${assetsPath}/${imageMinerRight}`,
      stepBuilder: excavating(Math.PI * (0.5 - 0.25), 2),
      zIndex: PenguinZIndex.Miner
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 32 },
      src: `${assetsPath}/${imageReader}`,
      stepBuilder: waiting(10000, 20000),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 32 },
      src: `${assetsPath}/${imageSitter}`,
      stepBuilder: waiting(5000, 5000),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 15, y: 30 },
      src: `${assetsPath}/${imageSkaterLeft}`,
      stepBuilder: walking(-60, 'ease-in-out'),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 15, y: 30 },
      src: `${assetsPath}/${imageSkaterRight}`,
      stepBuilder: walking(60, 'ease-in-out'),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 15 },
      src: `${assetsPath}/${imageSliderLeft}`,
      stepBuilder: walking(-100, 'ease-out'),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 15 },
      src: `${assetsPath}/${imageSliderRight}`,
      stepBuilder: walking(100, 'ease-out'),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.FallingGliding,
      offset: { x: 15, y: 30 },
      src: `${assetsPath}/${imageSupermanLeft}`,
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
      src: `${assetsPath}/${imageSupermanRight}`,
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
      src: `${assetsPath}/${imageTumbler}`,
      stepBuilder: falling(200, 'ease-in'),
      zIndex: PenguinZIndex.Flier
    })
  ).add(
    [SpecimenGroup.FallingGliding],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.Gliding,
      offset: { x: 16, y: 32 },
      src: `${assetsPath}/${imageTumbler}`,
      stepBuilder: falling(200, 'ease-in', 80),
      zIndex: PenguinZIndex.Flier
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 32 },
      src: `${assetsPath}/${imageWaiter}`,
      stepBuilder: waiting(5000, 5000),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 32 },
      src: `${assetsPath}/${imageWalkerLeft}`,
      stepBuilder: walking(-20),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 32 },
      src: `${assetsPath}/${imageWalkerRight}`,
      stepBuilder: walking(20),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [env.xmas ? SpecimenGroup.GroundDwelling : SpecimenGroup.Hidden],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 44 },
      src: `${assetsPath}/${imageXmasWalkerLeft}`,
      stepBuilder: walking(-20),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [env.xmas ? SpecimenGroup.GroundDwelling : SpecimenGroup.Hidden],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 44 },
      src: `${assetsPath}/${imageXmasWalkerRight}`,
      stepBuilder: walking(20),
      zIndex: PenguinZIndex.Normal
    })
  )

  return species
}
