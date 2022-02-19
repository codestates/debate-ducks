import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Error from "./pages/Error";
import SignIn from "./pages/SignIn";
import UserInfo from "./pages/UserInfo";
import Activities from "./pages/Activities";
import Alarm from "./pages/Alarm";
import Ranking from "./pages/Ranking";
import Forum from "./pages/Forum";
import CreateDebate from "./pages/CreateDebate";
import EditDebate from "./pages/EditDebate";
import Debate from "./pages/Debate";
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
        <Route path="/userinfo/:userinfo" element={<UserInfo />} />
        <Route path="/activities/:userId" element={<Activities />} />
        <Route path="/alarm" element={<Alarm />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/create" element={<CreateDebate />} />
        <Route path="/forum/edit/:debateId" element={<EditDebate />} />
        <Route path="/forum/debate/:debateId" element={<Debate />} />
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
