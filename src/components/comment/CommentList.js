import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd';
import CommentCard from './CommentCard'
import { getPostComments, deleteComment } from '../../store/actions/commentActions'

export class UnconnectedCommentList extends React.Component {
  componentDidMount() {
    this.props.getPostComments(this.props.postId)
  }
  handleDeleteCommentClick = (commentId) => {
    this.props.deleteComment(commentId)
  }
  render() {
    return (
      <div data-test="component-comment-list">
        { this.props.comments && this.props.comments.map(comment => (
          <CommentCard 
            data-test="comment-card"
            comment={comment}
            deleteComment={this.handleDeleteCommentClick}
            key={comment.id}
          />
        )) }
      </div>
    )
  }
}

UnconnectedCommentList.propTypes = {
  postId: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => {
  return {
    comments: state.comment.commentList
  }
}

export default connect(mapStateToProps, { deleteComment, getPostComments })(UnconnectedCommentList)