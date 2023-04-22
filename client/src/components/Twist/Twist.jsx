import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./twist.css"
import comment from "../../images/comment.png"
import Comments from '../Comments/comments'
import Like from '../Like/Like'
import Retwist from '../Retwist/Retwist'

const Twist = ({twist}) => {
    const [commentBox, setCommentBox] =useState(false)
    
    const Comment = () => (
        <img
            src={comment}
            alt=""
            width="30px"
            height="30px"
        />);      
  return (
    <div className='twist'>
        <div className="contenu3">
            <div className='userTwist'>
                <div className="userTwistInfo">
                    <img src={twist.profilePic} alt="" />
                    <div className="twistDetails">
                        <Link to ={`/profile/${twist.userId}`} style={{textDecoration:"none", color:"inherit"}}>
                            <span className='userName'>{twist.name}</span>
                        </Link>
                        <span className='date'>1 min</span>
                    </div>
                </div> 
            </div>
            <div className="content">
                <p>{twist.text}</p>
                <img src={twist.img} alt=""/>
            </div>
            <div className="interaction">
                <div className="interactionItem" onClick={() => setCommentBox(!commentBox)}>
                    <Comment/> 
                    10 commentaires
                </div>
                <div className="interactionItem">
                    <Retwist/>
                </div>
                <div className="interactionItem">
                    <Like/>
                    
                </div>

                
            </div>
            {commentBox && <Comments/>}
        </div>
    </div>
  )
}

export default Twist