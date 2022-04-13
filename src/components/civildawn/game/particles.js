import player from "./player";

const particles = {
  dustParticles: null
};

export default particles;

export const initParticles = () => {
	const dustParticles = player.scene.add.particles("dust");
  particles.dustParticles = dustParticles;
  player.dustParticleEmitter = dustParticles.createEmitter({
    x: 400,
    y: 300,
    lifespan: 2000,
    speed: { min: 400, max: 600 },
    angle: 330,
    gravityY: 300,
    scale: { start: 32.4, end: 0 },
    quantity: 2,
    blendMode: "ADD"
  });
};