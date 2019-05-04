import React from 'react'
import { connect } from 'react-redux'
import {
  Form, Input, Button
} from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import { 
  getCommentDetail, addComment, editComment 
} from '../../store/actions/commentActions'

export class UnconnectedCommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        postId: '',
        id: '',
        name: '',
        email: '',
        body: '',
    }
  }
  componentDidMount() {
    if (this.props.match.params.id)
      this.props.getCommentDetail(this.props.match.params.id)
    
    const postId = this.props.match.params.postId
    if (postId)
      this.setState({ postId })
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { comment } = this.props
      this.setState({
        postId: comment.postId,
        id: comment.id,
        name: comment.name,
        email: comment.email,
        body: comment.body,
      })
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const commentId = this.props.match.params.id
    if (!commentId) {
      this.props.addComment(this.state)
    }
    else {
      this.props.editComment(this.state)
    }
    this.props.history.push(`/post-detail/${this.state.postId}`)
  }
  handleInputOnChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  render() {
    return (
      <Form 
        data-test="component-comment-form" 
        style={{ padding: 30 }}
        onSubmit={this.handleSubmit}
      >
        <Form.Item label="Name">
          <Input 
            type="text" 
            data-test="input-name"
            id="name"
            onChange={this.handleInputOnChange}
            value={this.state.name}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input 
            type="text" 
            data-test="input-email"
            id="email"
            onChange={this.handleInputOnChange}
            value={this.state.email}
          />
        </Form.Item>
        <Form.Item label="Comment Body">
          <TextArea
            type="text" 
            data-test="input-body"
            id="body"
            onChange={this.handleInputOnChange}
            value={this.state.body}
            rows={4}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          data-test="submit-button"
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comment: state.comment.commentDetail,
  }
}

export default connect(mapStateToProps, { getCommentDetail, addComment, editComment })(UnconnectedCommentForm)
