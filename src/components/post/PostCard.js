import React from 'react'
import PropTypes from 'prop-types'
import { Card, Icon, Tooltip } from 'antd'
import { withRouter } from 'react-router-dom'

export const NonHocPostCard = (props) => {
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
            />
          </Tooltip>,
          <Tooltip 
            placement="top" 
            title="Delete Post"
          >
            <Icon 
              type="eye" 
              data-test="delete-post-button"
            />
          </Tooltip>,
        ]
      }
    >
      <h5 data-test="post-title">{props.post.title}</h5>
      <span data-test="post-author">{props.author}</span>
      <span data-test="post-comments-count">{props.commentsCount}</span>
      <p data-test="post-body">{props.post.body}</p>
    </Card>
  )
}

NonHocPostCard.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
  author: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired,
}

export default withRouter(NonHocPostCard)