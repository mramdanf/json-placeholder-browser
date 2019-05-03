import React from 'react'
import PropTypes from 'prop-types'
import { Card, Icon, Tooltip } from 'antd'
import { withRouter } from 'react-router-dom'

export class NonHocPostCard extends React.Component {
  handleViewDetailPostClick = () => {
    this.props.history.push(`post-detail/${this.props.post.id}`)
  }
  handleDeletePostClick = () => {
    this.props.deletePost(this.props.post.id)
  }
  render() {
    return (
      <Card 
        data-test="component-post-card"
        style={{ width: 300 }}
        actions={
          [
            <Tooltip 
              placement="top" 
              title="View Detail"
            >
              <Icon 
                type="eye" 
                data-test="view-detail-post-button"
                onClick={this.handleViewDetailPostClick}
              />
            </Tooltip>,
            <Tooltip 
              placement="top" 
              title="Delete Post"
            >
              <Icon 
                type="eye" 
                data-test="delete-post-button"
                onClick={this.handleDeletePostClick}
              />
            </Tooltip>,
          ]
        }
      >
        <h5 data-test="post-title">{this.props.post.title}</h5>
        <span data-test="post-author">{this.props.author}</span>
        <span data-test="post-comments-count">{this.props.commentsCount}</span>
        <p data-test="post-body">{this.props.post.body}</p>
      </Card>
    )
  }
}

NonHocPostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
  author: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired,
  deletePost: PropTypes.func,
}

export default withRouter(NonHocPostCard)