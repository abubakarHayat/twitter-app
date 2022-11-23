import React, { useState } from 'react'
import './Tweet.css'
import './Tweet.scss'

import TweetUpdateForm from '../TweetUpdateForm/TweetUpdateForm'
import useAuthContext from '../../hooks/useAuthContext'
import useTweetsContext from '../../hooks/useTweetsContext'

const Tweet = ({ firstName, body, _id, imageSrc, profileImg, likesC, like }) => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [doEdit, setDoEdit] = useState(false)
  const [likesCount, setLikesCount] = useState(likesC)
  const [liked, setLiked] = useState(like)
  const { user } = useAuthContext()
  const { dispatch } = useTweetsContext()
  const handleDelete = async () => {

    console.log("DEL", _id)
    setIsLoading(true)
    const response = await fetch(`/tweets/${_id}`, {
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

    console.log('ID ', _id)
    setIsLoading(true)
    let response = null
    if(liked){
      response = await fetch(`/tweets/unlike/${_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token
        }
      })
    }else{
      response = await fetch(`/tweets/like/${_id}`, {
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
  return (
    <>
      <div className='row my-2'>
        <div className='col-md-10 mx-auto'>
          <div className="card">
            <div className="card-header">
              <img src={profileImg} alt='profile' className='rounded-circle' style={{width: '50px'}}/>
              <h5>@{firstName}</h5>
            </div>
            <div className="card-body">
              <p className="card-text">{body}</p>
              <div className='tweet-hl'></div>
              {imageSrc &&
              <div className='my-2'>
                  <img src={imageSrc} alt='tweet' className='img-card-top' />
              </div>}
              <button className='btn btn-danger btn-sm mx-1' disabled={isLoading} onClick={handleDelete}>Delete</button>
              <button className='btn btn-success btn-sm mx-1' onClick={() => setDoEdit(!doEdit)}>Edit</button>
              {doEdit && <TweetUpdateForm initialBody={body} _id={_id} />}
            </div>
            <div className="card-footer text-muted">
              <div>
                <input type="checkbox" className="checkbox" id={`checkbox${_id}`} onChange={(e) => handleLikes(e)} checked={liked} />
                <label htmlFor={`checkbox${_id}`}>
                  <svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
                    <g id="Group" fill="none" fillRule="evenodd" transform="translate(467 392)">
                      <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" id="heart" fill="#AAB8C2"/>
                      <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/>

                      <g id="grp7" opacity="0" transform="translate(7 6)">
                        <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2"/>
                        <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2"/>
                      </g>

                      <g id="grp6" opacity="0" transform="translate(0 28)">
                        <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2"/>
                        <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2"/>
                      </g>

                      <g id="grp3" opacity="0" transform="translate(52 28)">
                        <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2"/>
                        <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2"/>
                      </g>

                      <g id="grp2" opacity="0" transform="translate(44 6)">
                        <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2"/>
                        <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2"/>
                      </g>

                      <g id="grp5" opacity="0" transform="translate(14 50)">
                        <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2"/>
                        <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2"/>
                      </g>

                      <g id="grp4" opacity="0" transform="translate(35 50)">
                        <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2"/>
                        <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2"/>
                      </g>

                      <g id="grp1" opacity="0" transform="translate(24)">
                        <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2"/>
                        <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2"/>
                      </g>
                    </g>
                  </svg>
                </label>
                <div className=''><p>{likesCount}</p></div>
              </div>
            </div>
            {error && <div className="error">
              {error}
            </div>}
          </div>
        </div>
      </div>
      {/* {doEdit && <TweetUpdateForm initialBody={body} _id={_id} />} */}
    </>
  )

  // return (
  //   <>
  //     <div className={['row mt-5', styles.Tweet].join(' ')}>
  //       <div className='col-md-8 mx-auto'>
  //           <h5>{firstName}</h5>
  //           <br />
  //           <p>{body}</p>
  //       </div>
  //       <br />
  //       <div className='col-sm-2'>
  //         <button className={['btn', 'btn-danger', 'btn-sm', styles.BtnDeleteTweet].join(' ')} disabled={isLoading} onClick={handleDelete}>Delete</button>
  //         <button className='btn btn-success btn-sm' onClick={() => setDoEdit(!doEdit)}>Edit</button>

  //       </div>
  //       {error && <><br /><div className='error'>{error}</div> <br /></>}
  //     </div>
  //     {imageSrc && <div className='row my-2'>
  //       <div className='col-md-8 mx-auto'>
  //         <img src={imageSrc} alt='tweet' className='img-thumbnail' />
  //       </div>
  //     </div>}
  //     <div className={['row mb-5', styles.Tweet].join(' ')}>
  //       <div className='col-md-8 mx-auto'>
  //         {doEdit && <TweetUpdateForm initialBody={body} _id={_id} />}
  //     </div>
  //     </div>
  //   </>
  // )
}

export default Tweet
