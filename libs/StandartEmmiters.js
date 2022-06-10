export const boom = {
  alpha: {
    start: 0.8,
    end: 0.1
  },
  scale: {
    start: 1,
    end: 0.3,
    minimumScaleMultiplier: 1
  },
  color: {
    start: '#858585',
    end: '#ffffff'
  },
  speed: {
    start: 200,
    end: 100,
    minimumSpeedMultiplier: 1
  },
  acceleration: {
    x: 0,
    y: 0
  },
  maxSpeed: 0,
  startRotation: {
    min: 0,
    max: 360
  },
  noRotation: false,
  rotationSpeed: {
    min: 0,
    max: 0
  },
  lifetime: {
    min: 0.25,
    max: 0.25
  },
  blendMode: 'normal',
  frequency: 0.008,
  emitterLifetime: 0.01,
  maxParticles: 50,
  particlesPerWave: 20,

  pos: {
    x: 0,
    y: 0
  },
  addAtBack: false,
  spawnType: 'circle',
  spawnCircle: {
    x: 0,
    y: 0,
    r: 10
  }
}
