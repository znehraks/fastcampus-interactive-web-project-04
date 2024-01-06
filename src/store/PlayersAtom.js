import { atom } from "recoil";

// 모든 플레이어들
export const PlayersAtom = atom({
  key: "PlayersAtom",
  default: [],
});

// 내 socket 정보
export const MeAtom = atom({
  key: "MeAtom",
  default: undefined,
});

// 캐릭터 선택이 완료되었는지,
export const CharacterSelectFinishedAtom = atom({
  key: "CharacterSelectFinishedAtom",
  default: false,
});

// 현재 선택된 캐릭터 종류
export const SelectedCharacterGlbNameIndexAtom = atom({
  key: "SelectedCharacterGlbNameIndexAtom",
  default: 0,
});

// 현재 완료된 퀘스트 목록
export const PlayerCompletedQuestsAtom = atom({
  key: "PlayerQuestsAtom",
  default: [],
});

// 현재 플레이어의 인벤토리
export const PlayerInventoryAtom = atom({
  key: "PlayerInventoryAtom",
  default: [],
});
