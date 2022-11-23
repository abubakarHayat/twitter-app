import React, { useState } from 'react'

import useTweetsContext from '../../hooks/useTweetsContext'
import useAuthContext from '../../hooks/useAuthContext'

const TweetUpdateForm = ({ _id, initialBody }) => {
  const [body, setBody] = useState(initialBody)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useTweetsContext()
  const { user } = useAuthContext()

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (!user){
      setError('User must be logged in!')
      return
    }
    setIsLoading(true)
    const response = await fetch(`/tweets/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify({body}),
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
      setBody('')
      dispatch({type: 'UPDATE_TWEET', payload: json})
    }

  }

  return (
    <>
      <form className="mt-5">
        <div className="mb-3">
          <textarea
            className="form-control" id="validationTextarea"
            placeholder="What's happening?"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            required />
        </div>
        <button type="submit" disabled={isLoading} onClick={handleUpdate} className="btn btn-primary">Update</button>
      </form>
      {error && <div className='error'>{error}</div>}
    </>
  )
}

export default TweetUpdateForm
