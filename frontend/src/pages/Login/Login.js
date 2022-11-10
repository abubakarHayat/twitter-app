import React from 'react'

const Login = () => {
  return (
    <div className='container'>
      <h1>Log In</h1>
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <form className='mt-5'>
            <div className="mb-3">
              <label htmlFor="inputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="inputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword1" />
            </div>
            <button type="submit" className="btn btn-primary">Log In</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
