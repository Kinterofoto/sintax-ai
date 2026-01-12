import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const GridLines = () => {
    const gridRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        const scroll = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        gridRef.current.position.z = (scroll * 10) % 2;
        gridRef.current.rotation.x = -Math.PI * 0.1;
    });

    return (
        <group ref={gridRef}>
            <gridHelper args={[60, 40, '#151515', '#0a0a0a']} rotation={[0, 0, 0]} />
        </group>
    );
};

export const Experience: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 2, 8]} />
                <ambientLight intensity={0.2} />
                <GridLines />
                <fog attach="fog" args={['#050505', 5, 25]} />
            </Canvas>
        </div>
    );
};
