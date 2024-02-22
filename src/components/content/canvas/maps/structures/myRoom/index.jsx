import { useRecoilValue } from "recoil";
import { CurrentPlacingMyRoomSkillAtom } from "../../../../../../store/PlayersAtom";
import { MyRoomFloor } from "./elements/MyRoomFloor";
import { MyRoomLeftWall } from "./elements/MyRoomLeftWall";
import { MyRoomRightWall } from "./elements/MyRoomRightWall";
import { MyRoomSkillPlaceMode } from "./placeMode/MyRoomSkillPlaceMode";

export const MyRoom = () => {
  const currentPlacingMyRoomSkill = useRecoilValue(
    CurrentPlacingMyRoomSkillAtom
  );

  return (
    <>
      <directionalLight
        castShadow
        intensity={1}
        position={[0, 20, 20]}
        shadow-camera-bias={1}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <spotLight castShadow intensity={10} position={[-1, 10, -1]} />
      {/* 기본 바닥, 벽 */}
      <MyRoomFloor />
      <MyRoomLeftWall />
      <MyRoomRightWall />
      {/* 배치모드  */}
      {currentPlacingMyRoomSkill && (
        <MyRoomSkillPlaceMode
          currentPlacingMyRoomSkill={currentPlacingMyRoomSkill}
        />
      )}
    </>
  );
};
