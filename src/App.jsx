import { MainCanvas } from "./components/content/canvas/MainCanvas";
import { ClientSocketControls } from "./components/utilComponents/ClientSocketControls";
import { socket } from "./sockets/clientSocket";

function App() {
  return (
    <>
      <MainCanvas />
      <ClientSocketControls />
    </>
  );
}

export default App;
