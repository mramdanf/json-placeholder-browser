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
        style={
          this.props.albumList 
            ? { background: '#ECECEC', padding: '30px' }
            : { padding: '30px' }
        }
      >
        <h1 style={{ padding: 20 }}>Album List</h1>
        <Row type="flex" gutter={16}>
          { this.props.albumList && this.props.albumList.map(album => (
            <Col 
              span={8} 
              key={album.id}
              style={{ padding: 10 }}
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
