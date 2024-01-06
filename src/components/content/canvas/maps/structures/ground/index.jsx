import { Floor } from "./elements/Floor";
import { Swing } from "./elements/Swing";
import { JungleGym } from "./elements/JungleGym";
import { Tree } from "./elements/Tree";
import { PineTrees } from "./elements/PineTrees";
import { Dinosaur } from "./elements/npc/Dinosaur";
import { Zombie } from "./elements/npc/Zombie";
import { ShibaInu } from "./elements/npc/ShibaInu";
import { WoodChest } from "./elements/WoodChest";
import { Key } from "./elements/Key";
import { Steak } from "./elements/Steak";

export const GroundElements = () => {
  return (
    <>
      <Floor />

      <Dinosaur />
      <Zombie />
      <ShibaInu />

      <Tree position={[-9, 0, -8]} />
      <Tree position={[10, 0, -10]} />
      <Tree position={[-3, 0, 20]} />
      <Tree position={[-8, 0, 22]} />

      <PineTrees position={[-30, 0, -30]} />

      <PineTrees position={[-20, 0, -30]} />

      <PineTrees position={[-30, 0, -20]} />
      <PineTrees position={[-20, 0, -20]} />

      <WoodChest />
      <Key />
      <Steak />

      <Swing />
      <JungleGym />
    </>
  );
};
