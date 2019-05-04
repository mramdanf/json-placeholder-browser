import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Spin } from 'antd'

import UserCard from './UserCard'
import { getUserList } from '../../store/actions/userActions'

export class UnconnectedUserList extends React.Component {
  componentDidMount() {
    this.props.getUserList()
  }
  render() {
    return (
      <div 
        data-test="component-user-list"
        style={
          this.props.userList 
            ? { background: '#ECECEC', padding: '30px' }
            : { padding: '30px' }
        }
      >
        <h1 style={{ marginBottom: 20 }}>User List</h1>
        { !this.props.userList 
          ? (
            <Row type="flex" justify="center">
              <Col>
                <Spin size="large" />
              </Col>
            </Row>
          )
          : null 
        }
        <Row type="flex" gutter={16}>
          { this.props.userList && this.props.userList.map(user => (
            <Col 
              span={8} 
              key={user.id}
              data-test="user-list"
              style={{ marginBottom: 10 }}
            >
              <UserCard user={user}/>
            </Col>
          )) }
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.user.userList
  }
}

const actions = {
  getUserList,
}

export default connect(mapStateToProps, actions)(UnconnectedUserList)