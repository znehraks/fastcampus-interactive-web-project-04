import React from "react";
import { useRecoilState } from "recoil";
import { IsLoadCompletedAtom } from "../../../store/PlayersAtom";
import { SideBar } from "./canvasUserInterfaces/common/SideBar";
import styled from "styled-components";
import { Minimap } from "./canvasUserInterfaces/ground/Minimap";

export const CanvasLayout = ({ children }) => {
  const [isLoadCompleted] = useRecoilState(IsLoadCompletedAtom);

  return (
    <Wrapper>
      {children}
      {isLoadCompleted && (
        <>
          <SideBar />
          <Minimap />
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
