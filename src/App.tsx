import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import Background from './components/Background';
import Sun from './components/Sun';
import Exe from './components/models/Exe';
import Floor from './components/Floor';
import Dashboard from './components/Dashboard';
import appStore from './store/app.store';
import Apple from './components/models/Apple';

/**
 * The scenario
 * Here is the initial setup
 * * Dashboard
 * * Canvas
 */
function App() {
	// ref to avoid the collision problem
	const foodRef = useRef(appStore.getState().food);

	return (
		<div style={{ height: '100vh', width: '100vw' }}>
			{/* Controls, Log, Chart */}
			<Dashboard />
			{/* Canvas */}
			<Canvas style={{ background: 'black' }} camera={{ position: [8, 7, 5] }} shadows>
				{/* Lights */}
				<ambientLight intensity={0.08} />
				{/* Rotate around the orgin */}
				<OrbitControls />
				{/* Show x, y and z axis */}
				{/* <axesHelper args={[5]} /> */}
				{/* Show 1000 starts in the scenario */}
				<Stars count={500} />
				{/* Suspense to wait to load the model */}
				<Suspense fallback={null}>
					{/* Add Physics to detect collision */}
					<Physics>
						{/* <Debug color='black'> */}
						{/* The ligth to represent the day */}
						<Sun />

						{/* Apples */}
						{foodRef.current.map((f, i) => (
							<Apple id={f.id} key={f.id} position={[f.position.x, f.position.y, f.position.z]} />
						))}

						{/* Mobs */}
						{/* {mobsRef.current.map((exe) => (
							<Exe key={exe.id} position={[exe.position.x, exe.position.y, exe.position.z]} />
						))} */}
						<Exe />

						{/* Floor */}
						<Floor rotation={[-Math.PI / 2, 0, 0]} />
						{/* </Debug> */}
					</Physics>
				</Suspense>
				{/* Background */}
				<Suspense fallback={null}>
					<Background />
				</Suspense>
			</Canvas>
		</div>
	);
}

export default App;
