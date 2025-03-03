"use client";
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const FloatingObject = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1.5, 0.1, 1000); // Wider aspect ratio
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    // Set renderer size to match container
    const updateSize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    
    updateSize();
    renderer.setClearColor(0x000000, 0);
    
    // Append renderer to the container
    containerRef.current.appendChild(renderer.domElement);
    
    // Keep the large torus size
    const torusGeometry = new THREE.TorusGeometry(7.5, 2.2, 16, 50);
    
    // Keep the dark blue color
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6, // Very dark blue
      linewidth: 2.0
    });
    
    // Create wireframe from geometry
    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(torusGeometry),
      wireframeMaterial
    );
    
    // Center the torus
    wireframe.position.set(0, 0, 0);
    
    scene.add(wireframe);
    
    // Position camera for full visibility
    camera.position.z = 32;
    
    // Animation function with slow rotation
    const animate = () => {
      requestAnimationFrame(animate);
      wireframe.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    
    // Handle window resize
    window.addEventListener('resize', updateSize);
    
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', updateSize);
      
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      torusGeometry.dispose();
      wireframeMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="w-[150%] h-[250px] -ml-8 my-4 lg:-ml-24 lg:w-[140%]"
      style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    />
  );
};

export default FloatingObject;