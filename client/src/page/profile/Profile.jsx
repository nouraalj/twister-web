import React from 'react'
import "./profile.css"
import PP from "../../images/profilepicture.jpg"
import Twists from '../../components/Twists/Twists'
import { createBrowserRouter, Link } from 'react-router-dom'
import FriendList from '../../components/FriendList/FriendList'

const Profile = () => {
  const router = createBrowserRouter([
    {
      path:"/follows",
      element: <FriendList/>
    },
  ]);
  return (
    <div className='contenu5'>
    <div className='profil'>
      <div className="imagesProfil">
        <img src="https://cdn.futura-sciences.com/buildsv6/wallpaper/2367_1024x768_6A8C9.jpg" alt="" className='bannière'/>
        <img src={PP} alt="" className='photoProfil'/>
      </div>
      <div className="contenuProfil">
        <div className="uInfo">
         <span>Noura Aljane</span>
         <button>Suivre</button>
        </div>
        <div className="uBioStats">
          <p>Bio</p>
         <span>10 Abonnés</span>
         <Link to="/follows" style={{textDecoration:"none"}}><span>10 Abonnement</span></Link>

        </div>
      </div>
    </div>
      <Twists/>
    </div>
  )
}

export default Profile