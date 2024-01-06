import React, { useEffect, useRef } from "react";
import { GroundElements } from "./structures/ground";
import { useRecoilState } from "recoil";
import {
  CharacterSelectFinishedAtom,
  PlayersAtom,
} from "../../../../store/PlayersAtom";
import { CharacterInit } from "../../lobby/CharacterInit";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Man } from "./player/Man";
import { Woman } from "./player/Woman";
import { Kid } from "./player/Kid";

export const RootMap = () => {
  const [characterSelectFinished] = useRecoilState(CharacterSelectFinishedAtom);
  const [players] = useRecoilState(PlayersAtom);
  const camera = useThree((three) => three.camera);
  const controls = useRef(null);
  useEffect(() => {
    if (!controls.current) return;
    camera.position.set(14, 14, 14);
    controls.current.target.set(0, 0, 0);
  }, [camera.position]);
  return (
    <>
      {!characterSelectFinished ? (
        <CharacterInit />
      ) : (
        <>
          <GroundElements />
          {players.map((player) => {
            return (
              <>
                {player.selectedCharacterGlbNameIndex === 0 && (
                  <Man
                    player={player}
                    position={
                      new THREE.Vector3(
                        player.position[0],
                        player.position[1],
                        player.position[2]
                      )
                    }
                  />
                )}
                {player.selectedCharacterGlbNameIndex === 1 && (
                  <Woman
                    player={player}
                    position={
                      new THREE.Vector3(
                        player.position[0],
                        player.position[1],
                        player.position[2]
                      )
                    }
                  />
                )}
                {player.selectedCharacterGlbNameIndex === 2 && (
                  <Kid
                    player={player}
                    position={
                      new THREE.Vector3(
                        player.position[0],
                        player.position[1],
                        player.position[2]
                      )
                    }
                  />
                )}
              </>
            );
          })}
        </>
      )}
    </>
  );
};
