import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Feed from '../../components/Feed/Feed'
import TweetForm from '../../components/TweetForm/TweetForm'
import Tweet from '../../components/Tweet/Tweet'

import useAuthContext from '../../hooks/useAuthContext'


const Profile = () => {
  const [ userTweets, setUserTweets ] = useState([])
  const [userProf, setUserProf] = useState(null)
  const { id } = useParams()
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
    setIsLoading(true)
    const fetchUserProfile = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${id}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token
        }
      })

      const json = await response.json()

      if (!response.ok){
        setError(json.error)
        setIsLoading(false)
      }
      if (response.ok){
        setError('')
        setIsLoading(false)
        setUserProf(json)
      }
    }
    const fetchTweets = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tweets/user/${id}`,{
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
        setUserTweets(json)
      }
    }

    fetchUserProfile()
    fetchTweets()
  }, [user, id])


  return (
    <Feed>
    <div className="feed__header">
      <h2>{userProf && userProf.firstName}'s Profile</h2>
    </div>
      {isLoading && <div>'Tweets loading, please wait!'</div>}
      {userProf && <div className='container-fluid w-100' style={{backgroundColor: 'white', padding: '3%'}}>
        <div className='row'>
          <div className='col-md-12'>
            <img src={userProf.image.url} alt='user profile' className='rounded-circle' style={{maxWidth: '100%'}} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <h3>{`${userProf.firstName} ${userProf.lastName}`}</h3>
          </div>
        </div>
      </div>}
      {(user._id === id) && <TweetForm /> }
      {userTweets && userTweets.map(tweet => (
        <Tweet
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

export default Profile
