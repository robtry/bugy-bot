export default function Floor(props: JSX.IntrinsicElements['mesh']) {
	return (
		<mesh {...props} receiveShadow>
			<boxBufferGeometry args={[20, 1, 20]} />
			<meshPhysicalMaterial />
		</mesh>
	);
}
