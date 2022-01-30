export default function Bulb(props: JSX.IntrinsicElements['mesh']) {
	return (
		<mesh {...props}>
			<pointLight castShadow />
			<sphereBufferGeometry args={[0.2, 20, 20]} />
			<meshPhongMaterial />
		</mesh>
	);
}
