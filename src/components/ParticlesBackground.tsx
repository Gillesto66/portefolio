'use client';
import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 z-0"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: 60, density: { enable: true } },
          color: { value: '#ff5722' },
          opacity: { value: { min: 0.1, max: 0.5 } },
          size: { value: { min: 0.5, max: 1.5 } },
          links: {
            enable: true,
            color: '#ff5722',
            opacity: 0.08,
            distance: 160,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: 'none',
            outModes: { default: 'bounce' },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
          },
          modes: {
            grab: { distance: 180, links: { opacity: 0.25 } },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
