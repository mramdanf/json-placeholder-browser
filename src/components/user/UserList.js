import React from 'react'
import { Row, Col } from 'antd'
import UserCard from './UserCard'

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [
        {
          id: 1,
          fullName: "Leanne Graham",
          email: "Sincere@april.biz",
          phone: "1-770-736-8031 x56442",
        },
        {
          id: 2,
          fullName: "Ervin Howell",
          email: "Shanna@melissa.tv",
          phone: "010-692-6593 x09125",
        },
      ]
    }
  }
  render() {
    return (
      <div 
        data-test="component-user-list"
        style={{ background: '#ECECEC', padding: '30px' }}
      >
        <Row gutter={16}>
          { this.state.users && this.state.users.map(user => (
            <Col span={8}>
              <UserCard user={user}/>
            </Col>
          )) }
        </Row>
      </div>
    )
  }
}

export default UserList