import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.scss';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HomePage from './pages/HomePage';
import GuardedPage from './pages/GuardedPage';
import NewsPage from './pages/NewsPage';
import WorldMapPage from './pages/WorldMapPage';
import ProfilePage from './pages/ProfilePage';
import RedirectPage from './pages/RedirectPage';
import JobPage from './pages/JobPage';
import Headers from './components/Headers';
import RegionPage from './pages/RegionPage';
import MarketPage from './pages/MarketPage';
import CreateArticlePage from './pages/CreateArticlePage';
import ArticlePage from './pages/ArticlePage';

/*
 DefaultRoute has auth guard implemented in useEffect
 */

function App () {
  return <div className="App">
    <BrowserRouter>
      <Headers></Headers>
      <Routes>
        <Route
          path="/sign-in"
          exact
          element={
            <SignIn></SignIn>
          }>
        </Route>
        <Route
          path="/sign-up"
          exact
          element={
            <SignUp></SignUp>
          }>
        </Route>
        <Route
          path="/news"
          exact
          element={
            <GuardedPage
              hiddenLoader={true}
              element={
                <NewsPage></NewsPage>
              }>
            </GuardedPage>
          }>

        </Route>
        <Route
          path="/news/article/:id"
          exact
          element={
            <GuardedPage
              hiddenLoader={true}
              element={
                <ArticlePage></ArticlePage>
              }>
            </GuardedPage>
          }>
        </Route>
        <Route
          path="/news/article/create"
          exact
          element={
            <GuardedPage
              hiddenLoader={true}
              element={
                <CreateArticlePage></CreateArticlePage>
              }>
            </GuardedPage>
          }>
        </Route>
        <Route
          path="/world"
          exact
          element={
            <GuardedPage
              element={
                <WorldMapPage></WorldMapPage>
              }>
            </GuardedPage>
          }></Route>
        <Route path="/home" exact element={<GuardedPage element={<HomePage></HomePage>}></GuardedPage>}></Route>
        <Route path="/wars" exact element={<GuardedPage element={<MarketPage></MarketPage>}></GuardedPage>}></Route>
        <Route path="/profile" exact
               element={<GuardedPage element={<ProfilePage></ProfilePage>}></GuardedPage>}></Route>
        <Route path="/region" exact element={<GuardedPage element={<RegionPage></RegionPage>}></GuardedPage>}></Route>
        <Route path="/market" exact element={<GuardedPage element={<MarketPage></MarketPage>}></GuardedPage>}></Route>
        <Route path="/party" exact element={<GuardedPage element={<MarketPage></MarketPage>}></GuardedPage>}></Route>
        <Route path="/job" exact element={<GuardedPage element={<JobPage></JobPage>}></GuardedPage>}></Route>
        <Route path="*" exact element={<RedirectPage></RedirectPage>}></Route>
      </Routes>
    </BrowserRouter>
  </div>;
}

export default connect(null, null)(App);
