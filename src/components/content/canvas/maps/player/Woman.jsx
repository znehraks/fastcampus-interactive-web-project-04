/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import React from "react";

export function Woman({ player, position }) {
  const playerId = player?.id;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedPosition = useMemo(() => position, []);

  const playerRef = useRef(null);

  const { scene, materials, animations } = useGLTF(
    `/models/CubeWomanCharacter.glb`
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clone = useMemo(() => SkeletonUtils.clone(scene), []);
  const objectMap = useGraph(clone);
  const nodes = objectMap.nodes;

  const [animation, setAnimation] = useState(
    "CharacterArmature|CharacterArmature|CharacterArmature|Idle"
  );
  const { actions } = useAnimations(animations, playerRef);

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.5).play();
    return () => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [actions, animation]);

  return (
    <group
      ref={playerRef}
      position={memoizedPosition}
      name={playerId ?? ""}
      dispose={null}
    >
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="CharacterArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Root} />
          </group>
          <skinnedMesh
            castShadow
            receiveShadow
            name="Character"
            geometry={nodes.Character.geometry}
            material={materials["Atlas.001"]}
            skeleton={nodes.Character.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
}
