import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading} =  useLogin()

  const handleClick = async (e) => {
    e.preventDefault()

    await login(email, password)
    const modal = document.getElementById('closeModalBtn')
    modal.click()
  }
  return (
    <div className='container'>
      <h1>Log In</h1>
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <form className='mt-5'>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">Email address</label>
              <input
                type="email" className="form-control"
                id="inputEmail" aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
                value={email} required
              />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">Password</label>
              <input
                type="password" className="form-control"
                id="inputPassword"
                onChange={(e) => setPassword(e.target.value)}
                value={password} required
              />
            </div>
            <button type="submit" disabled={isLoading} onClick={handleClick} className="tweet-btn-lg">Log In</button>
          </form>
          {error && <div className='error'>{error}</div>}
        </div>
      </div>
    </div>
  )
}

export default Login
