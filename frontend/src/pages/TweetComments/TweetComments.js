import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Tweet from '../../components/Tweet/Tweet'
import Comments from "../../components/Comments/Comments";
import useAuthContext from "../../hooks/useAuthContext";
import Feed from '../../components/Feed/Feed'

const TweetComments = () => {
  const { id } = useParams()
  const { user } = useAuthContext()
  const [tweet, setTweet] = useState(null)
  const [error, setError] = useState('')

  const checkLiked = (checkList) => {
    return checkList.includes(user._id)
  }
  useEffect(()=> {
    const fetchTweet = async () => {

      const response =  await fetch(`${process.env.REACT_APP_BASE_URL}/tweets/${id}`, {
        method: 'GET',
        headers :{
          'Content-Type': 'application/json',
          'Authorization': user.token
        }
      })

      const json = await response.json()
      if (!response.ok) {
        setError(json.error)
      }
      if (response.ok) {
        setError('')
        setTweet(json)
      }
    }

    fetchTweet()
  }, [id, user.token])

  return (
    <Feed>
      <div className="feed__header">
        <h2>Tweet</h2>
      </div>
      {error && <div className="error">{error}</div>}
      {tweet && <Tweet
          userId={tweet._creator._id}
          firstName={tweet._creator.firstName} body={tweet.body}
          key={tweet._id} _id={tweet._id}
          imageSrc={tweet.image && tweet.image.url}
          profileImg={tweet._creator.image.url}
          likesC={tweet.likesCount}
          like={checkLiked(tweet.likedBy)}
        />}
        <Comments tweetId={id} />
    </Feed>
  )
}

export default TweetComments
