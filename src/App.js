import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.scss';

import SignIn from './components/AuthPage/SignIn';
import SignUp from './components/AuthPage/SignUp';
import HomePage from './pages/HomePage';
import GuardedPage from './pages/GuardedPage';
import NewsPage from './pages/NewsPage';
import WorldMapPage from './pages/WorldMapPage';
import ProfilePage from './pages/ProfilePage';
import RedirectPage from './pages/RedirectPage';
import JobPage from './pages/JobPage';
import Headers from './components/BasePage/Headers';
import RegionPage from './pages/RegionPage';
import MarketPage from './pages/MarketPage';
import CreateArticlePage from './pages/CreateArticlePage';
import ArticlePage from './pages/ArticlePage';
import CreateNewspaperPage from './pages/CreateNewspaperPage';
import NewspaperPage from './pages/NewspaperPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import UserPage from './pages/UserPage';
import NewspaperStaffPage from './pages/NewspaperStaffPage';

function App () {
  return <div className="App">
    <BrowserRouter>
      <Headers/>
      <Routes>
        <Route
          path="/sign-in"
          exact
          element={<SignIn />}
        />
        <Route
          path="/sign-up"
          exact
          element={<SignUp />} />
        <Route
          path="/news"
          exact
          element={<GuardedPage element={<NewsPage />} />}
        />
        <Route
          path="/news/subscriptions"
          exact
          element={<GuardedPage element={<SubscriptionsPage />} />}
        />
        <Route
          path="/newspaper/:id"
          exact
          element={<GuardedPage element={<NewspaperPage />} />}
        />
        <Route
          path="/newspaper/:id/staff"
          exact
          element={<GuardedPage element={<NewspaperStaffPage />} />}
        />
        <Route
          path="/newspaper/create"
          exact
          element={<GuardedPage element={<CreateNewspaperPage />} />}
        />
        <Route
          path="/news/article/:id"
          exact
          element={<GuardedPage element={<ArticlePage />} />}
        />
        <Route
          path="/news/article/create"
          exact
          element={<GuardedPage element={<CreateArticlePage />} />}
        />
        <Route
          path="/world"
          exact
          element={<GuardedPage element={<WorldMapPage />} />}
        />
        <Route
          path="/home"
          exact
          element={<GuardedPage element={<HomePage />} />}
        />
        <Route
          path="/wars"
          exact
          element={<GuardedPage element={<MarketPage />} />}
        />
        <Route
          path="/profile"
          exact
          element={<GuardedPage element={<ProfilePage />} />}
        />
        <Route
          path="/user/:id"
          exact
          element={<GuardedPage element={<UserPage />} />}
        />
        <Route
          path="/region"
          exact
          element={<GuardedPage element={<RegionPage />} />}
        />
        <Route
          path="/market"
          exact
          element={<GuardedPage element={<MarketPage />} />}
        />
        <Route
          path="/party"
          exact
          element={<GuardedPage element={<MarketPage />} />}
        />
        <Route
          path="/job"
          exact
          element={<GuardedPage element={<JobPage />} />}
        />
        <Route
          path="*"
          exact
          element={<RedirectPage />}
        />
      </Routes>
    </BrowserRouter>
  </div>;
}

export default connect(null, null)(App);
