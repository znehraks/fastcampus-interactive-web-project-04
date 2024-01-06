import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import _ from "lodash";
import { Vector3 } from "three";

const name = "ground-slide";
export const Slide = () => {
  const { scene } = useGLTF("/models/Slide.glb");
  const position = useMemo(() => new Vector3(9, 0, -10), []);
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
      scale={1.5}
      position={position}
      rotation-y={Math.PI / 10}
      object={scene}
    />
  );
};
