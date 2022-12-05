import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Tweet.css'
import './Tweet.scss'

import LikeCheckbox from '../LikeCheckbox/LikeCheckbox'
import TweetUpdateForm from '../TweetUpdateForm/TweetUpdateForm'
import useAuthContext from '../../hooks/useAuthContext'
import useTweetsContext from '../../hooks/useTweetsContext'

const Tweet = ({ firstName, body, _id, imageSrc, profileImg, likesC, like, userId }) => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [doEdit, setDoEdit] = useState(false)
  const [haveAuth, setHaveAuth] = useState(false)
  const [likesCount, setLikesCount] = useState(likesC)
  const [liked, setLiked] = useState(like)
  const { user } = useAuthContext()
  const { dispatch } = useTweetsContext()


  const handleDelete = async () => {

    setIsLoading(true)
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tweets/${_id}`, {
      method: 'DELETE',
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
      dispatch({type: 'DELETE_TWEET', payload: json})
    }
  }

  const handleLikes = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    let response = null
    if(liked){
      response = await fetch(`${process.env.REACT_APP_BASE_URL}/tweets/unlike/${_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token
        }
      })
    }else{
      response = await fetch(`${process.env.REACT_APP_BASE_URL}/tweets/like/${_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token
        }
      })
    }

    const json = await response.json()

    if (!response.ok){
      setError(json.error)
      setIsLoading(false)
      console.log("JSON",json)
    }
    if (response.ok){
      setError('')
      setIsLoading(false)
      setLikesCount(json.likesCount)
      console.log("JSON like",json)
      if (json.likedBy.includes(user._id)){
        setLiked(true)
      }else{
        setLiked(false)
      }
      dispatch({type: 'UPDATE_TWEET', payload: json})
    }

  }
  useEffect(()=> {
    if (userId === user._id){
      setHaveAuth(true)
    }else {
      setHaveAuth(false)
    }
  }, [userId, user._id])

  const toggleEdit = () => {
    setDoEdit(!doEdit)
  }
  return (
    <>
          <div className="card tweet-box">
            <div className="card-body">
              <div className='row'>
                <div className='col-md-1 col-sm-2'>
                  <Link to={`/profile/${userId}`}  >
                    <img src={profileImg} alt='profile' className='rounded-circle' style={{width: '40px', height: '40px'}}/>
                  </Link>
                </div>
                  <div className='col-sm-9 text-start'>
                  <Link to={`/profile/${userId}`} style={{textDecoration: 'none'}}>
                    <p><span className='tweet-user-name'>{firstName} &nbsp;</span> <span className='text-muted'>@{firstName}</span></p>
                  </Link>
                  </div>
                <div className='col-sm-2'>
                  {haveAuth && <button className=' btn-con btn-sm mx-1' disabled={isLoading} onClick={handleDelete}><i className="bi bi-trash3"></i></button>}
                  {haveAuth && (!doEdit ?
                    <button className='btn-con btn-sm mx-1' onClick={toggleEdit}><i className="bi bi-pencil-square"></i></button>
                    :
                    <button className='btn-con btn-sm mx-1' onClick={toggleEdit}><i className="bi bi-x-lg"></i></button>)}
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                    {haveAuth && doEdit ? <TweetUpdateForm initialBody={body} _id={_id} toggleEdit={toggleEdit} /> :
                      <>
                      <h5>{body}</h5>
                      {imageSrc &&
                      <div className='my-2'>
                          <img src={imageSrc} alt='tweet' className='' />
                      </div>}
                      </>
                    }
                </div>
              </div>
            </div>
            <div className="">
              <div className='row'>
                <div className='col-sm-1'>
                  <LikeCheckbox _id={_id} likesCount={likesCount} handleLikes={handleLikes} liked={liked} />
                </div>
                <div className='col-sm-1'>
                  <Link to={`/tweet/${_id}`}><button className='btn-comments btn-con'><i className="bi bi-chat"></i></button>
                  </Link>
                </div>
              </div>
            </div>
            {error && <div className="error">
              {error}
            </div>}
          </div>
    </>
  )

}

export default Tweet
