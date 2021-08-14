import Avatar from './Avatar'
import React from 'react'
import './Sidebar.css'
import { SidebarData } from './SidebarData'

function Sidebar() {
    return (
        <div className="sidebar">
            <Avatar/>
            <hr className="linesep"/>
            <ul className="sidebarlist">
            {SidebarData.map((val,key) => {
                return <li key={key} onClick={() => {window.location.pathname= val.link}}  id={window.location.pathname === val.link ? "active" : ""} className="row">
                    <div id="icon">{val.icon}</div>
                    <div id="title">{val.title}</div>
                </li>
            })}
            </ul>
        </div>
    )
}

export default Sidebar