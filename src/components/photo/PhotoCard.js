import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, Tooltip, Icon } from 'antd';

export class NonHocPhotoCard extends React.Component {
  handleViewPhotoDetailClick = () => {
    this.props.history.push(`photo-detail/${this.props.photo.id}`)
  }
  render() {
    return (
      <Card
        data-test="component-photo-card"
        style={{ width: 300 }}
        cover={
          <img 
            alt={this.props.photo.title}
            src={this.props.photo.thumbnailUrl}
          />
        }
        actions={
          [
            <Tooltip
              placement="top"
              title="View Detail"
            >
              <Icon 
                type="eye"
                data-test="view-photo-detail"
                onClick={this.handleViewPhotoDetailClick}
              />
            </Tooltip>
          ]
        }
      >
        <h5 data-test="photo-title">{this.props.photo.title}</h5>
      </Card>
    )
  }
}

NonHocPhotoCard.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
  }).isRequired,
}

export default withRouter(NonHocPhotoCard)