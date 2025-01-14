import { useThree } from "@react-three/fiber";
import { CurrentSelectedMyRoomObjectAtom } from "../../../../../../../store/PlayersAtom";
import { MyRoomPlacedFurniture } from "./MyRoomPlacedFurniture";
import { MyRoomPlacedMemo } from "./MyRoomPlacedMemo";
import { MyRoomPlacedSkillBox } from "./MyRoomPlacedSkillBox";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

export const MyRoomElements = ({ object }) => {
  const three = useThree();
  const [, setCurrentSelectedMyRoomObject] = useRecoilState(
    CurrentSelectedMyRoomObjectAtom
  );

  useEffect(() => {
    const discardPopup = () => {
      setCurrentSelectedMyRoomObject(undefined);
    };
    three.gl.domElement.addEventListener("pointerdown", discardPopup);
    return () => {
      three.gl.domElement.removeEventListener("pointerdown", discardPopup);
    };
  }, [setCurrentSelectedMyRoomObject, three.gl.domElement]);

  if (object.name.includes("my-room-skill"))
    return (
      <MyRoomPlacedSkillBox
        key={object.name}
        placedMyRoomSkill={{
          position: object.position,
          name: `skill-${object.name.split("-")[3]}`,
        }}
      />
    );

  if (object.name.includes("my-room-furniture"))
    return (
      <MyRoomPlacedFurniture
        key={object.name}
        placedMyRoomFurniture={{
          position: object.position,
          rotation: object.rotation,
          name: `furniture-${object.name.split("-")[3]}`,
        }}
      />
    );
  if (object.name.includes("my-room-memo")) {
    return (
      <MyRoomPlacedMemo
        key={object.name}
        placedMyRoomMemo={{
          authorNickname: object.authorNickname ?? "",
          position: object.position,
          rotation: object.rotation,
          text: object.text ?? "",
          timestamp: object.timestamp ?? "",
        }}
      />
    );
  }
  return null;
};
