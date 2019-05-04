import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'antd'
import { Button } from 'antd/lib/radio';
import { withRouter } from 'react-router-dom'

export class NonHocCommentCard extends React.Component {
  render() {
    return (
      <Card data-test="component-comment-card">
        <Row>
          <Col
            data-test="comment-name"
            span={8}
          >
            {this.props.comment.name}
          </Col>
          <Col
            data-test="comment-email"
            span={8}
            offset={8}
          >
            {this.props.comment.email}
          </Col>
        </Row>
        <Row>
          <Col data-test="comment-body">
            {this.props.comment.body}
          </Col>
        </Row>
        <Row type="flex" justify="end">
          <Col span={4}>
            <Button 
              data-test="edit-comment-button"
              type="primary"
              onClick={
                () => {
                  this.props.history.push(`/edit-comment/${this.props.comment.id}`)
                }
              }
            >Edit</Button>
          </Col>
          <Col span={4}>
            <Button 
              data-test="delete-comment-button"
              type="danger"
              onClick={
                () => {
                  this.props.deleteComment(this.props.comment.id)
                }
              }
            >Delete</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

NonHocCommentCard.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  deleteComment: PropTypes.func,
}

export default withRouter(NonHocCommentCard)