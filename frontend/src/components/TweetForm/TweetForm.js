import React, { useState } from 'react'
import './TweetForm.css'

import useTweetsContext from '../../hooks/useTweetsContext'
import useAuthContext from '../../hooks/useAuthContext'

const TweetForm = () => {
  const [body, setBody] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const [alert, setAlert] = useState('')
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
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tweets`, {
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
      setImage(null)
      setAlert('You just tweeted!')
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

  const handleCloseAlert = () => setAlert('')


  return (
    <>
        <div className="card text-center">
          <div className="card-body">
            { alert && <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <p>{alert}</p>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleCloseAlert}></button>
                      </div>}
          <form>
             <div className="mb-3">
              <div className='row'>
                <div className='col-sm-1'>
              <img  src={user.image} alt='profile' className="tweetbox__input" />
                </div>
                  <div className='col-sm-11 tweet-input-box'>
                    <input
                      className="form-control tweet-input" id="validationTextarea"
                      placeholder="What's happening?"
                      onChange={(e) => setBody(e.target.value)}
                      value={body}
                      required />
                      {image && <img src={image} alt='tweet thumbnail' className='img-thumbnail' />}
                  </div>
                </div>
              </div>
            <div className='my-3 tweet-img btn-con'>
            <label htmlFor='image-upload' id='img-up'>
              <i className="bi bi-images">
                <input className="tweet-file-input" id='image-upload'
                   type="file"
                  onChange={onImageUpload}
                ></input>
              </i>
            </label>
            </div>
            <button type="submit" disabled={isLoading} onClick={handleSubmit} className="tweet-btn">Tweet</button>
          </form>
          </div>
         {error && <div className='error card-footer text-muted'>{error}</div>}
        </div>
        </>
  )
}

export default TweetForm
