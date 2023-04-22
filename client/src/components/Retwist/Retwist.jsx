import React, { useState } from 'react'
import retwist from "../../images/retwist3.png"
const Retwist = () => {
    const [retwists, setRetwists] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
      if (isClicked) {
        setRetwists(retwists - 1);
      } else {
        setRetwists(retwists + 1);
      }
      setIsClicked(!isClicked);
    };
  
    return (
     <div className='likeCompo' >
      {isClicked ? (
              <img src={retwist} width="35px" height="35px"  onClick = {handleClick} class = "heart-clicked"/>
           ) : (
              <img src={retwist} width="35px" height="35px"  onClick = {handleClick} class = "heart-clicked"/>
           )}
      
      <span> { `${retwists} Retwists`}</span>
      </div>
    );
}

export default Retwist