import React from 'react'
import TweetBox from '../../components/PostTwist/postTwist'
import PostTwist from '../../components/PostTwist/postTwist'
import Twists from '../../components/Twists/Twists'
import "./home.css"
const Home = () => {
  return (
    <div className='home'>
      <TweetBox/>
      <Twists/>
      
 
    </div>

  )
}

export default Home