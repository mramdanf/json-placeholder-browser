import React from 'react'
import { Card, Tooltip, Icon } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

export class NonHocAlbumCard extends React.Component {
  handlePhotosOfAlbumClick = () => {
    this.props.history.push(`photos/${this.props.album.id}`)
  }
  render() {
    return (
      <Card
        data-test="component-album-card"
        style={{ width: 300 }}
        actions={
          [
            <Tooltip
              placement="top"
              title="View photos"
            >
              <Icon
                type="eye"
                data-test="photos-of-album"
                onClick={this.handlePhotosOfAlbumClick}
              />
            </Tooltip>
          ]
        }
      >
        <h4 data-test="album-title">{this.props.album.title}</h4>
      </Card>
    )
  }
}

NonHocAlbumCard.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired
}

export default withRouter(NonHocAlbumCard)