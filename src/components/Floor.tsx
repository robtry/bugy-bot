import { PlaneProps, usePlane } from '@react-three/cannon';
import shallow from 'zustand/shallow';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import appStore from '../store/app.store';
import image from '../assets/floor.jpg';

/**
 * The floor component
 */
export default function Floor(props: PlaneProps) {
	// Reference to the object
	const [ref] = usePlane(() => ({
		type: 'Static',
		collisionFilterGroup: 70,
		isTrigger: false,
		...props
	}));
	// Load textures
	const texture = useLoader(TextureLoader, image);
	// Get the size of the plane
	const [size] = appStore((state) => [state.planeSize], shallow);

	// if (!size) {
	// 	return null;
	// }

	return (
		<mesh ref={ref} receiveShadow>
			<planeBufferGeometry args={[size, size]} />
			<meshPhysicalMaterial map={texture} />
			{/* <meshPhysicalMaterial /> */}
			{/* <meshPhysicalMaterial transparent opacity={0.1} /> */}
		</mesh>
	);
}
