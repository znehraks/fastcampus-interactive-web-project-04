import { CurrentSelectedMemoAtom } from "../../../../../../../store/PlayersAtom";
import { myRoomMemoBoxSize } from "../../../../../../../data/constants";
import { useRecoilState } from "recoil";

export const MyRoomPlacedMemo = ({ placedMyRoomMemo }) => {
  const [, setCurrentSelectedMemo] = useRecoilState(CurrentSelectedMemoAtom);
  return (
    <mesh
      castShadow
      receiveShadow
      name={`my-room-memo-${placedMyRoomMemo.authorNickname}-${placedMyRoomMemo.timestamp}`}
      position={placedMyRoomMemo.position}
      rotation={placedMyRoomMemo.rotation}
      userData={{
        text: placedMyRoomMemo.text,
        authorNickname: placedMyRoomMemo.authorNickname,
        timestamp: placedMyRoomMemo.timestamp,
      }}
      onClick={() => {
        setCurrentSelectedMemo({ ...placedMyRoomMemo });
      }}
    >
      <boxGeometry
        args={[
          myRoomMemoBoxSize[0],
          myRoomMemoBoxSize[1],
          myRoomMemoBoxSize[2],
        ]}
      />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
};
