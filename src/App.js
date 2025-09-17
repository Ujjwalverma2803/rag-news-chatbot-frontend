// src/App.js
import "./App.css";
import Chat from "./components/Chat"; // Import your Chat component

function App() {
  return (
    <div className="App">
      {/* You can remove the default header content and just render Chat */}
      <Chat />
    </div>
  );
}

export default App;
