import React, { useState } from 'react'
import './UpdateProfile.css'

import useAuthContext from '../../hooks/useAuthContext'

const UpdateProfile = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDob] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState('')
  const { user, dispatch } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user){
      return
    }
    const data = JSON.stringify({firstName, lastName, email, password, dob, image})
    setIsLoading(true)
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${user._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user.token
      },
      body: data
    })

    const json = await response.json()
    if (!response.ok){
      setError(json.error)
      setIsLoading(false)
    }
    if (response.ok){
      console.log(json)
      setIsLoading(false)
      setError('')
      setAlert('Profile succesfully updated!')
      setImage(null)
      if (json.email){
        const newUser = JSON.parse(localStorage.getItem('user'))
        newUser.email = json.email
        dispatch({type: 'UPDATE_EMAIL', payload: newUser})
        localStorage.setItem('user', JSON.stringify(newUser))
      }
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
    <>
    <div className="feed__header">
      <h2>Update Profile</h2>
    </div>
    <div className='container profile-box'>
      {alert && <div className='alert'>{alert}</div>}
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <form className='mt-5' onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text" className="form-control"
                placeholder="First Name" aria-label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              <input
                type="text" className="form-control"
                placeholder="Last Name" aria-label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
            <div className="mb-3">
              <input
                type="email" className="form-control"
                placeholder="Email" aria-label="Email"
                id="inputEmail1" aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <input
                type="password" className="form-control"
                placeholder="Password" aria-label="Password" id="inputPassword"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dob">Date of birth</label>
              <input
                id="dob" className="form-control"
                type="date"
                onChange={(e) => setDob(e.target.value)}
                value={dob}
              />
              <span id="dateSelected"></span>
            </div>
            <div className='my-3 tweet-img-div'>
            <label htmlFor='image-upload' id='img-up'>
              <i className="bi bi-image-fill">
                <input className="tweet-file-input" id='image-upload2'
                   type="file"
                  onChange={onImageUpload}
                />
              </i>
            </label>
            {image && <img src={image} alt='profile' className='img-thumbnail'/>}
            </div>
            <button type="submit" disabled={isLoading} className="tweet-btn-lg">Update profile</button>
          </form>
        </div>
        {error &&  <div className="error">{error}</div>}
      </div>
    </div>
    </>
  )

}

export default UpdateProfile
