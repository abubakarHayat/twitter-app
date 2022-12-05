import React from 'react'
import { Link }  from 'react-router-dom'
import TweetModal from '../TweetModal/TweetModal'
import WidgetColumn from '../WidgetColumn/WidgetColumn'
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
            <div className='col-sm-3'>
                <div className="content">
                    <div className="sidebar">
                        <div className="sidebar__brand">
                            <i className="fa fa-twitter"></i>
                        </div>
                        <Link to="/" className="sidebar__item">
                            <i className="sidebar__item__icon bi bi-house-fill"></i>
                            <span className="sidebar__item__text">Home</span>
                        </Link>
                        <Link to="#" className="sidebar__item">
                            <i className="sidebar__item__icon bi bi-bell"></i>
                            <span className="sidebar__item__text">Notifications</span>
                        </Link>
                        <Link to="#" className="sidebar__item">
                            <i className="sidebar__item__icon bi bi-hash"></i>
                            <span className="sidebar__item__text">Explore</span>
                        </Link>
                        <Link to="#" className="sidebar__item">
                            <i className="sidebar__item__icon bi bi-envelope"></i>
                            <span className="sidebar__item__text">Messages</span>
                        </Link>
                        <Link to="#" className="sidebar__item">
                            <i className="sidebar__item__icon bi bi-bookmark"></i>
                            <span className="sidebar__item__text">Bookmarks</span>
                        </Link>
                        <Link to="#" className="sidebar__item">
                            <i className="sidebar__item__icon bi bi-card-list"></i>
                            <span className="sidebar__item__text">Lists</span>
                        </Link>
                        <Link to="#" className="sidebar__item">
                            <i className="sidebar__item__icon bi bi-three-dots"></i>
                            <span className="sidebar__item__text">More</span>
                        </Link>
                        {user &&
                        <Link to="/update-profile" className="sidebar__item">
                            <i className="sidebar__item__icon bi bi-person"></i>
                            <span className="sidebar__item__text">Update Profile</span>
                        </Link>}
                        { !user &&
                            ( <div>
                                <Link className='sidebar__item' to='/on-board'>
                                    <button type="button" className="btn-no-style" data-bs-toggle="modal" data-bs-target="#modalBackdrop">
                                        <i className="sidebar__item__icon bi bi-box-arrow-in-right"></i>
                                        <span className="sidebar__item__text">Log In</span>
                                    </button>
                                </Link>
                                <Link className='sidebar__item' to='/on-board'>
                                    <button type="button" className="btn-no-style" data-bs-toggle="modal" data-bs-target="#modalBackdrop" id='btnModalOpen'>
                                        <i className="sidebar__item__icon  bi bi-check-lg"></i>
                                        <span className="sidebar__item__text">Sign Up</span>
                                    </button>
                                </Link>
                            </div>
                            )
                        }
                        { user &&
                            (
                            <button className="btn-log sidebar__item" onClick={handleClick}>
                                <i className="sidebar__item__icon bi bi-box-arrow-left"></i>
                                <span className="sidebar__item__text">Log Out</span>
                            </button>
                            )
                        }
                        { user &&
                            (<>
                                <button  data-bs-toggle="modal" data-bs-target="#tweetModal" className="btn-tweet-modal sidebar__item d-flex justify-content-center">
                                    Tweet
                                </button>

                                </>
                            )
                        }
                        {user && <div className='user-div'><Link className='sidebar__item' to={`/profile/${user._id}`}>

                            <img src={user.image} alt='profile' className='rounded-circle' style={{width: "50px"}}/>
                            {<p className='user-email'>{user.email}</p>}
                        </Link></div>}
                    </div>
                </div>
            </div>
            <div className='col-sm-5 twitter-bar tweet-feed'>
                {user && <TweetModal />}
                {children}
            </div>
            <div className='col-sm-3 twitter-widgets'>
                <WidgetColumn />
            </div>
        </div>
    </div>
  )
}

export default Navbar
