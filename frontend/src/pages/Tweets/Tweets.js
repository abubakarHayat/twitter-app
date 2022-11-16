import React, { useEffect, useState } from 'react'
import Container from '../../components/Container/Container'
import TweetForm from '../../components/TweetForm/TweetForm'
import Tweet from '../../components/Tweet/Tweet'

import useTweetsContext from '../../hooks/useTweetsContext'
import useAuthContext from '../../hooks/useAuthContext'


const Tweets = () => {
  const { tweets, dispatch } = useTweetsContext()
  const { user } = useAuthContext()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    if (!user){
      setError('User must ne logged in!')
      return
    }
    const fetchTweets = async () => {
      const response = await fetch('/tweets',{
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
    <Container>
      {isLoading && <div>'Tweets loading, please wait!'</div>}
      <TweetForm />
      {tweets && tweets.map(tweet => (
        <Tweet firstName={tweet._creator.firstName} body={tweet.body} key={tweet._id} _id={tweet._id} />
      ))}
      {error && <div className='error'>{error}</div>}
    </Container>
  )
}

export default Tweets
