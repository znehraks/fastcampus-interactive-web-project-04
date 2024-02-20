import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CurrentMapAtom,
  IsLoadCompletedAtom,
} from "../../../store/PlayersAtom";
import { SideBar } from "./canvasUserInterfaces/common/SideBar";
import styled from "styled-components";
import { Minimap } from "./canvasUserInterfaces/ground/Minimap";
import { ChatArea } from "./canvasUserInterfaces/common/ChatArea";

export const CanvasLayout = ({ children }) => {
  const [isLoadCompleted] = useRecoilState(IsLoadCompletedAtom);
  const currentMap = useRecoilValue(CurrentMapAtom);

  return (
    <Wrapper>
      {children}
      {isLoadCompleted && (
        <>
          <SideBar />
          <Minimap />
          {currentMap !== "MINI_GAME" && <ChatArea />}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
`;
