import React, { useEffect, useState } from 'react'
import Feed from '../../components/Feed/Feed'
import TweetForm from '../../components/TweetForm/TweetForm'
import Tweet from '../../components/Tweet/Tweet'

import useTweetsContext from '../../hooks/useTweetsContext'
import useAuthContext from '../../hooks/useAuthContext'


const Tweets = () => {
  const { tweets, dispatch } = useTweetsContext()
  const { user } = useAuthContext()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const checkLiked = (checkList) => {
    return checkList.includes(user._id)
  }
  useEffect(() => {
    if (!user){
      setError('User must ne logged in!')
      return
    }
    const fetchTweets = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tweets`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token
        }
      })
      const json = await response.json()

      if (!response.ok){
        setIsLoading(false)
        setError(json.error)
      }
      if(response.ok) {
        setIsLoading(false)
        setError('')
        dispatch({ type: 'SET_TWEETS', payload: json })
      }
    }
    fetchTweets()
  }, [dispatch, user])


  return (
    <Feed>
      {isLoading && <div>'Tweets loading, please wait!'</div>}
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <TweetForm />
      {tweets && tweets.map(tweet => (
        <Tweet
          userId={tweet._creator._id}
          firstName={tweet._creator.firstName} body={tweet.body}
          key={tweet._id} _id={tweet._id}
          imageSrc={tweet.image && tweet.image.url}
          profileImg={tweet._creator.image.url}
          likesC={tweet.likesCount}
          like={checkLiked(tweet.likedBy)}
        />
      ))}
      {error && <div className='error'>{error}</div>}
    </Feed>
  )
}

export default Tweets
