import React, {useEffect, useState } from 'react';
import { Component } from "react";
import NavigationPanel from './NavigationPanel';
import Signin from "./Signin"

function MainPage (props) {
    const [isConnected, setConnected] = useState(true);
    const [page, setPage] = useState("signin_page");
    const getConnected = () =>{
        setConnected(true);
        setPage("message_page");
    }
    const setLogout = () =>{
        setConnected(false)
        setPage("signin_page");
    }
    return (
        <div>
            {
            page=="signin_page" ?  <Signin/> : 
            <NavigationPanel login={getConnected} logout={setLogout} isConnected={isConnected} />}
        </div>
  )
}

export default MainPage