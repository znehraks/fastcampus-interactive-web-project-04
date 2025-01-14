import { useGLTF } from "@react-three/drei";
import {
  CurrentMyRoomPlayerAtom,
  CurrentSelectedMyRoomObjectAtom,
  MeAtom,
} from "../../../../../../../store/PlayersAtom";
import { useEffect, useState } from "react";
import { Box3, Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { getClientPosition } from "../../../../../../../utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { myRoomSize } from "../../../../../../../data/constants";

// 일일이 모델링을 불러와놓고 사용하기
export const MyRoomPlacedFurniture = ({ placedMyRoomFurniture }) => {
  const me = useRecoilValue(MeAtom);
  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);
  const three = useThree();
  const [currentSelectedMyRoomObject, setCurrentSelectedMyRoomObject] =
    useRecoilState(CurrentSelectedMyRoomObjectAtom);
  const { scene } = useGLTF(`/models/${placedMyRoomFurniture.name}.glb`);
  const [outlineMeshInfo, setOutlineMeshInfo] = useState(undefined);

  useEffect(() => {
    if (currentSelectedMyRoomObject?.name === placedMyRoomFurniture.name) {
      const boundingBox = new Box3().setFromObject(scene);
      const width = boundingBox.max.x - boundingBox.min.x;
      const height = boundingBox.max.y - boundingBox.min.y;
      const depth = boundingBox.max.z - boundingBox.min.z;
      setOutlineMeshInfo({
        position: [
          placedMyRoomFurniture.position[0],
          Math.abs(height / 2) - myRoomSize / 2,
          placedMyRoomFurniture.position[2],
        ],
        width,
        height,
        depth,
      });
    } else {
      setOutlineMeshInfo(undefined);
    }
    scene.traverse((obj) => {
      obj.castShadow = true;
      obj.receiveShadow = true;
    });
  }, [
    currentSelectedMyRoomObject?.name,
    placedMyRoomFurniture.name,
    placedMyRoomFurniture.position,
    scene,
  ]);

  return (
    <>
      <primitive
        onClick={() => {
          if (me.id !== currentMyRoomPlayer?.id) return;
          const { x, y } = getClientPosition({
            position: new Vector3(
              placedMyRoomFurniture.position[0],
              placedMyRoomFurniture.position[1],
              placedMyRoomFurniture.position[2]
            ),
            camera: three.camera,
          });

          setCurrentSelectedMyRoomObject({
            name: placedMyRoomFurniture.name,
            clientPosition: { x, y },
          });
        }}
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
