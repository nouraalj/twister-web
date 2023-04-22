 import React from 'react'
import Twist from '../Twist/Twist';
import PP from "../../images/profilepicture.jpg";
 import "./twists.css"
 const Twists = () => {
  const twists = [
    {
      id: 1,
      name: "Pierre Max",
      userId: 1,
      profilePic: PP,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "",
    },
    {
      id: 2,
      name: "Marie Max",
      userId: 2,
      profilePic: PP,
      text: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
    },
  ];

  return <div className="twists">
    {twists.map(twist=>(
      <Twist twist={twist} key={twist.id}/>
    ))}
  </div>;
   
 };

 export default Twists