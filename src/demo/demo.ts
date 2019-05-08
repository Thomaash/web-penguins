import {
  CustomSpecimenType,
  PenguinZIndex,
  Species,
  WebPenguins,
  createDefaultSpecies,
  excavating,
  falling,
  ghostMoving,
  walking
} from '@/WebPenguins'

if (location.hash === '#species') {
  // Custom species
  //
  // Group "entering" has to have at least one specimen
  // Group "clicked" is triggered after click (unless empty)
  // Group "falling-gliding" is used after window has been resized

  const placeholders = new Species(20)
  placeholders.add(
    ['entering', 'falling'],
    new CustomSpecimenType({
      nextGroup: 'ground-dwelling',
      offset: { x: 16, y: 32 },
      src: 'assets/placeholders/red.png',
      stepBuilder: falling(200, 'ease-in'),
      zIndex: PenguinZIndex.Flier
    })
  ).add(
    ['ground-dwelling'],
    new CustomSpecimenType({
      nextGroup: 'ground-dwelling',
      offset: { x: 16, y: 32 },
      src: 'assets/placeholders/yellow.png',
      stepBuilder: walking(20, 'linear'),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    ['ground-dwelling'],
    new CustomSpecimenType({
      nextGroup: 'ground-dwelling',
      offset: { x: 16, y: 32 },
      src: 'assets/placeholders/green.png',
      stepBuilder: walking(-20, 'linear'),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    ['ground-dwelling'],
    new CustomSpecimenType({
      nextGroup: 'falling',
      offset: { x: 16, y: 32 },
      src: 'assets/placeholders/cyan.png',
      stepBuilder: excavating(Math.PI / 2),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    ['ground-dwelling', 'clicked'],
    new CustomSpecimenType({
      nextGroup: 'falling',
      offset: { x: 16, y: 32 },
      src: 'assets/placeholders/blue.png',
      stepBuilder: ghostMoving(-Math.PI / 2, 70, 200, 'ease-out'),
      zIndex: PenguinZIndex.Normal
    })
  )

  const wp = new WebPenguins({
    obstacles: [
      document.getElementById('ground'),
      document.getElementById('platform-a'),
      document.getElementById('platform-b'),
      document.getElementById('platform-c'),
      document.getElementById('platform-d'),
      document.getElementById('platform-e')
    ].filter(function neqNull<T> (value: T | null | undefined): value is T {
      return value != null
    }),
    species: [createDefaultSpecies(5), placeholders]
  })

  wp.start()
} else {
  // Simplest configuration
  const wp = new WebPenguins({
    obstacles: [
      document.getElementById('ground'),
      document.getElementById('platform-a'),
      document.getElementById('platform-b'),
      document.getElementById('platform-c'),
      document.getElementById('platform-d'),
      document.getElementById('platform-e')
    ].filter(function neqNull<T> (value: T | null | undefined): value is T {
      return value != null
    })
  })

  wp.start()
}
