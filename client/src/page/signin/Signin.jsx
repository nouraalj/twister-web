import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../images/logo2.png"
import axios from "axios";

import "./signin.css"
const Signin = () => {
  return (
    <div class="container2">
        <div class="box box-one">
            <i class="fab fa-twitter"><img src={Logo}/></i>
            <p id="titre">Rejoignez Twister</p>
          </div>
        <div class="box box-two">
            <form>
                <input type="text" placeholder="Nom et Prénom"/>
                <input type="text" placeholder="Pseudo"/>
                <input type="password" placeholder="Mot de passe"/>
                <input id="verif" name="verif" type="password" placeholder="Vérifier le mot de passe"/>
            </form>
            <button class="next-btn">Suivant</button>
        </div>
        <p>Vous avez déjà un compte ? <a href="/login" onClick={() => {window.location.href="/login"}}>Connectez vous</a></p>
    </div>
    
  )
}

export default Signin