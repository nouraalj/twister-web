import React, { useContext } from 'react'
import { AuthContext } from '../Authentification';
import "./comments.css"
const Comments = (comment) => {

    const { currentUser } = useContext(AuthContext);
    const comments = [
        {
          id: 1,
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
          name: "John Doe",
          userId: 1,
          profilePicture:
            "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640",
        },
        {
          id: 2,
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
          name: "Jane Doe",
          userId: 2,
          profilePicture:
            "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640",
        },
      ];
      return (
        <div className="comments">
          <div className="writeComment">
            <img src={currentUser.profilePic} alt="" />
            <input type="text" placeholder="Twistez votre réponse" />
            <button>Répondre</button>
          </div>
          {comments.map((comment) => (
            <div className="comment">
              <img src={comment.profilePicture} alt="" />

              <div className="infoCommentUser">
                <span>{comment.name} · 1h </span>
                <p>{comment.desc}</p>
              </div>
              
            </div>
          ))}
        </div>
      );
}

export default Comments