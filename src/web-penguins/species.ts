import { SpecimenType } from './types'

function getLSKey (...names: readonly string[]): string {
  return `--web-penguins--${names.join('--')}--`
}

export type Group = Array<Readonly<SpecimenType>> & {
  random: Readonly<SpecimenType>
  getOrThrow(index: number): SpecimenType
};

function createGroup (
  createRandomGetter: CreateRandomGetter,
  groupName: string,
  localStorageName: string | null = null
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

  Object.defineProperty(array, 'random', {
    get: createRandomGetter({
      groupName,
      localStorageName
    })
  })

  return array as Group
}

const createStockRandomGetter: CreateRandomGetter = function ({
  groupName,
  localStorageName
}: {
  groupName: string
  localStorageName: string | null
}): (this: Group) => Readonly<SpecimenType> {
  if (localStorageName != null) {
    const lsKey = getLSKey(localStorageName, groupName)
    return function (): Readonly<SpecimenType> {
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
  } else {
    return function (): Readonly<SpecimenType> {
      return this.getOrThrow(Math.floor(this.length * Math.random()))
    }
  }
}

export type CreateRandomGetter = (options: {
  groupName: string
  localStorageName: string | null
}) => (this: Group) => Readonly<SpecimenType>;

export interface SpeciesOptions {
  createRandomGetter?: CreateRandomGetter | null
  localStorageName?: string | null
}

export class Species {
  private readonly map: Map<string, Group> = new Map();
  private readonly createRandomGetter: CreateRandomGetter;
  private readonly localStorageName: string | null;

  public constructor (
    public readonly amount: number = 20,
    options: SpeciesOptions = {}
  ) {
    this.createRandomGetter =
      options.createRandomGetter || createStockRandomGetter
    this.localStorageName = options.localStorageName || null
  }

  public add (groups: string[], specimenType: SpecimenType): Species {
    groups.forEach((group): void => {
      this.getGroup(group).push(specimenType)
    })

    return this
  }

  public getGroup (groupName: string): Group {
    const group = this.map.get(groupName)
    if (group) {
      return group
    } else {
      const group = createGroup(
        this.createRandomGetter,
        groupName,
        this.localStorageName
      )
      this.map.set(groupName, group)
      return group
    }
  }
}
