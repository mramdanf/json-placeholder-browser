import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import UserList from './components/user/UserList'
import PostList from './components/post/PostList'
import AlbumList from './components/album/AlbumList'
import PhotoList from './components/photo/PhotoList'
import PhotoDetail from './components/photo/PhotoDetail'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={UserList} />
          <Route path='/user-posts/:id' component={PostList} />
          <Route path='/user-albums/:id' component={AlbumList} />
          <Route path='/album-photos/:id' component={PhotoList} />
          <Route path='/photo-detail/:id' component={PhotoDetail} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;