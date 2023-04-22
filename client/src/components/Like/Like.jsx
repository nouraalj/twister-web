import React, { useState } from 'react'
import "./like.css"
import coeur from "../../images/favoris.png"
import coeur2 from "../../images/favoris2.png"

const Like = () => {
  const [likes, setLikes] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    if (isClicked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsClicked(!isClicked);
  };

  return (
   <div className='likeCompo' >
    {isClicked ? (
            <img src={coeur2} width="35px" height="35px"  onClick = {handleClick} class = "heart-clicked"/>
         ) : (
            <img src={coeur} width="35px" height="35px"  onClick = {handleClick} class = "heart-clicked"/>
         )}
    
    <span> { `${likes} J'aime`}</span>
    </div>

  )
}

export default Like