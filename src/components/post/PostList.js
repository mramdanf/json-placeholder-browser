import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'antd'

import PostCard from './PostCard'
import { getUserPosts } from '../../store/actions/postActions'

export class UnConnectedPostList extends React.Component {
  componentDidMount() {
    this.props.getUserPosts(this.props.match.params.id)
  }
  render() {
    return (
      <div 
        data-test="component-post-list"
        style={{ background: '#ECECEC', padding: '30px' }}
      >
        <Row gutter={16} style={{ marginBottom: 20 }}>
          { this.props.postList && this.props.postList.map(post => (
            <Col 
              span={8} 
              key={post.id}
            >
              <PostCard 
                post={post}
                data-test="post-card"
              />
            </Col>
          )) }
        </Row>
        <Row>
          <Col>
            <Button 
              type="primary"
              data-test="add-post-button"
              onClick={
                () => { this.props.history.push('/add-post') }
              }
            >
              Add Post
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    postList: state.post.postList
  }
}

export default connect(mapStateToProps, { getUserPosts })(UnConnectedPostList)