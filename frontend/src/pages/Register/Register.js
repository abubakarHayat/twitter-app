import React, { useState } from 'react'

const Register = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDob] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(email, password)
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
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
