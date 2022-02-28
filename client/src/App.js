import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Error from "./pages/Error";
import SignIn from "./pages/SignIn";
import Oauth from "./pages/Oauth";
import MyPage from "./pages/MyPage";
import Activities from "./pages/Activities";
import Alarm from "./pages/Alarm";
// import Ranking from "./pages/Ranking";
import Forum from "./pages/Forum";
import CreateDebate from "./pages/CreateDebate";
import EditDebate from "./pages/EditDebate";
import Debate from "./pages/Debate";
import DebateRoom from "./pages/DebateRoom";
import Community from "./pages/Community";
import CreateColumn from "./pages/CreateColumn";
import EditColumn from "./pages/EditColumn";
import Column from "./pages/Column";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/oauth/kakao" element={<Oauth />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/activities/:username" element={<Activities />} />
        <Route path="/alarm" element={<Alarm />} />
        {/* <Route path="/ranking" element={<Ranking />} /> */}
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/create" element={<CreateDebate />} />
        <Route path="/forum/edit/:debateId" element={<EditDebate />} />
        <Route path="/forum/debate/:debateId" element={<Debate />} />
        <Route path="/forum/debateroom/:debateId" element={<DebateRoom />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/create" element={<CreateColumn />} />
        <Route path="/community/edit/:columnId" element={<EditColumn />} />
        <Route path="/community/column/:columnId" element={<Column />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
