import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

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
        style={{ background: '#ECECEC', padding: '30px' }}
      >
        <Row gutter={16}>
          { this.props.userList && this.props.userList.map(user => (
            <Col 
              span={8} 
              key={user.id}
              data-test="user-list"
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