import 'web-animations-js/web-animations.min.js'
import { Species } from './species'
import { Specimen } from './specimen'
import { SpecimenGroup, SpecimenType } from './types'
import { createDefaultSpecies } from './penguins'

export * from './stepBuilders'
export { CustomSpecimenType } from './custom-specimen-type'
export { Species } from './species'
export { SpecimenType } from './types'
export { createDefaultSpecies, PenguinZIndex } from './penguins'

export interface WebPenguinsOptions {
  baseZIndex?: number
  customPenguinTypes?: SpecimenType[]
  obstacles?: HTMLElement[]
  root?: HTMLElement
  species?: Species[]
}

export class WebPenguins {
  private cleanup: Function[] = []
  private penguins: Specimen[] = []

  private baseZIndex: number
  private species: Species[]
  private obstacles: HTMLElement[]
  private root: HTMLElement

  public constructor ({
    baseZIndex = 1000,
    obstacles = [],
    root = document.body,
    species = [createDefaultSpecies(20)]
  }: WebPenguinsOptions = {}) {
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
          const penguin = new Specimen(species, this.baseZIndex)
          penguin.setBoundingClientRects(bcrs)
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
          penguin.setGroup(SpecimenGroup.Clicked)
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

export default WebPenguins
