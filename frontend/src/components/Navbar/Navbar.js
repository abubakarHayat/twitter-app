import React from 'react'
import { Link }  from 'react-router-dom'
import useLogout from '../../hooks/useLogout'
import useAuthContext from '../../hooks/useAuthContext'

import './Navbar.css'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Twitter</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href='/'>Tweets</a>
            </li>
            <li className="nav-item">
              <Link to='/profile' className="nav-link" >Profile</Link>
            </li>
          </ul>
          { user &&
            ( <>
              <button className="btn btn-outline-warning" onClick={handleClick}>Log Out</button>
              <div className='user-profile-sm'>
                <img src={user.image} alt='profile' className='rounded-circle' style={{width: "50px"}}/>
                  {console.log(user)}
                {<p>{user.email}</p>}
              </div>
              </>
              )
          }
          { !user &&
            ( <div>
                <Link to='/login'><button className="btn btn-outline-success">Log In</button></Link>
                <Link to='/signup'><button className="btn btn-outline-primary">Sign Up</button></Link>
              </div>
              )
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
