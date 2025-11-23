"use client";
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface TreeWireMeshProps {
    className?: string;
}

const TreeWireMesh: React.FC<TreeWireMeshProps> = ({ className = "" }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const treeGroupRef = useRef<THREE.Group | null>(null);
    const frameIdRef = useRef<number | null>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        if (!canvasRef.current || !isMounted) return;

        // Setup scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a0a);
        sceneRef.current = scene;

        // Setup camera
        const camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 12, 60);
        camera.lookAt(0, 2, 0);
        cameraRef.current = camera;

        // Setup renderer using the canvas ref
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: false,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererRef.current = renderer;

        // Create tree group
        const treeGroup = new THREE.Group();
        treeGroup.position.y = -2;
        treeGroupRef.current = treeGroup;

        // Load tree model or create procedural tree
        const loader = new GLTFLoader();
        loader.load(
            '/models/maple_tree.glb',
            (gltf) => {
                const model = gltf.scene;

                model.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        let wireframeColor = 0xaaaaaa;

                        if (child.material && 'color' in child.material) {
                            const originalColor = (child.material as any).color;
                            if (originalColor) {
                                const r = originalColor.r || 0;
                                const g = originalColor.g || 0;
                                const b = originalColor.b || 0;
                                const gray = (r * 0.299 + g * 0.587 + b * 0.114);
                                wireframeColor = new THREE.Color(gray * 0.8 + 0.2, gray * 0.8 + 0.2, gray * 0.8 + 0.2).getHex();
                            }
                        }

                        const wireframeMaterial = new THREE.MeshBasicMaterial({
                            color: wireframeColor,
                            wireframe: true,
                            transparent: true,
                            opacity: 0.85
                        });

                        // Dispose old material
                        if (child.material) {
                            if (Array.isArray(child.material)) {
                                child.material.forEach(m => m.dispose());
                            } else {
                                child.material.dispose();
                            }
                        }

                        child.material = wireframeMaterial;
                    }
                });

                model.scale.set(0.1, 0.1, 0.1);
                model.position.y = -2;

                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.x -= center.x;
                model.position.z -= center.z;
                model.position.y -= center.y - 2;

                treeGroup.add(model);
                scene.add(treeGroup);
            },
            undefined,
            (error) => {
                console.warn('Could not load tree model, using simple wireframe tree');
                // Create simple procedural tree as fallback
                const trunk = createSimpleTree();
                treeGroup.add(trunk);
                scene.add(treeGroup);
            }
        );

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        scene.add(directionalLight);

        // Mouse handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Resize handler
        const handleResize = () => {
            if (!camera || !renderer) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Animation loop
        let time = 0;
        const animate = () => {
            frameIdRef.current = requestAnimationFrame(animate);
            time += 0.01;

            if (treeGroup) {
                treeGroup.rotation.y += 0.005;
            }

            if (camera) {
                camera.position.x += (mouseRef.current.x * 3 - camera.position.x) * 0.01;
                camera.position.y += (12 + mouseRef.current.y * 3 - camera.position.y) * 0.01;
                camera.lookAt(0, 2, 0);
            }

            if (renderer && scene && camera) {
                renderer.render(scene, camera);
            }
        };
        animate();

        // Cleanup function
        return () => {
            // Cancel animation frame
            if (frameIdRef.current) {
                cancelAnimationFrame(frameIdRef.current);
                frameIdRef.current = null;
            }

            // Remove event listeners
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);

            // Dispose Three.js resources
            if (scene) {
                scene.traverse((object) => {
                    if (object instanceof THREE.Mesh) {
                        if (object.geometry) object.geometry.dispose();
                        if (object.material) {
                            if (Array.isArray(object.material)) {
                                object.material.forEach(m => m.dispose());
                            } else {
                                object.material.dispose();
                            }
                        }
                    }
                });
                scene.clear();
            }

            // Dispose renderer
            if (renderer) {
                renderer.dispose();
                renderer.forceContextLoss();
            }

            // Clear refs
            rendererRef.current = null;
            sceneRef.current = null;
            cameraRef.current = null;
            treeGroupRef.current = null;
        };
    }, [isMounted]);

    // Helper function to create simple tree
    const createSimpleTree = (): THREE.Group => {
        const group = new THREE.Group();

        // Trunk
        const trunkGeometry = new THREE.CylinderGeometry(0.25, 0.35, 5, 16);
        const trunkMaterial = new THREE.MeshBasicMaterial({
            color: 0x888888,
            wireframe: true,
            transparent: true,
            opacity: 0.9
        });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 0.5;
        group.add(trunk);

        // Branches
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const branchGeometry = new THREE.CylinderGeometry(0.1, 0.15, 2, 8);
            const branchMaterial = new THREE.MeshBasicMaterial({
                color: 0xaaaaaa,
                wireframe: true,
                transparent: true,
                opacity: 0.85
            });
            const branch = new THREE.Mesh(branchGeometry, branchMaterial);

            branch.position.x = Math.cos(angle) * 0.5;
            branch.position.y = 2 + Math.random();
            branch.position.z = Math.sin(angle) * 0.5;
            branch.rotation.z = Math.PI / 4;
            branch.rotation.y = angle;

            group.add(branch);
        }

        return group;
    };

    if (!isMounted) {
        return null;
    }

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 z-0 ${className}`}
            style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                background: '#0a0a0a',
                display: 'block'
            }}
        />
    );
};

export default TreeWireMesh;
