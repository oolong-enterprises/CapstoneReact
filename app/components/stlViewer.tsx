import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as THREE from "three";

function Model({ url }: { url: string }) {
  const geometry = useLoader(STLLoader, url);

  geometry.computeVertexNormals();

  return (
    <Center>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#3976df"
          metalness={0.2}
          roughness={0.5}
        />
      </mesh>
    </Center>
  );
}

export default function STLViewer({ url }: { url: string }) {
  return (
    <Canvas camera={{ position: [80, 80, 80], fov: 45 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} />

      <Model url={url} />

      <OrbitControls makeDefault />
    </Canvas>
  );
}