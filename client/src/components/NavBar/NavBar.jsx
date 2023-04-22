import React, { useContext } from 'react'
import {
    Link
  } from "react-router-dom";
import "./navbar.css"
import PP from "../../images/profilepicture.jpg"
import Logo from "../../images/logo.png"

import { AuthContext } from '../Authentification';


const NavBar = () => {
    const {currentUser} = useContext(AuthContext);
  return (
    <div className='navbar'>
        <div className='left'>
    
            <Link to="/" style={{textDecoration:"none"}}>
                <img src={Logo}/>
            </Link>
            <div className="search">
                <input type="text" placeholder="Rechercher sur Twister  "/>
            </div>
        </div>
        <div className='right'>
            <span>Déconnexion</span>
            <div className='user'>
                <img src={currentUser.profilePic} alt=""/>
                <span>{currentUser.name}</span>
            </div>
        </div>
    </div>
  )
}


export default NavBar