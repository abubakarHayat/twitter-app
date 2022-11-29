import React, { useState } from 'react'

import useAuthContext from '../../hooks/useAuthContext'
import useCommentsContext from '../../hooks/useCommentsContext'

const CommentUpdateForm = ({ _id, initalBody, toggleEdit }) => {
  const [body, setBody] = useState(initalBody)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthContext()
  const { dispatch } = useCommentsContext()


  const updateComment = async (e) => {
    e.preventDefault()

    if (!user){
      setError('User must be logged in!')
      return
    }

    setIsLoading(true)
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tweet/comment/${_id}`, {
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
      console.log('UP', json)
      dispatch({type: 'UPDATE_COMMENT', payload: json})
      toggleEdit()
    }

  }



  return (
    <>
      <form>
          <div className="mb-3">
          <input
            type='text'
            className="form-control" id="validationTextarea"
            placeholder="Comment something!"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            required />
        </div>
        <button type="submit" disabled={isLoading} onClick={updateComment} className="btn-sm tweet-btn">Update</button>
      </form>
      {error && <div className='error card-footer text-muted'>{error}</div>}
    </>

  )
}

export default CommentUpdateForm
