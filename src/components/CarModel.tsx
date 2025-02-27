import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stage, useGLTF, Environment } from "@react-three/drei";
import ShowBg from "../assets/images/show_bg_2.png";
import * as THREE from "three";

interface CarModelProps {
	selectedColor: string;
}

const CarModelThree = ({ selectedColor }: CarModelProps) => {
	return (
		<Canvas
			camera={{ position: [0, 0, 5] }}
			className='carModel bg-contain bg-center rounded-[2rem] border border-white'
			style={{ backgroundImage: `url(${ShowBg})` }}>
			{/* Ambient and directional lights for better illumination */}
			<ambientLight intensity={0.6} />
			<directionalLight position={[5, 10, 5]} intensity={1} />
			<pointLight position={[10, 10, 10]} intensity={1.2} />

			{/* Adding an environment map to improve reflections */}
			<Environment preset='city' />

			<Stage environment={null}>
				<CarModel selectedColor={selectedColor} />
			</Stage>
		</Canvas>
	);
};

const CarModel = ({ selectedColor }: CarModelProps) => {
	const { scene } = useGLTF("/3d-models/car_model_1.glb");
	const modelRef = useRef<THREE.Group>(null);

	useFrame(() => {
		if (modelRef.current) {
			modelRef.current.rotation.y += 0.007;
		}
	});

	useEffect(() => {
		scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const materialName = child.material.name.toLowerCase();

				if (materialName.includes("body")) {
					// Update color and lighting properties for the car body
					child.material.color.set(new THREE.Color(selectedColor));
					child.material.metalness = 0.9; // Increase metalness for reflective effect
					child.material.roughness = 0.15; // Reduce roughness for more shine
					child.material.envMapIntensity = 1.5; // Higher environment map intensity for brightness
				} else if (
					materialName.includes("glass") ||
					materialName.includes("window")
				) {
					// Settings for glass materials
					child.material = new THREE.MeshPhysicalMaterial({
						color: new THREE.Color("#ffffff"),
						transmission: 0.9,
						opacity: 0.3,
						metalness: 0,
						roughness: 0,
						clearcoat: 1,
						transparent: true,
					});
				} else if (
					materialName.includes("wheel") ||
					materialName.includes("tire")
				) {
					// Wheels/tires properties
					child.material.color.set(new THREE.Color("#1a1a1a"));
					child.material.metalness = 0.5;
					child.material.roughness = 0.4;
				} else if (
					materialName.includes("chrome") ||
					materialName.includes("metal")
				) {
					// Chrome/metal parts settings
					child.material.color.set(new THREE.Color("#ffffff"));
					child.material.metalness = 1;
					child.material.roughness = 0;
					child.material.envMapIntensity = 2;
				}

				child.material.needsUpdate = true;
			}
		});
	}, [scene, selectedColor]);

	return <primitive ref={modelRef} object={scene} scale={7} />;
};

useGLTF.preload("/3d-models/car_model_1.glb");

export default CarModelThree;
