import {
  CustomSpecimenType,
  PenguinZIndex,
  Species,
  SpecimenGroup,
  WebPenguins,
  createDefaultSpecies,
  excavating,
  falling,
  ghostMoving,
  walking
} from '@/WebPenguins'

if (location.hash === '#species') {
  // Custom species
  const placeholders = new Species(20)
  placeholders.add(
    [SpecimenGroup.FallingGliding, SpecimenGroup.Entering],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 32 },
      src: 'assets/placeholders/red.png',
      stepBuilder: falling(200, 'ease-in'),
      zIndex: PenguinZIndex.Flier
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 32 },
      src: 'assets/placeholders/yellow.png',
      stepBuilder: walking(20, 'linear'),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.GroundDwelling,
      offset: { x: 16, y: 32 },
      src: 'assets/placeholders/green.png',
      stepBuilder: walking(-20, 'linear'),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.FallingGliding,
      offset: { x: 16, y: 32 },
      src: 'assets/placeholders/cyan.png',
      stepBuilder: excavating(Math.PI / 2),
      zIndex: PenguinZIndex.Normal
    })
  ).add(
    [SpecimenGroup.GroundDwelling, SpecimenGroup.Clicked],
    new CustomSpecimenType({
      nextGroup: SpecimenGroup.FallingGliding,
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
