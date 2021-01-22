import 'web-animations-js/web-animations.min.js'
import { Species } from './species'
import { Specimen } from './specimen'
import { SpecimenGroup, SpecimenType } from './types'

export * from './step-builders'
export { CustomSpecimenType } from './custom-specimen-type'
export { CreateRandomGetter, Species, SpeciesOptions } from './species'
export { SpecimenType } // from './types'
export { createDefaultSpecies, PenguinZIndex } from './penguins'

export interface WebPenguinsOptions {
  baseZIndex?: number
  customPenguinTypes?: SpecimenType[]
  obstacles?: HTMLElement[]
  root?: HTMLElement
  species: Species[]
}

export class WebPenguins {
  private readonly cleanup: Function[] = []
  private penguins: Specimen[] = []

  private readonly baseZIndex: number
  private readonly species: Species[]
  private readonly obstacles: HTMLElement[]
  private readonly root: HTMLElement

  public constructor ({
    baseZIndex = 1000,
    obstacles = [],
    root = document.body,
    species
  }: WebPenguinsOptions) {
    this.baseZIndex = baseZIndex
    this.obstacles = obstacles
    this.root = root
    this.species = species
  }

  public start (): void {
    const bcrs = this.getBCRs()
    this.penguins = this.species.map((species): Specimen[] => {
      return new Array(species.amount).fill(null).map((): Specimen | null => {
        try {
          const penguin = new Specimen(species, this.baseZIndex, bcrs)
          penguin.attach(this.root)
          return penguin
        } catch (error) {
          console.error(error)
          return null
        }
      }).filter((value): value is Specimen => value != null)
    }).flat(1)
    this.cleanup.push((): void => {
      this.penguins.splice(0).forEach((penguin): void => {
        penguin.detach()
      })
    })

    const keypressListener = this.keypressListener.bind(this)
    document.addEventListener('keypress', keypressListener)
    this.cleanup.push((): void => {
      document.removeEventListener('keypress', keypressListener)
    })

    const resizeListener = this.resizeListener.bind(this)
    window.addEventListener('resize', resizeListener)
    this.cleanup.push((): void => {
      window.removeEventListener('resize', resizeListener)
    })
  }

  public stop (): void {
    this.cleanup
      .splice(0)
      .reverse()
      .forEach((f): void => { f() })
  }

  private getBCRs (): ClientRect[] {
    return this.obstacles.map((element): ClientRect => element.getBoundingClientRect())
  }

  private keypressListener (e: KeyboardEvent): void {
    switch (e.which) {
      // Genocide
      case 48: // Num0
      case 127: // Delete
        this.penguins.forEach((penguin): void => {
          // Not every specimen must be clickable.
          try {
            penguin.setGroup(SpecimenGroup.Clicked)
          } catch (error) {
            console.error(error)
          }
        })
        break
    }
  }

  private resizeListener (): void {
    const bcrs = this.getBCRs()
    this.penguins.forEach((penguin): void => {
      penguin.setBoundingClientRects(bcrs)
    })
  }
}
