import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import _ from "lodash";
import { Vector3 } from "three";

const name = "ground-swing";
const scale = 0.04;
export const Swing = () => {
  const { scene } = useGLTF("/models/Swing.glb");
  const position = useMemo(() => new Vector3(8, 0, 8), []);
  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [position, scene]);

  return (
    <primitive
      visible
      name={name}
      scale={[scale, scale, scale]}
      position={position}
      object={scene}
    />
  );
};
