import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Exe(props: JSX.IntrinsicElements['mesh']) {
	const ref = useRef<any>();
	useFrame(() => {
		ref.current.rotation.x += 0.01;
		ref.current.rotation.y += 0.01;
	});
	return (
		<mesh ref={ref} {...props} castShadow receiveShadow>
			<boxBufferGeometry />
			{/* No matter ligth */}
			{/* <meshBasicMaterial color='blue' /> */}
			<meshPhysicalMaterial color='blue' />
		</mesh>
	);
}
