import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

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
import RegionPage from './pages/RegionPage';
import MarketPage from './pages/MarketPage';
import CreateArticlePage from './pages/CreateArticlePage';
import ArticlePage from './pages/ArticlePage';
import CreateNewspaperPage from './pages/CreateNewspaperPage';
import NewspaperPage from './pages/NewspaperPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import NewspaperStaffPage from './pages/NewspaperStaffPage';
import SettingsPage from './pages/SettingsPage';
import CreateJobPage from './pages/CreateJobPage';
import BusinessPage from './pages/BusinessPage';
import PartyPage from './pages/PartyPage';
import WarsPage from './pages/WarsPage';
import EditArticlePage from './pages/EditArticlePage';

import { loadResources, setLoading } from './redux/app/actions';

function App ({ resources, loadResources, loading, setLoading }) {
  useEffect(() => {
    if (resources.length !== 0) {
      return;
    }

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/api/resources`,
    }).then((response) => {
      loadResources(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  });


  return <div className="App">
    <BrowserRouter>
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
          path="/article/:id"
          exact
          element={<GuardedPage element={<ArticlePage />} />}
        />
        <Route
          path="/article/create"
          exact
          element={<GuardedPage element={<CreateArticlePage />} />}
        />
        <Route
          path="/article/edit"
          exact
          element={<GuardedPage element={<EditArticlePage />} />}
        />
        <Route
          path="/world"
          exact
          element={<GuardedPage element={<WorldMapPage />} />}
        />
        <Route
          path="/overview"
          exact
          element={<GuardedPage element={<HomePage />} />}
        />
        <Route
          path="/wars"
          exact
          element={<GuardedPage element={<WarsPage />} />}
        />
        <Route
          path="/user/:id"
          exact
          element={<GuardedPage element={<ProfilePage />} />}
        />
        <Route
          path="/region/:id"
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
          element={<GuardedPage element={<PartyPage />} />}
        />
        <Route
          path="/job"
          exact
          element={<GuardedPage element={<JobPage />} />}
        />
        <Route
          path="/job/create"
          exact
          element={<GuardedPage element={<CreateJobPage />} />}
        />
        <Route
          path="/settings"
          exact
          element={<GuardedPage element={<SettingsPage />} />}
        />
        <Route
          path="/business/:id"
          exact
          element={<GuardedPage element={<BusinessPage />} />}
        />
        <Route
          path="*"
          exact
          element={<GuardedPage element={<RedirectPage />} />}
        />
      </Routes>
    </BrowserRouter>
  </div>;
}

const mapDispatchToProps = {
  loadResources,
  setLoading
};

const mapStateToProps = state => {
  return {
    resources: state.app.resourcesList,
    loading: state.app.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
