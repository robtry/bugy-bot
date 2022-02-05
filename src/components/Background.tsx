import { useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import image from '../assets/background.jpg';

/**
 * The whole backgorund
 */
export default function Background() {
	// Load the texture
	const texture = useLoader(THREE.TextureLoader, image);
	const { gl } = useThree();
	const formatted = new THREE.WebGLCubeRenderTarget(
		texture.image.height
	).fromEquirectangularTexture(gl, texture);
	return <primitive attach='background' object={formatted.texture}></primitive>;
}
