import React from 'react'
import Login from './Login';
import Logout from './Logout';


function NavigationPanel(props) {
  return (
    <nav id="navigation_pan">
      {(props.isConnected) ? <Logout logout={props.logout}/> : <Login login={props.login}/>}
    </nav>
  )
}

export default NavigationPanel