import { useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import image from '../assets/background.jpg';

export default function Background() {
	const texture = useLoader(THREE.TextureLoader, image);
	const { gl } = useThree();
	const formatted = new THREE.WebGLCubeRenderTarget(
		texture.image.height
	).fromEquirectangularTexture(gl, texture);
	return <primitive attach='background' object={formatted.texture}></primitive>;
}
