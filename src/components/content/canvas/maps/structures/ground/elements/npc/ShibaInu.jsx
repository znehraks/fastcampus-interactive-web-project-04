import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { Vector3 } from "three";
import gsap from "gsap";
import { NicknameBoard } from "../../3dUIs/NicknameBoard";
import { useFrame } from "@react-three/fiber";

const name = "ground-shiba-inu";
export const ShibaInu = () => {
  const ref = useRef(null);
  const nameRef = useRef(null);
  const { scene, animations } = useGLTF("/models/Shiba Inu.glb");
  const { actions } = useAnimations(animations, ref);
  const position = useMemo(() => new Vector3(-1, 0, 21), []);
  useEffect(() => {
    if (!ref.current) return;
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    let animation;
    actions["Walk"]?.play();
    animation = gsap.to(ref.current.position, {
      duration: 5,
      yoyo: true,
      repeat: -1,
      x: 3,
      ease: "linear",
      onUpdate: () => {
        const progress = animation.progress();
        if (Math.abs(progress) < 0.01) {
          ref.current?.lookAt(3, 0, 21);
        } else if (Math.abs(progress) > 0.99) {
          ref.current?.lookAt(-1, 0, 21);
        }
      },
    });
    animation.play();
    return () => {
      animation.pause();
    };
  }, [actions, position, scene]);
  useFrame(() => {
    if (!ref.current) return;
    if (nameRef.current) {
      nameRef.current.position.set(
        ref.current.position.x,
        ref.current.position.y + 3,
        ref.current.position.z
      );
      nameRef.current.lookAt(10000, 10000, 10000);
    }
  });
  return (
    <>
      <NicknameBoard ref={nameRef} text="댕댕이" isNpc />
      <primitive
        ref={ref}
        scale={0.7}
        visible
        name={name}
        position={position}
        rotation-y={Math.PI / 1.5}
        object={scene}
      />
    </>
  );
};
