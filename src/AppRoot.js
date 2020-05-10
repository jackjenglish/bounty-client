import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import TopBar from './containers/TopBar';
import FeedPageContainer from './containers/FeedPageContainer';
import PostPageContainer from './containers/PostPageContainer';
import NewPostPageContainer from './containers/NewPostPageContainer';
import styles from './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AboutPage from './containers/AboutPage';
import AboutPage2 from './components/AboutPage/AboutPage';
import LoginPage from './components/LoginPage/LoginPage';
import ProfilePageContainer from './containers/ProfilePageContainer';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheckSquare,
  faCheck,
  faCoffee,
  faArrowUp,
  faArrowDown,
  faSortUp,
  faAngleUp,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import ReportPageContainer from './containers/ReportPageContainer';

library.add(
  faCheckSquare,
  faCheck,
  faCoffee,
  faArrowDown,
  faArrowUp,
  faSortUp,
  faAngleUp,
  faAngleDown
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className={styles.appRoot}>
            <TopBar />
            <div className="pt-4">
              <Switch>
                <Route path="/post/:id" component={PostPageContainer} />
                <Route path="/profile/:id" component={ProfilePageContainer} />
                <Route path="/post" component={NewPostPageContainer} />
                <Route path="/reports" component={ReportPageContainer} />
                <Route exact path="/" component={FeedPageContainer} />
                {/* <Route exact path="/about" component={AboutPage} /> */}
                <Route exact path="/about" component={AboutPage2} />
                <Route exact path="/login" component={LoginPage} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
