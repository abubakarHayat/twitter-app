import React, { useState } from 'react'
import useSignup from '../../hooks/useSignup'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDob] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(firstName, lastName, email, password, dob)

    console.log(email, password, dob)
  }
  return (
    <div className='container'>
      <h1>Registeration</h1>
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <form className='mt-5' onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text" className="form-control"
                placeholder="First Name" aria-label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName} required
              />
              <input
                type="text" className="form-control"
                placeholder="Last Name" aria-label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName} required
              />
            </div>
            <div className="mb-3">
              <input
                type="email" className="form-control"
                placeholder="Email" aria-label="Email"
                id="inputEmail1" aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
                value={email} required
              />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <input
                type="password" className="form-control"
                placeholder="Password" aria-label="Password" id="inputPassword"
                onChange={(e) => setPassword(e.target.value)}
                value={password} required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dob">Date of birth</label>
              <input
                id="dob" className="form-control"
                type="date"
                onChange={(e) => setDob(e.target.value)}
                value={dob} required
              />
              <span id="dateSelected"></span>
            </div>
            <button type="submit" disabled={isLoading} className="btn btn-primary">Singup</button>
          </form>
        </div>
        {error &&  <div className='error'>{error}</div>}
      </div>
    </div>
  )
}

export default Signup
