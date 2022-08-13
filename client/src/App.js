import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Detail from "./pages/detail";
import Home from "./pages/home";
import MyPokemons from "./pages/myPokemons";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/my-pokemon" element={<MyPokemons />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
