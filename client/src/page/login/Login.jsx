import React from 'react';
import axios from 'axios';
import { useContext } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from '../../components/Authentification';
import Logo from "../../images/logo2.png"
import "./login.css"
const Login = () => {
  
  const {login} = useContext(AuthContext);
  const handleLogin = () => {
    login();
  };
  return (
    <div class="container">
        <div class="box box-one">
            <img alt="" src={Logo}/>
            <p id="titre">Connectez-vous à Twister</p>
          </div>
        <div class="box box-two">
            <form>
                <input type="text" placeholder="Pseudo"/>
                <div></div>
                <input type="password" placeholder="Mot de passe"/>
                <div></div>
              </form>
            <button onClick={handleLogin()} class="next-btn">Suivant</button>
        </div>
        <p>Vous n'avez pas de compte ? <a href="/signin" onClick={() => {window.location.href="/signin"}}>Inscrivez-vous</a></p>
    </div>
  )
}

export default Login