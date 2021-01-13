import { SpecimenType } from './types'

function getLSKey (...names: readonly string[]): string {
  return `--web-penguins--${names.join('--')}--`
}

type Group = Array<Readonly<SpecimenType>> & {
  random: Readonly<SpecimenType>
  getOrThrow(index: number): SpecimenType
}

function createGroup (
  localStorageName: string | null = null,
  groupName: string
): Group {
  const array: Array<Readonly<SpecimenType>> = []

  Object.defineProperty(array, 'getOrThrow', {
    value (index: number): SpecimenType {
      const v = this[index]
      if (v == null) {
        throw new Error('No specimen was found in this group.')
      }
      return v
    }
  })

  if (localStorageName != null) {
    const lsKey = getLSKey(localStorageName, groupName)
    Object.defineProperty(array, 'random', {
      get (): Readonly<SpecimenType> {
        const unusedIndexesString: string | null = localStorage.getItem(lsKey)
        const unusedIdexes: number[] =
          unusedIndexesString === '[]' || unusedIndexesString == null
            ? new Array(this.length).fill(null).map((_v, i): number => i)
            : JSON.parse(unusedIndexesString)

        const index = unusedIdexes.splice(
          Math.floor(unusedIdexes.length * Math.random()),
          1
        )[0]

        if (unusedIdexes.length > 0) {
          localStorage.setItem(lsKey, JSON.stringify(unusedIdexes))
        } else {
          localStorage.removeItem(lsKey)
        }

        // The indexes in the local storage may be stale due to code updates,
        // just burn through them.
        return index === 0 || index < this.length
          ? this.getOrThrow(index)
          : this.random
      }
    })
  } else {
    Object.defineProperty(array, 'random', {
      get (): Readonly<SpecimenType> {
        return this.getOrThrow(Math.floor(this.length * Math.random()))
      }
    })
  }

  return array as Group
}

export class Species {
  private readonly map: Map<string, Group> = new Map()

  public constructor (
    public readonly amount: number = 20,
    private readonly _localStorageName: string | null = null
  ) {}

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
      const group = createGroup(this._localStorageName, name)
      this.map.set(name, group)
      return group
    }
  }
}
