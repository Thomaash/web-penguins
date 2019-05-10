import { checkIntersection } from 'line-intersect'
import { PenguinStep, SpecimenStepBuilder, SpecimenType } from './types'

function findBCR (
  bcrs: Readonly<ClientRect[]>,
  rate: (bcr: Readonly<ClientRect>) => number,
  errorMessage: string = 'Reenter!'
): Readonly<ClientRect> {
  const bestBCRs: Array<Readonly<ClientRect>> = []
  const bestRating = bcrs.reduce((bestRating, bcr): number => {
    const rating = rate(bcr)
    if (rating < bestRating) {
      bestBCRs.length = 0
      bestBCRs.push(bcr)
      return rating
    } else if (rating === bestRating) {
      bestBCRs.push(bcr)
      return bestRating
    } else {
      return bestRating
    }
  }, Number.POSITIVE_INFINITY)

  if (bestBCRs.length === 0 || bestRating === Number.POSITIVE_INFINITY) {
    throw new Error(errorMessage)
  }

  return bestBCRs[Math.floor(Math.random() * bestBCRs.length)]
}

interface Point { x: number, y: number }
type PointWithDistance = Point & { distance: number }
interface Line { start: Point, end: Point }
function lineLineIntersection (
  a: Line,
  b: Line
): PointWithDistance | undefined {
  const { point } = checkIntersection(
    a.start.x,
    a.start.y,
    a.end.x,
    a.end.y,
    b.start.x,
    b.start.y,
    b.end.x,
    b.end.y
  )

  return point
    ? {
      ...point,
      distance: Math.hypot(point.x - a.start.x, point.y - a.start.y)
    }
    : undefined
}

function getBCRIntersection (
  lineStart: Point,
  lineAngle: number,
  bcr: ClientRect
): PointWithDistance {
  const distance = bcr.width + bcr.height
  const line = {
    start: lineStart,
    end: {
      x: lineStart.x + distance * Math.cos(lineAngle),
      y: lineStart.y + distance * Math.sin(lineAngle)
    }
  }

  return lineLineIntersection(line, {
    start: {
      x: bcr.right,
      y: bcr.top
    },
    end: {
      x: bcr.right,
      y: bcr.bottom
    }
  }) || lineLineIntersection(line, {
    start: {
      x: bcr.left,
      y: bcr.bottom
    },
    end: {
      x: bcr.right,
      y: bcr.bottom
    }
  }) || lineLineIntersection(line, {
    start: {
      x: bcr.left,
      y: bcr.top
    },
    end: {
      x: bcr.left,
      y: bcr.bottom
    }
  }) || ((): never => {
    throw new Error('An excavating intersection should always be found.')
  })()
}

function initialStop (): never {
  throw new Error('Stop was called before being initialized.')
}

export function excavating (
  direction: number = Math.PI / 2,
  speed: number = 5
): SpecimenStepBuilder {
  return (offset): SpecimenType['step'] => {
    return (element, bcrs, x, y): PenguinStep => {
      const bcr = findBCR(
        bcrs,
        (bcr): number => {
          if (bcr.top !== y || bcr.left > x || bcr.right < x) {
            return Number.POSITIVE_INFINITY
          } else {
            return 0
          }
        },
        'No BCR was found, this should never happen.'
      )

      const intersection = getBCRIntersection({ x, y }, direction, bcr)
      if ( // Excavating off the screen
        intersection.y >= window.innerHeight ||
          intersection.y <= 0
      ) {
        intersection.distance += 142
        intersection.x = x + intersection.distance * Math.cos(direction)
        intersection.y = y + intersection.distance * Math.sin(direction)
      } else if ( // Excavating off the side of an element
        intersection.x === bcr.left ||
          intersection.x === bcr.right
      ) {
        intersection.distance += Math.min(
          ( // Excavating off the screen
            intersection.x <= 0 ||
              intersection.x >= window.innerWidth
              ? 142
              : 10
          ),
          bcr.bottom - intersection.y
        )
        intersection.x = x + intersection.distance * Math.cos(direction)
        intersection.y = y + intersection.distance * Math.sin(direction)
      }
      const { x: newX, y: newY, distance } = intersection

      const animation = element.animate(
        [{
          transform: `translate(${x}px, ${y}px)`
        }, {
          transform: `translate(${newX}px, ${newY}px)`
        }],
        {
          duration: (Math.abs(distance) * 1000) / Math.abs(speed),
          easing: 'linear'
        }
      )

      let stop: PenguinStep['stop'] = initialStop

      const stopPromise: PenguinStep['promise'] = new Promise((resolve): void => {
        stop = (): void => {
          const bcr = element.getBoundingClientRect()
          const currX = bcr.left + offset.x
          const currY = bcr.top + offset.y

          resolve({ x: currX, y: currY })

          animation.cancel()
        }
      })
      const promise: PenguinStep['promise'] = new Promise((resolve): void => {
        animation.addEventListener(
          'finish',
          resolve.bind(null, { x: newX, y: newY })
        )
      })

      return {
        stop,
        promise: Promise.race([
          promise,
          stopPromise
        ])
      }
    }
  }
}

export function ghostMoving (
  direction: number = -Math.PI / 2,
  speed: number = 20,
  distance: number = 100,
  easing: KeyframeAnimationOptions['easing'] = 'linear'
): SpecimenStepBuilder {
  return (offset): SpecimenType['step'] => {
    return (element, _bcrs, x, y): PenguinStep => {
      const newX = x + distance * Math.cos(direction)
      const newY = y + distance * Math.sin(direction)

      const animation = element.animate(
        [{
          transform: `translate(${x}px, ${y}px)`
        }, {
          transform: `translate(${newX}px, ${newY}px)`
        }],
        {
          duration: (Math.abs(distance) * 1000) / Math.abs(speed),
          easing
        }
      )

      let stop: PenguinStep['stop'] = initialStop

      const stopPromise: PenguinStep['promise'] = new Promise((resolve): void => {
        stop = (): void => {
          const bcr = element.getBoundingClientRect()
          const currX = bcr.left + offset.x
          const currY = bcr.top + offset.y

          resolve({ x: currX, y: currY })

          animation.cancel()
        }
      })
      const promise: PenguinStep['promise'] = new Promise((resolve): void => {
        animation.addEventListener(
          'finish',
          resolve.bind(null, { x: newX, y: newY })
        )
      })

      return {
        stop,
        promise: Promise.race([
          promise,
          stopPromise
        ])
      }
    }
  }
}

export function falling (
  speed: number = 50,
  easing: KeyframeAnimationOptions['easing'] = 'ease-in',
  maxDistance: number = Number.POSITIVE_INFINITY
): SpecimenStepBuilder {
  return (offset): SpecimenType['step'] => {
    return (element, bcrs, x, y): PenguinStep => {
      const bcr = findBCR(
        bcrs,
        (bcr): number => {
          if (bcr.top < y || bcr.left > x || bcr.right < x) {
            // unreachable
            return Number.POSITIVE_INFINITY
          } else {
            // less is better
            return bcr.top
          }
        }
      )

      const newY = Math.min(bcr.top, y + maxDistance)
      const newX = x
      const distance = newY - y

      const speedFactor = 1 + (Math.random() - 0.5) * 0.07

      const animation = element.animate(
        [{
          transform: `translate(${x}px, ${y}px)`
        }, {
          transform: `translate(${newX}px, ${newY}px)`
        }],
        {
          duration: (Math.abs(distance) * 1000) / Math.abs(speed * speedFactor),
          easing
        }
      )

      let stop: PenguinStep['stop'] = initialStop

      const stopPromise: PenguinStep['promise'] = new Promise((resolve): void => {
        stop = (): void => {
          const bcr = element.getBoundingClientRect()
          const currX = newX
          const currY = bcr.top + offset.y

          resolve({ x: currX, y: currY })

          animation.cancel()
        }
      })
      const promise: PenguinStep['promise'] = new Promise((resolve): void => {
        animation.addEventListener(
          'finish',
          resolve.bind(null, { x: newX, y: newY })
        )
      })

      return {
        stop,
        promise: Promise.race([
          promise,
          stopPromise
        ])
      }
    }
  }
}

export function walking (
  speed: number = 20,
  easing: KeyframeAnimationOptions['easing'] = 'linear',
  edgeDistance: number = 10
): SpecimenStepBuilder {
  return (offset): SpecimenType['step'] => {
    return (element, bcrs, x, y): PenguinStep => {
      const bcr = findBCR(
        bcrs,
        (bcr): number => {
          if (bcr.top !== y || bcr.left > x || bcr.right < x) {
            return Number.POSITIVE_INFINITY
          } else {
            return 0
          }
        },
        'No BCR was found, this should never happen.'
      )

      const distance = (
        0.1 + (0.9 * Math.random())
      ) * (
        speed < 0
          ? bcr.left - x + edgeDistance
          : bcr.right - x - edgeDistance
      )

      const newY = bcr.top
      const newX = x + distance

      const animation = element.animate(
        [{
          transform: `translate(${x}px, ${y}px)`
        }, {
          transform: `translate(${newX}px, ${newY}px)`
        }],
        {
          duration: (Math.abs(distance) * 1000) / Math.abs(speed),
          easing
        }
      )

      let stop: PenguinStep['stop'] = initialStop

      const stopPromise: PenguinStep['promise'] = new Promise((resolve): void => {
        stop = (): void => {
          const bcr = element.getBoundingClientRect()
          const currX = bcr.left + offset.x
          const currY = newY

          resolve({ x: currX, y: currY })

          animation.cancel()
        }
      })
      const promise: PenguinStep['promise'] = new Promise((resolve): void => {
        animation.addEventListener(
          'finish',
          resolve.bind(null, { x: newX, y: newY })
        )
      })

      return {
        stop,
        promise: Promise.race([
          promise,
          stopPromise
        ])
      }
    }
  }
}

export function edgeToEdgeWalking (
  speed: number = 20,
  easing: KeyframeAnimationOptions['easing'] = 'linear',
  edgeDistance: number = 10,
  ground: boolean = false,
  elements: boolean = true
): SpecimenStepBuilder {
  return (offset): SpecimenType['step'] => {
    return (element, bcrs): PenguinStep => {
      const bcr = findBCR(
        [
          ...(elements ? bcrs : []),
          ...(ground ? [{
            left: 0,
            right: window.innerWidth,
            top: window.innerHeight,
            bottom: window.innerHeight,
            width: window.innerWidth,
            height: 0
          }] : [])
        ],
        (bcr): number => {
          return bcr.left <= 0 && bcr.right >= window.innerWidth
            ? 0
            : Number.POSITIVE_INFINITY
        }
      )

      const y = bcr.top
      const oldX = speed < 0 ? bcr.left - edgeDistance : bcr.right + edgeDistance
      const newX = speed < 0 ? bcr.right + edgeDistance : bcr.left - edgeDistance
      const distance = Math.abs(newX - oldX)

      const animation = element.animate(
        [{
          transform: `translate(${oldX}px, ${y}px)`
        }, {
          transform: `translate(${newX}px, ${y}px)`
        }],
        {
          duration: (Math.abs(distance) * 1000) / Math.abs(speed),
          easing
        }
      )

      let stop: PenguinStep['stop'] = initialStop

      const stopPromise: PenguinStep['promise'] = new Promise((resolve): void => {
        stop = (): void => {
          const bcr = element.getBoundingClientRect()
          const currX = bcr.left + offset.x
          const currY = y

          resolve({ x: currX, y: currY })

          animation.cancel()
        }
      })
      const promise: PenguinStep['promise'] = new Promise((resolve): void => {
        animation.addEventListener(
          'finish',
          resolve.bind(null, { x: newX, y })
        )
      })

      return {
        stop,
        promise: Promise.race([
          promise,
          stopPromise
        ])
      }
    }
  }
}

export function waiting (
  minimal: number = 5000,
  variable: number = 10000
): SpecimenStepBuilder {
  return (): SpecimenType['step'] => {
    return (element, _bcrs, x, y): PenguinStep => {
      const animation = element.animate(
        [{
          transform: `translate(${x}px, ${y}px)`
        }, {
          transform: `translate(${x}px, ${y}px)`
        }],
        {
          duration: minimal + (variable * Math.random())
        }
      )

      let stop: PenguinStep['stop'] = (): never => {
        throw new Error('Stop was called before being initialized.')
      }

      const stopPromise: PenguinStep['promise'] = new Promise((resolve): void => {
        stop = (): void => {
          resolve({ x, y })

          animation.cancel()
        }
      })
      const promise: PenguinStep['promise'] = new Promise((resolve): void => {
        animation.addEventListener(
          'finish',
          resolve.bind(null, { x, y })
        )
      })

      return {
        stop,
        promise: Promise.race([
          promise,
          stopPromise
        ])
      }
    }
  }
}
