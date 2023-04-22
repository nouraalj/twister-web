import React, { useState } from 'react';
import "./postTwist.css"
function TweetBox() {
  const [tweet, setTweet] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyer le tweet à votre backend ou effectuer toute autre action souhaitée ici
    console.log(`Nouveau tweet: ${tweet}`);
    setTweet('');
  };

  return (
    <div className='postTwist'>
        <div className="contenu4">
            <form onSubmit={handleSubmit}>
                <textarea
                placeholder="Quoi de neuf ?"
                value={tweet}
                onChange={(e) => setTweet(e.target.value)}
                />
                <div className="tweet-box-actions">
                    <span>{280 - tweet.length} caractères restants</span>
                    <button type="submit" disabled={tweet.length === 0}>Tweet</button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default TweetBox;
