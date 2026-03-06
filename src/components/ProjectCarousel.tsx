'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useCursor, Text, Image as ThreeImage } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion-3d';

const projects = [
    { id: 1, title: 'AI Code Assistant', description: 'Next.js & OpenAI', color: '#818cf8', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&h=400&auto=format&fit=crop' },
    { id: 2, title: 'DeFi Dashboard', description: 'React & Web3', color: '#c084fc', image: 'https://images.unsplash.com/photo-1639762681485-074b7f4d23cb?q=80&w=600&h=400&auto=format&fit=crop' },
    { id: 3, title: 'E-Commerce App', description: 'Next.js & Stripe', color: '#38bdf8', image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=600&h=400&auto=format&fit=crop' },
    { id: 4, title: 'Health Tracker', description: 'React Native', color: '#10b981', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&h=400&auto=format&fit=crop' },
    { id: 5, title: 'Social Platform', description: 'Vue & Firebase', color: '#f43f5e', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&h=400&auto=format&fit=crop' },
];

function ProjectCard({ project, index, total }: { project: any, index: number, total: number }) {
    const ref = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    const radius = 4.5;
    const angle = (index / total) * Math.PI * 2;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    // Slowly rotate the card group
    useFrame((state, delta) => {
        if (ref.current) {
            // Rotate looking at center
            ref.current.lookAt(0, 0, 0);
        }
    });

    return (
        <motion.group
            ref={ref as any}
            position={[x, 0, z]}
            whileHover={{ scale: 1.1, y: 0.5 }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[2.8, 3.8]} />
                <meshStandardMaterial color={hovered ? '#fff' : '#1a1a1a'} roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Fallback image color representation */}
            <mesh position={[0, 0.4, 0.01]}>
                <planeGeometry args={[2.6, 2.2]} />
                <meshBasicMaterial color={project.color} />
            </mesh>

            {/* Note: In a real app we would use <ThreeImage url={project.image} /> but we use colored placeholder to avoid cross-origin issues during static export locally */}

            <Text position={[0, -1.1, 0.02]} fontSize={0.25} color={hovered ? '#000' : '#fff'} anchorX="center" maxWidth={2.4}>
                {project.title}
            </Text>

            <Text position={[0, -1.5, 0.02]} fontSize={0.15} color={hovered ? '#444' : '#888'} anchorX="center" maxWidth={2.4}>
                {project.description}
            </Text>
        </motion.group>
    );
}

function Carousel() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <group ref={groupRef}>
            {projects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} total={projects.length} />
            ))}
        </group>
    );
}

export default function ProjectCarousel() {
    return (
        <div className="w-full h-[600px] mt-10 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
            <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <Carousel />
            </Canvas>
        </div>
    );
}
