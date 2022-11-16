import React, { useState } from 'react'
import styles from './Tweet.module.css'

import TweetUpdateForm from '../TweetUpdateForm/TweetUpdateForm'
import useAuthContext from '../../hooks/useAuthContext'
import useTweetsContext from '../../hooks/useTweetsContext'

const Tweet = ({ firstName, body, _id }) => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [doEdit, setDoEdit] = useState(false)
  const { user } = useAuthContext()
  const { dispatch } = useTweetsContext()
  const handleDelete = async () => {

    setIsLoading(true)
    const response = await fetch(`/tweets/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user.token
      }
    })

    const json = await response.json()
    console.log(json)

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

  return (
    <>
      <div className={['row mt-5', styles.Tweet].join(' ')}>
        <div className='col-md-8 mx-auto'>
            <h5>{firstName}</h5>
            <br />
            <p>{body}</p>
        </div>
        <br />
        <div className='col-sm-2'>
          <button className={['btn', 'btn-danger', 'btn-sm', styles.BtnDeleteTweet].join(' ')} disabled={isLoading} onClick={handleDelete}>Delete</button>
          <button className='btn btn-success btn-sm' onClick={() => setDoEdit(!doEdit)}>Edit</button>

        </div>
        {error && <><br /><div className='error'>{error}</div> <br /></>}
      </div>
      <div className={['row mb-5', styles.Tweet].join(' ')}>
        <div className='col-md-8 mx-auto'>
          {doEdit && <TweetUpdateForm initialBody={body} _id={_id} />}
      </div>
      </div>
    </>
  )
}

export default Tweet
