import { useGLTF } from "@react-three/drei";
import {
  CurrentMyRoomPlayerAtom,
  MeAtom,
} from "../../../../../../../store/PlayersAtom";
import { useState } from "react";
import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { getClientPosition } from "../../../../../../../utils";
import { useRecoilValue } from "recoil";
import { myRoomSize } from "../../../../../../../data/constants";

// 일일이 모델링을 불러와놓고 사용하기
export const MyRoomPlacedFurniture = ({ placedMyRoomFurniture }) => {
  const me = useRecoilValue(MeAtom);
  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);
  const three = useThree();
  const { scene } = useGLTF(`/models/${placedMyRoomFurniture.name}.glb`);
  const [outlineMeshInfo, setOutlineMeshInfo] = useState(undefined);

  return (
    <>
      <primitive
        name={`my-room-${placedMyRoomFurniture.name}`}
        object={scene.clone()}
        position={placedMyRoomFurniture.position}
        rotation={placedMyRoomFurniture.rotation}
      />
      {outlineMeshInfo && (
        <mesh
          position={outlineMeshInfo.position}
          rotation={placedMyRoomFurniture.rotation}
        >
          <boxGeometry
            args={[
              outlineMeshInfo.width * 1.1,
              outlineMeshInfo.height * 1.1,
              outlineMeshInfo.depth * 1.1,
            ]}
          />
          <meshStandardMaterial transparent color={"lime"} opacity={0.4} />
        </mesh>
      )}
    </>
  );
};
