import React from 'react'
import PropTypes from 'prop-types'
import { Card, Icon, Tooltip } from 'antd'
import { withRouter } from 'react-router-dom'


import UserDetail from './UserDetail'
import UserAvatar from '../../images/boy.png'

export class NonHocUserCard extends React.Component {
  handleViewUserPostClick = () => {
    this.props.history.push(`user-posts/${this.props.user.id}`)
  }
  handleViewUserAlbumsClick = () => {
    this.props.history.push(`user-albums/${this.props.user.id}`)
  }
  render() {
    return (
      <Card
        data-test="component-user-card"
        style={{ width: 300 }}
        cover={
          <img 
            alt={this.props.user.name} 
            src={UserAvatar}
          />
        }
        actions={
          [
            <Tooltip 
              placement="top" 
              title="User Posts"
            >
              <Icon 
                type="file-text" 
                data-test="view-user-posts-button"
                onClick={this.handleViewUserPostClick}
              />
            </Tooltip>,
            <Tooltip 
              placement="top" 
              title="User Albums"
            >
              <Icon 
                type="picture" 
                data-test="view-user-albums-button"
                onClick={this.handleViewUserAlbumsClick}
              />
            </Tooltip>,
          ]
        }
      >
        <UserDetail 
          data-test="user-detail"
          name={this.props.user.name}
          email={this.props.user.email}
          phone={this.props.user.phone}
        />
      </Card>
    )
  }
}

NonHocUserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  })
}

export default withRouter(NonHocUserCard)