import { MyRoomPlacedFurniture } from "./MyRoomPlacedFurniture";
import { MyRoomPlacedSkillBox } from "./MyRoomPlacedSkillBox";

export const MyRoomElements = ({ object }) => {
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
  return null;
};
