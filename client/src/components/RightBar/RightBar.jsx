import React from 'react'
import "./rightbar.css"
import PP from "../../images/profilepicture.jpg"

const RightBar = () => {
  return (
    <div className='rightbar'>
      <div className='contenu2'>
        <div className='items'>
          <div className='blocSuggestion'>
            <span>Suggestions</span>
          </div> 
          <div className=' users'>
            <div className='userInfo'>
              <img src={PP} alt=""/>
              <span>Noura Aljane</span>
            </div>
            <div className='buttons'>
              <button>Suivre</button>
            </div>
          </div>
          <div className=' users'>
            <div className='userInfo'>
              <img src={PP} alt=""/>
              <span>Noura Aljane</span>
            </div>
            <div className='buttons'>
              <button>Suivre</button>
            </div>
          </div>
        </div>
      </div>
      <div className='contenu2'>
        <div className='items'>
          <div className='blocSuggestion'>
            <span>Tendances pour vous</span>
          </div> 
          <div className='trendingTwist'>
              <span>#CDM2022</span>
          </div>
          <div className='twistStats'>
              <span>2000 twists</span>
          </div>
          <hr />
          <div className='trendingTwist'>
              <span>#Greve</span>
          </div>
          <div className='twistStats'>
              <span>50 twists</span>
          </div>
        </div>
      </div>
    </div>
  )
}


export default RightBar