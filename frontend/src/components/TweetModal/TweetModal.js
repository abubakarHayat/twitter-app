import React from "react";
import TweetForm from '../TweetForm/TweetForm'

const TweetModal = () => {

  return (
    <div className="modal fade" id="tweetModal" tabIndex="2" aria-labelledby="tweetModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <TweetForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TweetModal
