import { SpecimenGroup, SpecimenType } from './types'

type Group = Array<Readonly<SpecimenType>> & {
  random: Readonly<SpecimenType>
}

function createGroup (): Group {
  const array: Array<Readonly<SpecimenType>> = []
  Object.defineProperty(array, 'random', {
    get (): Readonly<SpecimenType> {
      return this[Math.floor(this.length * Math.random())] || ((): never => {
        throw new Error('No specimen was found.')
      })()
    }
  })
  return array as Group
}

export class Species {
  public amount: number

  public clicked: Group = createGroup()
  public dead: Group = createGroup()
  public entering: Group = createGroup()
  public fallingDying: Group = createGroup()
  public fallingGliding: Group = createGroup()
  public gliding: Group = createGroup()
  public groundDwelling: Group = createGroup()
  public hidden: Group = createGroup()

  public constructor (amount: number = 20) {
    this.amount = amount
  }

  public add (groups: SpecimenGroup[], specimenType: SpecimenType): Species {
    groups.forEach((group): void => {
      this[group].push(specimenType)
    })

    return this
  }
}
