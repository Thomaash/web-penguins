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
  private readonly baseZIndex: number
  private readonly species: Species

  private _type!: SpecimenType // Initialized through setter

  private get type (): SpecimenType {
    return this._type
  }

  private set type (type: SpecimenType) {
    // Only reload image if requested, first or different image is used
    if (!this.element.src || type.reloadImage || this.type.src !== type.src) {
      this.element.src = type.src
    }

    this.element.style.margin = type.margin
    this.element.style.zIndex = `${this.baseZIndex + type.zIndex}`

    this._type = type
  }

  public constructor (species: Species, baseZIndex: number) {
    if (!species.getGroup(SpecimenGroup.Entering).length) {
      throw new Error(`Group “${SpecimenGroup.Entering}” is mandatory.`)
    }

    this.baseZIndex = baseZIndex
    this.species = species
    this.type = this.species.getGroup(SpecimenGroup.Entering).random

    this.element.style.position = 'absolute'
    this.element.style.cursor = 'crosshair'
    this.element.addEventListener('click', (): void => {
      if (this.species.getGroup(SpecimenGroup.Clicked).length) {
        this.setGroup(SpecimenGroup.Clicked)
      } else {
        console.warn(`Group “${SpecimenGroup.Clicked}” is empty for this species.`)
      }
    })

    this.enter()
  }

  private async run (): Promise<void> {
    while (this.element.parentNode) {
      try {
        this.step = this.type.step(this.element, this.bcrs, this.x, this.y)
        const { x, y } = await this.step.promise

        this.x = x
        this.y = y

        if (this.nextType) {
          this.type = this.nextType
          this.nextType = null
        } else {
          this.type = this.species.getGroup(this.type.nextGroup).random
        }
      } catch (error) {
        if (error.message === 'Reenter!') {
          this.enter()
        } else {
          console.error(error)
          this.enter()
        }
      } finally {
        this.step = null
      }
    }
  }

  private enter (): void {
    this.setGroup(SpecimenGroup.Entering)

    this.x = margin + Math.floor((window.innerWidth - 2 * margin) * Math.random())
    this.y = -100 - Math.random() * window.innerHeight
  }

  public setGroup (group: string): void {
    const type = this.species.getGroup(group).random
    if (this.step) {
      this.nextType = type
      this.step.stop()
    } else {
      this.type = type
      this.nextType = null
    }
  }

  public setBoundingClientRects (bcrs: RoBCRs): void {
    this.bcrs = bcrs
    try {
      this.setGroup(SpecimenGroup.FallingGliding)
    } catch (error) {
      this.enter()
    }
  }

  public attach (element: HTMLElement): void {
    element.appendChild(this.element)

    this.run().catch(console.error.bind(console))
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
