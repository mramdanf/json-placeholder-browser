import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'antd';
import CommenList from '../comment/CommentList'
import { getPostDetail } from '../../store/actions/postActions'

export class UnconnectedPostDetail extends React.Component {
  componentDidMount() {
    this.props.getPostDetail(this.props.match.params.id)
  }
  render() {
    return this.props.post 
    ? (
      <div data-test="component-post-detail">
        <Row>
          <Col span={12}>
            <h3 data-test="post-title">{this.props.post.title}</h3>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p data-test="post-body">{this.props.post.body}</p>
          </Col>
        </Row>

        <h4>Comments:</h4>
        <CommenList 
          data-test="post-comments" 
          postId={this.props.match.params.id}
        />

        <Row type="flex" justify="end">
          <Col span={8}>
            <Button 
              type="primary"
              data-test="edit-post-button"
            />
          </Col>
          <Col span={8}>
            <Button 
              type="default"
              data-test="add-comment-button"
            />
          </Col>
        </Row>
      </div>
    )
    : (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post.postDetail
  }
}

export default connect(mapStateToProps, { getPostDetail })(UnconnectedPostDetail)
