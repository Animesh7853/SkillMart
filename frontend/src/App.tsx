import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import MarketPlace from "./pages/MarketPlace";
import PostRequestSkill from "./pages/PostRequstSkillPage";
import MySkills from "./pages/MySkills";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/post-request skill" element={<PostRequestSkill />} />
        <Route path="/skills" element={<MySkills />} />
      </Routes>
    </Router>
  );
}

export default App;
