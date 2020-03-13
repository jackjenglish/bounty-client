import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import TopBar from './containers/TopBar';
import FeedPage from './components/FeedPage/FeedPage';
import ReportPage from './components/ReportPage/ReportPage';
import PostPageContainer from './containers/PostPageContainer';
import CreatePostPage from './containers/CreatePostPage';
import styles from './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LoginPageContainer from './containers/LoginPageContainer';
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
                <Route path="/post" component={CreatePostPage} />
                <Route path="/reports" component={ReportPage} />
                <Route exact path="/" component={FeedPage} />
                <Route exact path="/login" component={LoginPageContainer} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
