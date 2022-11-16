import React, { useState } from 'react'
import styles from './TweetForm.module.css'

import useTweetsContext from '../../hooks/useTweetsContext'
import useAuthContext from '../../hooks/useAuthContext'

const TweetForm = () => {
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useTweetsContext()
  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user){
      setError('User must be logged in!')
      return
    }
    setIsLoading(true)
    const response = await fetch('/tweets', {
      method: 'POST',
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
      console.log(json)
      dispatch({type: 'CREATE_TWEET', payload: json})
    }

  }

  return (
      <div className='row'>
        <div className='col-md-10 mx-auto'>
          <form className={["mt-5", styles.TweetForm].join(' ')}>
            <div className="mb-3">
              <textarea
                className="form-control" id="validationTextarea"
                placeholder="What's happening?"
                onChange={(e) => setBody(e.target.value)}
                value={body}
                required />
            </div>
            <button type="submit" disabled={isLoading} onClick={handleSubmit} className="btn btn-primary">Tweet</button>
          </form>
        </div>
        {error && <div className='error'>{error}</div>}
      </div>
  )
}

export default TweetForm
