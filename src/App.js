import React from 'react';
import { render } from 'react-dom';
import AppRoot from './AppRoot';
import { getPosts } from './actions/feedActions';
import store from './store';

class App {
  start() {
    // Startup api requests
    // .then
    //
    // console.log('start');
    //store.dispatch(getPosts());

    this.startRouter();
  }

  startRouter() {
    render(<AppRoot />, document.getElementById('bounty-app'));
  }
}

export default App;
