import React, { useState } from 'react'

import useAuthContext from '../../hooks/useAuthContext'
import useCommentsContext from '../../hooks/useCommentsContext'

const CommentForm = ({ tweetId }) => {
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthContext()
  const { dispatch } = useCommentsContext()


  const handleComment = async (e) => {
    e.preventDefault()

    if (!user){
      setError('User must be logged in!')
      return
    }

    setIsLoading(true)
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tweet/${tweetId}/comment`, {
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
      dispatch({type: 'CREATE_COMMENT', payload: json})
    }

  }



  return (
        <div className="card">
          <div className="card-body">
            <div className='row'>
              <div className='col-md-12'>
                <img src={user.image} alt='user' className='rounded-circle' style={{height: "50px", width: '50px'}}/>
                <form>
                    <input
                      type='text'
                      className="form-control tweet-input my-1" id="validationTextarea"
                      placeholder="Comment something!"
                      onChange={(e) => setBody(e.target.value)}
                      value={body}
                      required />
                  <button type="submit" disabled={isLoading} onClick={handleComment} className="tweet-btn-lg">Comment</button>
                </form>
              </div>
            </div>
          </div>
         {error && <div className='error card-footer text-muted'>{error}</div>}
        </div>
  )
}

export default CommentForm
