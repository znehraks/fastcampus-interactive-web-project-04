/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import React from "react";
import { calculateMinimapPosition } from "../../../../../utils";
import { useRecoilValue } from "recoil";
import { MeAtom } from "../../../../../store/PlayersAtom";
import { usePlayer } from "./hooks/usePlayer";

export function Man({ player, position, modelIndex }) {
  const { playerRef, memoizedPosition, playerId, nodes, materials } = usePlayer(
    {
      player,
      position,
      modelIndex: modelIndex ?? player.selectedCharacterGlbNameIndex,
    }
  );

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
            geometry={nodes.Character["geometry"]}
            material={materials.Atlas}
            skeleton={nodes.Character["skeleton"]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
}
