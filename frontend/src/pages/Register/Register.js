import React from 'react'

const Register = () => {
  return (
    <div className='container'>
      <h1>Registeration</h1>
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <form className='mt-5'>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="First Name" aria-label="First Name" />
              <input type="text" className="form-control" placeholder="Last Name" aria-label="Last Name" />
            </div>
            <div class="mb-3">
              <input type="email" className="form-control" placeholder="Email" aria-label="Email" id="inputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <input type="password" className="form-control"  placeholder="Password" aria-label="Password" id="inputPassword1" />
            </div>
            <div class="mb-3">
              <label for="dob">Date of birth</label>
              <input id="dob" class="form-control" type="date" />
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
