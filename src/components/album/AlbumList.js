import React from 'react'
import { Row, Col } from 'antd';
import { connect } from 'react-redux'
import AlbumCard from './AlbumCard'
import { getUserAlbums } from '../../store/actions/albumActions'

export class UnconnectedAlbumList extends React.Component {
  componentDidMount() {
    this.props.getUserAlbums(this.props.match.params.id)
  }
  render() {
    return (
      <div
        data-test="component-album-list"
        style={{ background: '#ECECEC', padding: '30px' }}
      >
        <Row gutter={16}>
          { this.props.albumList && this.props.albumList.map(album => (
            <Col 
              span={8} 
              key={album.id}
            >
              <AlbumCard
                data-test="album-card"
                album={album}
              />
            </Col>
          )) }
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    albumList: state.album.albumList
  }
}

export default connect(mapStateToProps, { getUserAlbums })(UnconnectedAlbumList)
