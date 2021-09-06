import React from 'react'
import UserSidebar from './UserSidebar'
import './User.css'
import SearchBar from './SearchBar'
import Cards from './Cards'
function User() {
    const json = localStorage.getItem("user");
    const userID = JSON.parse(json);
  
    return (
        <>
        <UserSidebar image={userID.idimg}/>
        <div className="position">
        <div className="pagetitle">
             <h3>Dashboard</h3>
            </div>
            <SearchBar/>
            <br/><br/>
            <Cards location="Location 1" temperature="57" humidity="27" moisture="09"/>
            <Cards location="Location 2" temperature="31.5" humidity="20" moisture="12"/>
        </div>
        </>
    )
}

export default User
