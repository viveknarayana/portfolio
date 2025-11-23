"use client";
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

import { usePathname } from 'next/navigation';

const StarsBackground: React.FC = () => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    stars: THREE.Mesh[]
  } | null>(null);

  if (pathname?.startsWith('/landing')) return null;

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js objects
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a); // Deep black background
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Store reference to the DOM element for cleanup
    const rendererElement = renderer.domElement;
    containerRef.current.appendChild(rendererElement);

    // Create stars
    const stars: THREE.Mesh[] = [];
    for (let z = -1000; z < 1000; z += 30) {  // Adjusted spacing
      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0, 0, Math.random() * 0.5 + 0.5), // White/Gray stars
        transparent: true,
        opacity: Math.random() * 0.3 + 0.8  // High opacity for professional look
      });
      const sphere = new THREE.Mesh(geometry, material);

      // Randomize position
      sphere.position.x = Math.random() * 1000 - 500;
      sphere.position.y = Math.random() * 1000 - 500;
      sphere.position.z = z;

      // Scale up the sphere
      sphere.scale.x = sphere.scale.y = 1.5;

      scene.add(sphere);
      stars.push(sphere);
    }

    // Store reference to scene objects
    sceneRef.current = { scene, camera, renderer, stars };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (sceneRef.current) {
        const time = Date.now() * 0.001; // Time in seconds

        // Move stars and add twinkling effect
        sceneRef.current.stars.forEach((star, i) => {
          star.position.z += i / 25;  // Adjusted speed (faster than last version, slower than original)

          // Add twinkling effect
          const twinkle = Math.sin(time * 2 + i * 0.1) * 0.3 + 0.7;
          if (star.material instanceof THREE.MeshBasicMaterial) {
            star.material.opacity = twinkle * (Math.random() * 0.4 + 0.7);
          }

          // Add subtle scale pulsing for shine effect
          const scale = 1 + Math.sin(time * 3 + i * 0.2) * 0.1;
          star.scale.setScalar(scale);

          // Reset star position if it moves too far
          if (star.position.z > 1000) {
            star.position.z -= 2000;
            // Randomize x and y when resetting
            star.position.x = Math.random() * 1000 - 500;
            star.position.y = Math.random() * 1000 - 500;
          }
        });

        // Render the scene
        sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      }
    };

    // Start animation
    animate();

    // Resize handler
    const handleResize = () => {
      if (sceneRef.current) {
        const { camera, renderer } = sceneRef.current;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);

      if (sceneRef.current) {
        // Check if the element still has a parent before attempting removal
        if (rendererElement.parentNode) {
          rendererElement.parentNode.removeChild(rendererElement);
        }

        // Dispose of Three.js resources
        sceneRef.current.renderer.dispose();

        // Clean up geometries and materials
        sceneRef.current.stars.forEach(star => {
          star.geometry.dispose();
          if (star.material instanceof THREE.Material) {
            star.material.dispose();
          }
        });
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    />
  );
};

export default StarsBackground;