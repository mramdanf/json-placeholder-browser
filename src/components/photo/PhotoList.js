import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import PhotoCard from './PhotoCard'
import { getAlbumPhotos } from '../../store/actions/photoActions'

export class UnconnectedPhotoList extends React.Component {
  componentDidMount() {
    this.props.getAlbumPhotos(this.props.match.params.id)
  }
  render() {
    return (
      <div
        data-test="component-photo-list"
        style={
          this.props.photoList 
            ? { background: '#ECECEC', padding: '30px' }
            : { padding: '30px' }
        }
      >
        <h1 style={{ marginBottom: 20 }}>Photo List</h1>
        <Row type="flex" gutter={16}>
          { this.props.photoList && this.props.photoList.map(photo => (
            <Col 
              span={8} 
              key={photo.id}
              style={{ marginBottom: 10 }}
            >
              <PhotoCard
                data-test="photo-card"
                photo={photo}
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
    photoList: state.photo.photoList
  }
}

export default connect(mapStateToProps, { getAlbumPhotos })(UnconnectedPhotoList)