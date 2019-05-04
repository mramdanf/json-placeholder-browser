import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Button, Icon } from 'antd'
import { withRouter } from 'react-router-dom'

export class NonHocCommentCard extends React.Component {
  render() {
    return (
      <Card data-test="component-comment-card">
        <Row>
          <Col span={8}>
            <h3 data-test="comment-name">
              <Icon type="user" /> {this.props.comment.name}
            </h3>
          </Col>
          <Col
            data-test="comment-email"
            span={8}
            offset={8}
          >
            <h4><Icon type="mail" /> {this.props.comment.email}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <p data-test="comment-body">{this.props.comment.body}</p>
          </Col>
        </Row>
        <Row>
          <Col span={1} style={{ marginRight: 10 }}>
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
          <Col span={1}>
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