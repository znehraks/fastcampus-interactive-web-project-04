import { useEffect } from "react";
import { socket } from "../../sockets/clientSocket";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  AlreadyDisplayedRecentChatsAtom,
  ChatsAtom,
  EnteredPlayerNoticeAtom,
  ExitedPlayerNoticeAtom,
  MeAtom,
  PlayersAtom,
  RecentChatsAtom,
} from "../../store/PlayersAtom";
import _ from "lodash-es";

export const ClientSocketControls = () => {
  const setPlayers = useSetRecoilState(PlayersAtom);
  const [me, setMe] = useRecoilState(MeAtom);
  const [chats, setChats] = useRecoilState(ChatsAtom);
  const setRecentChats = useSetRecoilState(RecentChatsAtom);
  const alreadyDisplayedRecentChats = useRecoilValue(
    AlreadyDisplayedRecentChatsAtom
  );
  const setEnterNotice = useSetRecoilState(EnteredPlayerNoticeAtom);
  const setExitNotice = useSetRecoilState(ExitedPlayerNoticeAtom);

  useEffect(() => {
    const handleConnect = () => {
      console.info("연결됨");
    };
    const handleDisconnect = () => {
      console.info("연결이 끊김");
    };
    const handleInitialize = (value) => {
      console.log(value);
      setMe(value);
      console.info("초기화됨");
    };

    const handleEnter = (value) => {
      setEnterNotice(value);
    };

    const handleExit = (value) => {
      setExitNotice(value);
    };

    const handlePlayers = (value) => {
      setPlayers(value);
      const newMe = value.find((p) => p && me && p?.id === me?.id);
      console.log("newMe", newMe);
      if (newMe) {
        setMe(newMe);
      }
    };
    const handleNewText = ({
      senderId,
      senderNickname,
      senderJobPosition,
      text,
      timestamp,
    }) => {
      setChats((prev) => [
        ...prev,
        { senderId, senderNickname, senderJobPosition, text, timestamp },
      ]);

      const uniqRecentChats = _.uniqBy(
        [
          ...chats,
          { senderId, senderNickname, senderJobPosition, text, timestamp },
        ].reverse(),
        "senderId"
      );

      setRecentChats(
        uniqRecentChats.filter(
          (chat) =>
            !alreadyDisplayedRecentChats.some(
              (alreadyChats) =>
                alreadyChats.senderId === chat.senderId &&
                alreadyChats.timestamp === chat.timestamp
            )
        )
      );
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("initialize", handleInitialize);
    socket.on("enter", handleEnter);
    socket.on("exit", handleExit);
    socket.on("players", handlePlayers);
    socket.on("newText", handleNewText);
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("initialize", handleInitialize);
      socket.off("enter", handleEnter);
      socket.off("exit", handleExit);
      socket.off("players", handlePlayers);
      socket.off("newText", handleNewText);
    };
  }, [
    alreadyDisplayedRecentChats,
    chats,
    me,
    me?.id,
    setChats,
    setMe,
    setPlayers,
    setRecentChats,
  ]);
  return null;
};
