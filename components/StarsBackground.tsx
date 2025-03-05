"use client";
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const StarsBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    stars: THREE.Mesh[]
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js objects
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create stars
    const stars: THREE.Mesh[] = [];
    for (let z = -1000; z < 1000; z += 30) {  // Adjusted spacing
      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const material = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.3  // Varied opacity for depth
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
        // Move stars (moderately paced)
        sceneRef.current.stars.forEach((star, i) => {
          star.position.z += i / 25;  // Adjusted speed (faster than last version, slower than original)

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
      
      if (containerRef.current && sceneRef.current) {
        containerRef.current.removeChild(sceneRef.current.renderer.domElement);
        sceneRef.current.renderer.dispose();
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