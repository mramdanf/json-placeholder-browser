import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import UserList from './components/user/UserList'
// import PostList from './components/post/PostList'
import PostCard from './components/post/PostCard'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={UserList} />
          <Route path='/user-posts/:id' component={PostCard} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;