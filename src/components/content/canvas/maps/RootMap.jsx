import React from "react";
import { GroundElements } from "./structures/ground";
import { useRecoilState } from "recoil";
import { CharacterSelectFinishedAtom } from "../../../../store/PlayersAtom";
import { CharacterInit } from "../../lobby/CharacterInit";

export const RootMap = () => {
  const [characterSelectFinished] = useRecoilState(CharacterSelectFinishedAtom);
  return (
    <>{!characterSelectFinished ? <CharacterInit /> : <GroundElements />}</>
  );
};
