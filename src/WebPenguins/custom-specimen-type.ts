import {
  SpecimenStepBuilder,
  SpecimenType
} from './types'

export class CustomSpecimenType implements SpecimenType {
  public readonly margin: SpecimenType['margin']
  public readonly nextGroup: SpecimenType['nextGroup']
  public readonly reloadImage: SpecimenType['reloadImage']
  public readonly src: SpecimenType['src']
  public readonly step: SpecimenType['step']
  public readonly zIndex: SpecimenType['zIndex']

  public constructor ({
    nextGroup,
    offset,
    reloadImage = false,
    src,
    stepBuilder,
    zIndex
  }: {
    nextGroup: SpecimenType['nextGroup']
    offset: { x: number, y: number }
    reloadImage?: boolean
    src: string
    stepBuilder: SpecimenStepBuilder
    zIndex: number
  }) {
    this.margin = `-${offset.y}px 0px 0px -${offset.x}px`
    this.nextGroup = nextGroup
    this.reloadImage = reloadImage
    this.src = src
    this.step = stepBuilder(offset)
    this.zIndex = zIndex
  }
}
