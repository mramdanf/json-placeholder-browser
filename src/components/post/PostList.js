import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

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
        <Row gutter={16}>
          { this.props.postList && this.props.postList.map(post => (
            <Col 
              span={8} 
              key={post.id}
            >
              <PostCard 
                post={post}
                author={"Ramdan"}
                commentsCount={10}
                data-test="post-card"
              />
            </Col>
          )) }
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