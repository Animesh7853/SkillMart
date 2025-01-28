import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import MarketPlace from "./pages/MarketPlace";
import PostRequestSkill from "./pages/PostRequstSkillPage";
import MySkills from "./pages/MySkills";
import AuthPage from "./pages/Auth";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/post-request-skill" element={<PostRequestSkill />} />
        <Route path="/skills" element={<MySkills />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
