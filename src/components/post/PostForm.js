import React from 'react'
import { connect } from 'react-redux'
import {
  Form, Input, Button
} from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import { getPostDetail, addPost, editPost } from '../../store/actions/postActions'

export class UnconnectedPostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        userId: '',
        id: '',
        title: '',
        body: '',
    }
    this.inputUserIdRef = React.createRef()
  }
  componentDidMount() {
    if (this.props.match.params.id)
      this.props.getPostDetail(this.props.match.params.id)
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { post } = this.props
      this.setState({
        userId: post.userId,
        id: post.id,
        title: post.title,
        body: post.body,
      })
    }
  }
  handleInputOnChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const postId = this.props.match.params.id
    if (!postId) {
      this.props.addPost(this.state)
    }
    else {
      this.props.editPost(this.state)
    }
    this.props.history.push(`/user-posts/${this.state.userId}`)
  }
  render() {
    return (
      <Form 
        data-test="component-post-form" 
        style={{ padding: 30 }}
        onSubmit={this.handleSubmit}
      >
        <Form.Item label="User Id">
          <Input 
            type="number" 
            data-test="input-user"
            id="userId"
            onChange={this.handleInputOnChange}
            value={this.state.userId}
            ref={this.inputUserIdRef}
          />
        </Form.Item>
        <Form.Item label="Post Title">
          <Input 
            type="text" 
            data-test="input-title"
            id="title"
            onChange={this.handleInputOnChange}
            value={this.state.title}
          />
        </Form.Item>
        <Form.Item label="Post Body">
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
    post: state.post.postDetail,
  }
}

export default connect(mapStateToProps, { getPostDetail, addPost, editPost })(UnconnectedPostForm)