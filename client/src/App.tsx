import elevenLabsLogo from "./assets/eleven-labs.svg";
import CosmonautList from "./features/cosmonaut/CosmonautList/CosmonautList";

function App() {
  return (
    <div className="main-container">
      <header className="header">
        <img src={elevenLabsLogo} alt="Eleven Labs" />
      </header>
      <CosmonautList></CosmonautList>
    </div>
  );
}

export default App;
