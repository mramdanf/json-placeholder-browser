import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Spin } from 'antd';
import CommenList from '../comment/CommentList'
import { getPostDetail } from '../../store/actions/postActions'

export class UnconnectedPostDetail extends React.Component {
  componentDidMount() {
    this.props.getPostDetail(this.props.match.params.id)
  }
  render() {
    return this.props.post 
    ? (
      <div data-test="component-post-detail" style={{ padding: 20 }}>
        <Row>
          <Col>
            <h1 data-test="post-title">{this.props.post.title}</h1>
          </Col>
        </Row>
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <h3 data-test="post-body">{this.props.post.body}</h3>
          </Col>
        </Row>

        <h3>Comments:</h3>
        <CommenList 
          data-test="post-comments" 
          postId={parseInt(this.props.match.params.id)}
        />

        <Row style={{ marginTop: 20 }}>
          <Col span={2}>
            <Button 
              type="primary"
              data-test="edit-post-button"
              onClick={
                () => {
                  this.props.history.push(`/edit-post/${this.props.match.params.id}`)
                }
              }
            >
              Edit Post
            </Button>
          </Col>
          <Col span={2}>
            <Button 
              type="default"
              data-test="add-comment-button"
              onClick={
                () => {
                  this.props.history.push(`/add-comment/${this.props.post.id}`)
                }
              }
            >
              Add Comment
            </Button>
          </Col>
        </Row>
      </div>
    )
    : (
      <Row type="flex" justify="center" style={{ padding: 30 }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post.postDetail
  }
}

export default connect(mapStateToProps, { getPostDetail })(UnconnectedPostDetail)
