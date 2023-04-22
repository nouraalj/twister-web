import React, { useContext } from 'react'
import "./leftbar.css"
import Friends from "../../images/amis.png"
import Notifications from "../../images/cloche.png"
import Liked from "../../images/liked.png"
import Home from "../../images/accueil.png"
import PP from "../../images/profilepicture.jpg"
import { AuthContext } from '../Authentification'
const LeftBar = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    <div className='leftbar'>
      <div className='contenu'>
        <div className="menu">
          
          <div className="user">
            <img src={currentUser.profilePic} alt=""/>
            <span>{currentUser.name}</span>
          </div>

          <div className="utilities">
            <img src={Home} alt="" />
            <span>Home</span>
          </div>

          <div className="utilities">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>

          <div className="utilities">
            <img src={Notifications} alt="" />
            <span>Notifications</span>
          </div>

          <div className="utilities">
            <img src={Liked} alt="" />
            <span>Liked</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftBar