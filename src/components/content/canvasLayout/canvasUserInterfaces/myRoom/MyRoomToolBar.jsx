import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  CurrentPlacingMyRoomSkillAtom,
  CurrentMyRoomPlayerAtom,
  MeAtom,
  CurrentPlacingMyRoomFurnitureAtom,
} from "../../../../../store/PlayersAtom";
const skills = [
  "skill-html",
  "skill-css",
  "skill-javascript",
  "skill-typescript",
  "skill-react",
  "skill-next",
  "skill-threejs",
  "skill-node",
  "skill-pixi",
  "skill-nestjs",
  "skill-python",
  "skill-aws",
  "skill-django",
  "skill-flutter",
  "skill-go",
  "skill-graphql",
  "skill-kotlin",
  "skill-mongodb",
  "skill-mysql",
  "skill-swift",
];

// 가구 배치
const furnitures = [
  "furniture-bed",
  "furniture-bookcase",
  "furniture-chair",
  "furniture-coatRack",
  "furniture-couch",
  "furniture-gamingComputer",
  "furniture-officeChair",
  "furniture-standingDesk",
];

export const MyRoomToolBar = () => {
  const [openedDropdownIndex, setOpenedDropdownIndex] = useState();
  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);
  const me = useRecoilValue(MeAtom);
  const [, setCurrentPlacingMyRoomSkill] = useRecoilState(
    CurrentPlacingMyRoomSkillAtom
  );
  const [, setCurrentPlacingMyRoomFurniture] = useRecoilState(
    CurrentPlacingMyRoomFurnitureAtom
  );

  return (
    <>
      <MyRoomToolBarWrapper>
        {currentMyRoomPlayer?.id === me?.id && (
          <>
            {["스택배치", "가구배치"].map((item, idx) => {
              return (
                <ToolBarBtn
                  key={item}
                  onClick={() => {
                    setOpenedDropdownIndex((prev) => {
                      if (prev === idx) {
                        return undefined;
                      }
                      return idx;
                    });
                  }}
                >
                  {item}
                </ToolBarBtn>
              );
            })}
            {openedDropdownIndex === 0 && (
              <ToolBarBtnDropdown>
                {skills.map((skill) => (
                  <ToolBarDropdownItem
                    key={skill}
                    onClick={() => {
                      setCurrentPlacingMyRoomSkill((prev) => {
                        if (prev === skill) return undefined;
                        return skill;
                      });
                      setOpenedDropdownIndex(undefined);
                    }}
                    src={`/images/skills/${skill}.webp`}
                  ></ToolBarDropdownItem>
                ))}
              </ToolBarBtnDropdown>
            )}
            {openedDropdownIndex === 1 && (
              <ToolBarBtnDropdown>
                {furnitures.map((furniture) => (
                  <ToolBarDropdownItem
                    key={furniture}
                    onClick={() => {
                      setCurrentPlacingMyRoomFurniture((prev) => {
                        if (prev === furniture) return undefined;
                        return furniture;
                      });
                      setOpenedDropdownIndex(undefined);
                    }}
                    src={`/images/furnitures/${furniture}.png`}
                  ></ToolBarDropdownItem>
                ))}
              </ToolBarBtnDropdown>
            )}
          </>
        )}
      </MyRoomToolBarWrapper>
    </>
  );
};

const MyRoomToolBarWrapper = styled.div`
  position: fixed;
  top: 40px;
  left: 50%;
  min-height: 80px;
  transform: translateX(-50%);
  background-color: #ffffffee;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
`;

const ToolBarBtn = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f0f9ff;
  border-radius: 10px;
  transition: 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #3f97cd;
    color: #ffffff;
  }
`;

const ToolBarBtnDropdown = styled.div`
  position: fixed;
  left: 0;
  top: 80px;
  width: 200px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  gap: 5px;
`;

const ToolBarDropdownItem = styled.div`
  background-color: #eeeeee;
  width: 100%;
  height: 46px;
  background-image: ${(props) => `url(${props.src})`};
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  font-size: 20px;
  gap: 10px;
  position: relative;
`;

const MemoFormPropdown = styled.div`
  position: fixed;
  top: 120px;
  left: 0;
  width: 100%;
  height: 200px;
  box-shadow: 1px 1px 4px 4px #cccccc;
  textarea {
    width: 100%;
    height: 100%;
    background-color: yellow;
    outline: none;
    border: none;
    resize: none;
    font-size: 18px;
  }
  &.visible {
    display: flex;
  }
  &.invisible {
    display: none;
  }
`;

const MemoSubmitBtn = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  border-width: 1px;
  outline: none;
  font-size: 18px;
  padding: 10px;
  background-color: #f0f9ff;
  cursor: pointer;
  &:hover {
    background-color: #3f97cd;
    color: #ffffff;
  }
`;
