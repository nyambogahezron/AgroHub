import { useEffect } from 'react';
import * as THREE from 'three';

export default function Globe() {
  useEffect(() => {
    // Globe setup using three.js
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / 500,
      0.1,
      1000
    );
    let renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, 500);
    document.getElementById('globe-container').appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const texture = new THREE.TextureLoader().load('earth-night-map.jpg');
    const material = new THREE.MeshBasicMaterial({ map: texture });
    let globe = new THREE.Mesh(geometry, material);

    scene.add(globe);
    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.001;
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <div id='globe-container'></div>;
}
