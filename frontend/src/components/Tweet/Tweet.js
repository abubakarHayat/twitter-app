import React from 'react'
import styles from './Tweet.module.css'

const Tweet = () => {

  return (
      <div className='row my-5'>
        <div className='col-md-8 mx-auto'>
          <div className={['container' , styles.Tweet].join(' ')}>
            <h5>Name</h5>
            <br />
            <p>Some tweet</p>
          </div>
        </div>
      </div>
  )
}

export default Tweet
