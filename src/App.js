import { BrowserRouter, Routes, Route } from "react-router-dom"
import { connect } from "react-redux";

import "./style.scss";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import HomePage from "./pages/HomePage"
import DefaultPage from "./pages/DefaultPage";
import NewsPage from "./pages/NewsPage";
import WorldMapPage from "./pages/WorldMapPage";
import ProfilePage from "./pages/ProfilePage";
import RedirectPage from "./pages/RedirectPage";
import JobPage from "./pages/JobPage";

/*
  DefaultRoute has auth guard implemented in useEffect
*/

function App() {
  return <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" exact element={<SignIn></SignIn>}></Route>
        <Route path="/sign-up" exact element={<SignUp></SignUp>}></Route>
        <Route path="/news" exact element={<DefaultPage element={<NewsPage></NewsPage>}></DefaultPage>}></Route>
        <Route path="/world" exact element={<DefaultPage element={<WorldMapPage></WorldMapPage>}></DefaultPage>}></Route>
        <Route path="/home" exact element={<DefaultPage element={<HomePage></HomePage>}></DefaultPage>}></Route>
        <Route path="/wars" exact element={<DefaultPage element={<HomePage></HomePage>}></DefaultPage>}></Route>
        <Route path="/profile" exact element={<DefaultPage element={<ProfilePage></ProfilePage>}></DefaultPage>}></Route>
        <Route path="/region" exact element={<DefaultPage element={<NewsPage></NewsPage>}></DefaultPage>}></Route>
        <Route path="/job" exact element={<DefaultPage element={<JobPage></JobPage>}></DefaultPage>}></Route>
        <Route path="*" exact element={<RedirectPage></RedirectPage>}></Route>
      </Routes>
    </BrowserRouter>
  </div>
}

export default connect(null, null)(App);
