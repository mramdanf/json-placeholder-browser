import React from 'react'
import { connect } from 'react-redux'
import { getPhotoDetail } from '../../store/actions/photoActions'

export class UnconnectedPhotoDetail extends React.Component {
  componentDidMount() {
    this.props.getPhotoDetail(this.props.match.params.id)
  }
  render() {
    return this.props.photo 
    ? (
      <div data-test="component-photo-detail">
        <img 
          alt={this.props.photo.title}
          data-test="photo"
          src={this.props.photo.url}
        />
        <h3 data-test="photo-title">{this.props.photo.title}</h3>
      </div>
    )
    : (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    photo: state.photo.photoDetail
  }
}

export default connect(mapStateToProps, { getPhotoDetail })(UnconnectedPhotoDetail)