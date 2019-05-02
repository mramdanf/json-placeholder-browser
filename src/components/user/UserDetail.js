import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

const UserDetailComponent = (props) => {
	return (
		<div data-test="component-user-detail">
			<div data-test="user-fullname">
				<Icon type="user" /> {props.fullName}
			</div>
			<div data-test="user-email">
				<Icon type="mail" /> {props.email}
			</div>
			<div data-test="user-phone">
				<Icon type="phone" /> {props.phone}
			</div>
		</div>
	)
}

UserDetailComponent.propTypes = {
	fullName: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	phone: PropTypes.string.isRequired,
}

export default UserDetailComponent