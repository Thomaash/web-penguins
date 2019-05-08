import { SpecimenGroup, PenguinStep, SpecimenType, RoBCRs } from './types'
import { Species } from './species'

const margin = 16

export class Specimen {
  private element: HTMLImageElement = document.createElement('img')
  private x: number = -100
  private y: number = -100
  private bcrs: RoBCRs = []
  private step: PenguinStep | null = null
  private nextType: SpecimenType | null = null
  private baseZIndex: number
  private species: Species

  private _type!: SpecimenType
  private get type (): SpecimenType {
    return this._type
  }
  private set type (type: SpecimenType) {
    this._type = type
    this.element.src = type.src
    this.element.style.margin = type.margin
    this.element.style.zIndex = `${this.baseZIndex + type.zIndex}`
  }

  private get isOffScreen (): boolean {
    return this.x < 0 ||
      this.x > window.innerWidth ||
      this.y < 0 ||
      this.y > window.innerHeight
  }

  public constructor (species: Species, baseZIndex: number) {
    this.baseZIndex = baseZIndex
    this.species = species
    this.type = this.species.entering.random

    this.element.style.position = 'absolute'
    this.element.style.cursor = 'crosshair'
    this.element.addEventListener('click', (): void => {
      this.setGroup(SpecimenGroup.Clicked)
    })

    this.placeRandomly()
  }

  private async run (): Promise<void> {
    this.step = this.type.step(this.element, this.bcrs, this.x, this.y)
    try {
      const { x, y } = await this.step.promise
      this.step = null

      this.x = x
      this.y = y

      if (this.isOffScreen) {
        this.placeRandomly()
      } else {
        if (this.nextType) {
          this.type = this.nextType
          this.nextType = null
        } else {
          this.type = this.species[this.type.nextGroup].random
        }
      }
    } catch (error) {
      this.placeRandomly()
      console.error(error)
    }

    if (this.element.parentNode) {
      this.run()
    }
  }

  private placeRandomly (): void {
    this.type = this.species.entering.random
    this.nextType = null

    this.x = margin + Math.floor((window.innerWidth - 2 * margin) * Math.random())
    this.y = -100 - Math.random() * window.innerHeight
  }

  public setGroup (group: SpecimenGroup): void {
    if (this.step) {
      this.nextType = this.species[group].random
      this.step.stop()
    }
  }

  public setBoundingClientRects (bcrs: RoBCRs): void {
    this.bcrs = bcrs
    this.setGroup(SpecimenGroup.FallingGliding)
  }

  public attach (element: HTMLElement): void {
    element.appendChild(this.element)

    this.run()
  }

  public detach (): void {
    const parent = this.element.parentElement
    if (parent) {
      parent.removeChild(this.element)
    } else {
      throw new TypeError('This penguin’s element has no parent.')
    }
  }
}
