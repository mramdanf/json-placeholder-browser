import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import UserList from './components/user/UserList'
import PostList from './components/post/PostList'
import AlbumList from './components/album/AlbumList'
import PhotoList from './components/photo/PhotoList'
import PhotoDetail from './components/photo/PhotoDetail'
import PostDetail from './components/post/PostDetail'
import PostForm from './components/post/PostForm'
import CommentForm from './components/comment/CommentForm'
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
          <Route path='/post-detail/:id' component={PostDetail} />
          <Route path='/add-post' component={PostForm} />
          <Route path='/add-comment/:postId' component={CommentForm} />
          <Route path='/edit-post/:id' component={PostForm} />
          <Route path='/edit-comment/:id' component={CommentForm} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;