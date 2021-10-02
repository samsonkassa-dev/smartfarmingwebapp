import React from 'react'
import './Avatar.css'

function Avatar(props) {

    return (
        <div className="boxedSidebar">
            <img className="avatarSidebar" src={props.avatarimg} alt="anime"/>
        </div>
    )
}

export default Avatar
