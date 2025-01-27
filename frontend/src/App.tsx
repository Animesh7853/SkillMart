import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import MarketPlace from "./pages/MarketPlace";
import PostRequestSkill from "./pages/PostRequstSkillPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/post-request skill" element={<PostRequestSkill />} />
      </Routes>
    </Router>
  );
}

export default App;
