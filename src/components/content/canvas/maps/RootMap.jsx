import React, { Suspense, useEffect, useRef } from "react";
import { GroundElements } from "./structures/ground";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CharacterSelectFinishedAtom,
  CurrentMapAtom,
  PlayerGroundStructuresFloorPlaneCornersSelector,
  PlayersAtom,
  RecentChatsAtom,
} from "../../../../store/PlayersAtom";
import { CharacterInit } from "../../lobby/CharacterInit";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Player } from "./player/Player";
import { Line } from "@react-three/drei";
import { Loader } from "../../loader/Loader";
import { ChatBubble } from "./structures/ground/3dUIs/ChatBubble";
import { MyRoom } from "./structures/myRoom";

export const RootMap = () => {
  const [characterSelectFinished] = useRecoilState(CharacterSelectFinishedAtom);
  const [players] = useRecoilState(PlayersAtom);
  const recentChats = useRecoilValue(RecentChatsAtom);
  const playerGroundStructuresFloorPlaneCorners = useRecoilValue(
    PlayerGroundStructuresFloorPlaneCornersSelector
  );
  const currentMap = useRecoilValue(CurrentMapAtom);
  const camera = useThree((three) => three.camera);
  const controls = useRef(null);
  useEffect(() => {
    if (!controls.current) return;
    camera.position.set(14, 14, 14);
    controls.current.target.set(0, 0, 0);
  }, [camera.position]);
  return (
    <>
      <ambientLight
        name="ambientLight"
        intensity={currentMap === "GROUND" ? 5 : 0.5}
      />
      {currentMap === "GROUND" && (
        <Suspense fallback={<Loader />}>
          <directionalLight
            castShadow
            intensity={10}
            position={[0, 50, -50]}
            shadow-normalBias={0.1}
            shadow-camera-left={-25}
            shadow-camera-right={25}
            shadow-camera-top={25}
            shadow-camera-bottom={-25}
            shadow-camera-near={0.1}
            shadow-camera-far={200}
          />
          {!characterSelectFinished ? (
            <CharacterInit />
          ) : (
            <>
              <GroundElements />
              {playerGroundStructuresFloorPlaneCorners?.map((corner) => {
                return (
                  <Line
                    key={corner.name}
                    color="red"
                    points={corner.corners.map((c) => [c.x, 0.01, c.z])}
                  />
                );
              })}
              {players.map((player) => {
                return (
                  <React.Fragment key={player.id}>
                    <ChatBubble
                      key={`${player.id}_chat`}
                      player={player}
                      chat={recentChats.find(
                        (recentChat) => recentChat.senderId === player.id
                      )}
                    />
                    <Player
                      key={`${player.id}_character`}
                      player={player}
                      position={
                        new THREE.Vector3(
                          player.position[0],
                          player.position[1],
                          player.position[2]
                        )
                      }
                    />
                  </React.Fragment>
                );
              })}
            </>
          )}
        </Suspense>
      )}
      {currentMap === "MY_ROOM" && <MyRoom />}
    </>
  );
};
