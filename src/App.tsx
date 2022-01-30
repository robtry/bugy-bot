import { Canvas, useThree, extend, ReactThreeFiber } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Bulb from './Bulb';
import Exe from './Exe';
import Floor from './Floor';
import Food from './Food';

extend({ OrbitControls });

// To avoid type error from orbit
declare global {
	namespace JSX {
		interface IntrinsicElements {
			orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
		}
	}
}

// Create orbit to move around the scene
const Orbit = () => {
	const { camera, gl } = useThree();
	return <orbitControls args={[camera, gl.domElement]} />;
};

// Create the canvas and camera
function App() {
	return (
		<div style={{ height: '100vh', width: '100vw' }}>
			<Canvas style={{ background: 'black' }} camera={{ position: [3, 3, 3] }} shadows>
				{/* Lights */}
				<ambientLight intensity={0.2} />
				<Bulb position={[0, 3, 0]} />
				{/* Rotate around the orgin */}
				<Orbit />
				{/* Show x, y and z axis */}
				<axesHelper args={[5]} />
				{/* The mob */}
				<Exe position={[1, 1, 0]} />
				{/* Food */}
				<Food position={[-1, 1, 0]} />
				{/* The floor */}
				<Floor position={[0, -0.5, 0]} />
			</Canvas>
		</div>
	);
}

export default App;
