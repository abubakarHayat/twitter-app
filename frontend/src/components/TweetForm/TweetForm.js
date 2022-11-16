import React, { useState } from 'react'
import styles from './TweetForm.module.css'

const TweetForm = () => {
  const [tweetBody, setTweetBody] = useState('')

  const handleSubmit = () => {

  }

  return (
      <div className='row'>
        <div className='col-md-10 mx-auto'>
          <form className={["mt-5", styles.TweetForm].join(' ')}>
            <div className="mb-3">
              <textarea
                className="form-control" id="validationTextarea"
                placeholder="What's happening?"
                onChange={(e) => setTweetBody(e.target.value)}
                value={tweetBody}
                required />
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Tweet</button>
          </form>
        </div>
      </div>
  )
}

export default TweetForm
