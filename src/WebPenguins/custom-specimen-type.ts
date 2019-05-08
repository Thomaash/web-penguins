import {
  SpecimenGroup,
  SpecimenStepBuilder,
  SpecimenType
} from './types'

export class CustomSpecimenType implements SpecimenType {
  public readonly margin: SpecimenType['margin']
  public readonly nextGroup: SpecimenGroup
  public readonly src: SpecimenType['src']
  public readonly step: SpecimenType['step']
  public readonly zIndex: SpecimenType['zIndex']

  public constructor ({
    nextGroup,
    offset,
    src,
    stepBuilder,
    zIndex
  }: {
    nextGroup: SpecimenGroup
    offset: { x: number, y: number }
    src: string
    stepBuilder: SpecimenStepBuilder
    zIndex: number
  }) {
    this.margin = `-${offset.y}px 0px 0px -${offset.x}px`
    this.nextGroup = nextGroup
    this.src = src
    this.step = stepBuilder(offset)
    this.zIndex = zIndex
  }
}
