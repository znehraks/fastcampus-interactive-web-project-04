import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CurrentMapAtom,
  CurrentMyRoomPlayerAtom,
  IsLoadCompletedAtom,
  MeAtom,
} from "../../../store/PlayersAtom";
import { SideBar } from "./canvasUserInterfaces/common/SideBar";
import styled from "styled-components";
import { Minimap } from "./canvasUserInterfaces/ground/Minimap";
import { ChatArea } from "./canvasUserInterfaces/common/ChatArea";
import { Notice } from "./canvasUserInterfaces/common/Notice";
import { Footer } from "./canvasUserInterfaces/common/Footer";
import { Popup } from "./canvasUserInterfaces/ground/Popup";

export const CanvasLayout = ({ children }) => {
  const [isLoadCompleted] = useRecoilState(IsLoadCompletedAtom);
  const currentMap = useRecoilValue(CurrentMapAtom);
  const [currentMyRoomPlayer] = useRecoilState(CurrentMyRoomPlayerAtom);
  const me = useRecoilValue(MeAtom);

  return (
    <Wrapper>
      {children}
      {isLoadCompleted && (
        <>
          <Notice />
          <SideBar />
          <Minimap />
          {currentMap !== "MINI_GAME" && <ChatArea />}
          {currentMap === "GROUND" && (
            <>
              {currentMyRoomPlayer && me?.id !== currentMyRoomPlayer?.id && (
                <Popup />
              )}
            </>
          )}
        </>
      )}
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
`;
