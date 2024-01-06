import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { Vector3 } from "three";
import _ from "lodash";
const name = "ground-jungleGym";
const scale = 0.8;
export const JungleGym = () => {
  const { scene } = useGLTF("/models/Jungle gym.glb");
  const position = useMemo(() => new Vector3(-12, 0, 6), []);
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
