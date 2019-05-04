import React from 'react'
import PropTypes from 'prop-types'
import { Card, Icon, Tooltip } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { deletePost } from '../../store/actions/postActions'

export class NonHocPostCard extends React.Component {
  handleViewDetailPostClick = () => {
    this.props.history.push(`/post-detail/${this.props.post.id}`)
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
                type="delete" 
                data-test="delete-post-button"
                onClick={this.handleDeletePostClick}
              />
            </Tooltip>,
          ]
        }
      >
        <h3 data-test="post-title">
          { this.props.post.title.length <= 50 
            ? this.props.post.title
            : this.props.post.title.substring(0,50) + '...'
           }
        </h3>
        <p data-test="post-body">
          { this.props.post.body.length <= 152
            ? this.props.post.body
            : this.props.post.body.substring(0,152) + '...'   
          }
        </p>
      </Card>
    )
  }
}

NonHocPostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
}

export default compose(
  withRouter,
  connect(null, { deletePost })
)(NonHocPostCard)