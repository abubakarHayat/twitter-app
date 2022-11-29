import React from 'react'
import { Link }  from 'react-router-dom'
import useLogout from '../../hooks/useLogout'
import useAuthContext from '../../hooks/useAuthContext'

import './Navbar.css'

const Navbar = ({ children }) => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-sm-4 twitter-bar'>
                <div className="content">
                    <div className="sidebar">
                        <div className="sidebar__brand">
                            <i className="fa fa-twitter"></i>
                        </div>
                        <Link to="/" className="sidebar__item">
                            <i className="sidebar__item__icon bi bi-house-fill"></i>
                            <span className="sidebar__item__text">Home</span>
                        </Link>
                        {user &&
                        <Link to="/update-profile" className="sidebar__item">
                            <i className="sidebar__item__icon bi bi-person"></i>
                            <span className="sidebar__item__text">Update Profile</span>
                        </Link>}
                        { !user &&
                            ( <div>
                                <Link className='sidebar__item' to='/login'>
                                    <i className="sidebar__item__icon bi bi-box-arrow-in-right"></i>
                                    <span className="sidebar__item__text">Log In</span>
                                </Link>
                                <Link className='sidebar__item' to='/signup'>
                                    <i className="sidebar__item__icon  bi bi-check-lg"></i>
                                    <span className="sidebar__item__text">Sign Up</span>
                                </Link>
                            </div>
                            )
                        }
                        { user &&
                            ( <>
                            <Link className='sidebar__item' to={`/profile/${user._id}`}>
                                <i className="sidebar__item__icon bi bi-at"></i>
                                <img src={user.image} alt='profile' className='rounded-circle' style={{width: "50px"}}/>
                                {<p className='user-email'>{user.email}</p>}
                            </Link>
                            <button className="btn-log sidebar__item" onClick={handleClick}>
                                <i className="sidebar__item__icon bi bi-box-arrow-left"></i>
                                <span className="sidebar__item__text">Log Out</span>
                            </button>
                            </>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='col-sm-4 twitter-bar'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Navbar
