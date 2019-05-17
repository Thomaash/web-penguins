declare module '*.gif'
declare module '*.jpg'
declare module '*.png'

declare module 'web-animations-js/web-animations.min.js'

declare module 'line-intersect' {
  export function checkIntersection(
    x1: number, y1: number,
    x2: number, y2: number,
    x3: number, y3: number,
    x4: number, y4: number
  ): {
    type: 'none' | 'parallel' | 'colinear' | 'intersecting'
    point: { x: number, y: number } | undefined
  }
}
