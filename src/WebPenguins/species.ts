import { SpecimenType } from './types'

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
  private map: Map<string, Group> = new Map()

  public constructor (amount: number = 20) {
    this.amount = amount
  }

  public add (groups: string[], specimenType: SpecimenType): Species {
    groups.forEach((group): void => {
      this.getGroup(group).push(specimenType)
    })

    return this
  }

  public getGroup (name: string): Group {
    const group = this.map.get(name)
    if (group) {
      return group
    } else {
      const group = createGroup()
      this.map.set(name, group)
      return group
    }
  }
}
