import React from "react";
import { connect } from "react-redux";


class UserHeader extends React.Component {
    render() {
        if(!this.props.user) {
            return null 
        }
        return (
            <div className="header">{this.props.user.name}</div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const user = state.users.find((user) => {
        return user.id === ownProps.userId;
    })
    return {
        user: user
    }
}

export default connect(mapStateToProps)(UserHeader);