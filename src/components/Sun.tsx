import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import shallow from 'zustand/shallow';
import appStore from '../store/app.store';
import image from '../assets/sun.jpg';

// To know when to reset the Sun
const halfCircle = Math.PI;

/**
 * The Sun Component it provides from lights to the scene
 */
export default function Sun() {
	// Reference the object
	const sunRef = useRef<any>();
	// Ref to active or pause
	const shouldRunRef = useRef(false);
	// Ref to the current angle
	const angleRef = useRef(0);
	// Speed of the day
	const speedDayRef = useRef(0);
	// Distance
	const distanceRef = useRef(0);

	// Listen for the changes that are handled below
	const [active, nextGeneration, speedDay, planceDistance] = appStore(
		(state) => [state.active, state.nextGeneration, state.speedDay, state.planeSize],
		shallow
	);

	// To render in the correct position
	const [loading, setLoading] = useState(true);

	// Listen to change on active
	useEffect(() => {
		shouldRunRef.current = active;
	}, [active]);

	// Listen to changes on speed
	useEffect(() => {
		speedDayRef.current = speedDay;
	}, [speedDay]);

	// Listen to changes for distance on plane
	useEffect(() => {
		distanceRef.current = planceDistance / 2;
		setLoading(false);
	}, [planceDistance]);

	// To load the texture
	const texture = useLoader(TextureLoader, image);

	// Loop
	useFrame(() => {
		if (shouldRunRef.current) {
			// Move
			sunRef.current.position.x = distanceRef.current * Math.cos(angleRef.current);
			sunRef.current.position.y = distanceRef.current * Math.sin(angleRef.current);
			// Rotate
			sunRef.current.rotation.x += 0.01;
			sunRef.current.rotation.z += 0.01;
			// Reset angle
			if (angleRef.current > halfCircle) {
				nextGeneration();
				angleRef.current = 0;
			} else {
				angleRef.current += speedDayRef.current;
			}
		}
	});

	if (loading) {
		return null;
	}

	return (
		<mesh position={[distanceRef.current, 0, 0]} ref={sunRef}>
			<pointLight castShadow />
			<sphereBufferGeometry args={[0.2, 20, 20]} />
			{/* <meshPhongMaterial emissive={new Color('yellow')} /> */}
			{/* Basic material dont care about light */}
			<meshBasicMaterial map={texture} />
		</mesh>
	);
}
