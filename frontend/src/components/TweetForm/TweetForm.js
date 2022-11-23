import React, { useState } from 'react'

import useTweetsContext from '../../hooks/useTweetsContext'
import useAuthContext from '../../hooks/useAuthContext'

const TweetForm = () => {
  const [body, setBody] = useState('')
  const [image, setImage] = useState(null)
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
      body: JSON.stringify({body, image}),
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
      console.log('FORM',json)
      dispatch({type: 'CREATE_TWEET', payload: json})
    }

  }

  const onImageUpload = (e) => {
    const imageFile = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(imageFile)
    reader.onloadend = () => {
      setImage(reader.result)
    }
  }


  return (
    <div className='row'>
      <div className='col-md-10 mx-auto'>
        <div className="card text-center mt-5">
          <div className="card-body">
          <form>
             <div className="mb-3">
              <textarea
                className="form-control" id="validationTextarea"
                placeholder="What's happening?"
                onChange={(e) => setBody(e.target.value)}
                value={body}
                required />
            </div>
            <div className='my-3'>
            <input className="form-control form-control-md"
              id="formFile" type="file"
              onChange={onImageUpload}
            />
            </div>
            <button type="submit" disabled={isLoading} onClick={handleSubmit} className="btn btn-primary">Tweet</button>
          </form>
          </div>
         {error && <div className='error card-footer text-muted'>{error}</div>}
        </div>
      </div>
    </div>
  )
}

export default TweetForm
