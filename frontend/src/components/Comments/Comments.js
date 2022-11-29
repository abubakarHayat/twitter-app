import React, { useState, useEffect } from 'react'
import Comment from '../Comment/Comment'
import CommentForm from '../CommentForm/CommentForm'


import useAuthContext from '../../hooks/useAuthContext'
import useCommentsContext from '../../hooks/useCommentsContext'


const Comments = ({ tweetId }) => {
  const { comments, dispatch } = useCommentsContext()
  const [error, setError] = useState('')
  const [alert, setAlert] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthContext()

  useEffect(() => {

    const fetchComments = async () => {

      setAlert('')
      setIsLoading(true)

      const resposne = await fetch(`${process.env.REACT_APP_BASE_URL}/tweet/comments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token
        }
      })

      const json = await resposne.json()

      if (!resposne.ok){
        setError(json.error)
        setIsLoading(false)
      }

      if (resposne.ok){
        setError('')
        setIsLoading(false)
        if(json.length === 0){
          setAlert('No comments to show!')
        }
        dispatch({type: 'SET_COMMENTS', payload: json})
      }
    }

    fetchComments()
  }, [tweetId, user.token, dispatch])


  return (
    <>
      {isLoading && <div className='alert'><p>"Loading comments, please wait!"</p></div>}
      {alert && <div className='alert'><p>{alert}</p></div>}
      { (comments && comments.filter((c) => c.tweetId._id === tweetId)) &&
        comments.filter((c) => c.tweetId._id === tweetId).map((comment) => {
          return (
            <Comment
              userId={comment._commenter._id}
              profileImg={comment._commenter.image.url}
              firstName={comment._commenter.firstName}
              body={comment.body}
              key={comment._id} _id={comment._id} />
          )
        })
      }
      <CommentForm tweetId={tweetId}/>
      {error && <div className='error'>{error}</div>}
    </>
  )
}

export default Comments
