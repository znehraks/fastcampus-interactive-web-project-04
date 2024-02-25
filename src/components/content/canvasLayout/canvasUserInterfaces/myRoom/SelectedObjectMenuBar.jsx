import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  CurrentPlacingMyRoomFurnitureAtom,
  CurrentSelectedMyRoomObjectAtom,
} from "../../../../../store/PlayersAtom";
import styled from "styled-components";
import { useEffect, useRef } from "react";

export const SelectedObjectMenuBar = () => {
  const ref = useRef(null);

  const currentSelectedMyRoomObject = useRecoilValue(
    CurrentSelectedMyRoomObjectAtom
  );
  const setCurrentPlacingMyRoomFurniture = useSetRecoilState(
    CurrentPlacingMyRoomFurnitureAtom
  );

  useEffect(() => {
    if (!ref.current) return;
    if (!currentSelectedMyRoomObject) return;
    const {
      clientPosition: { x, y },
    } = currentSelectedMyRoomObject;
    ref.current.style.transform = `translate(${x + 80}px, ${y - 80}px)`;
  }, [currentSelectedMyRoomObject]);

  return (
    <MenuBarWrapper
      ref={ref}
      className={currentSelectedMyRoomObject ? "visible" : "invisible"}
    >
      <Menu
        onClick={() => {
          setCurrentPlacingMyRoomFurniture((prev) => {
            if (prev === currentSelectedMyRoomObject?.name) {
              return undefined;
            }
            return currentSelectedMyRoomObject?.name;
          });
        }}
      >
        <span>이동</span>
      </Menu>
    </MenuBarWrapper>
  );
};

const MenuBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  background-color: #fff;
  width: 100px;
  height: 50px;
  font-size: 18px;
  box-shadow: 2px 2px 2px 2px #eee;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  &.visible {
    display: flex;
  }
  &.invisible {
    display: none;
  }
`;

const Menu = styled.button`
  outline: none;
  border: none;
  width: 35px;
  height: 35px;
  font-size: 12px;
  background-color: #f0f9ff;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid grey;
  &:hover {
    background-color: #3f97cd;
    & > span {
      color: #ffffff;
    }
  }
`;

const RotationMenu = styled.div`
  position: absolute;
  margin-top: 10px;
  top: 35px;
  right: 10px;
  font-size: 12px;
  width: 35px;
  height: 35px;
  background-color: #f0f9ff;
  transition: 0.2s ease-in-out;
  border-radius: 8px;
  border: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #3f97cd;
  }
  &.visible {
    display: flex;
  }
  &.invisible {
    display: none;
  }
`;
