import React, { useState, useEffect } from 'react'
import './LoginOrSignup.css'
import Login from '../../components/Login/Login'
import Signup from '../../components/Signup/Signup'

const LoginOrSignup = () => {
  const [isLog, setIsLog] = useState(false)
  const [isSign, setIsSign] = useState(false)
  const [show, setShow] = useState(true)

  const handleLog = () => {
    setShow(false)
    setIsLog(true)
  }
  const handleSign = () => {
    setShow(false)
    setIsSign(true)
  }
  const hanldeBack = () => {
    setIsSign(false)
    setIsLog(false)
    setShow(true)
  }

  useEffect(() => {
    const btnModal = document.getElementById('btnModalOpen')
    btnModal.click()
  }, [])

  return (
    <>
    <div className="feed__header">
      <h2>Login or Sign up</h2>
    </div>
    <div className="modal fade" id="modalBackdrop" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className='modal-header'>
            { (isSign || isLog) ?
                <button type="button" onClick={hanldeBack} className="btn-no-style">
                  <i className='bi bi-arrow-left'></i>
                </button>
              :
              <img src={process.env.PUBLIC_URL + 'twitter-logo.png'} alt='twitter logo'  className='twitter-logo'/>
            }
            <button type="button" id='closeModalBtn' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {isLog && <Login />}
            {isSign && <Signup />}
          </div>
          {show &&
              <div className='modal-footer'>
                <button onClick={handleLog} type="button" className="tweet-btn">Log in</button>
                <button onClick={handleSign} type="button" className="tweet-btn">Sign up</button>
              </div>
          }
        </div>
      </div>
    </div>
    </>

  )
}

export default LoginOrSignup
