import React, { useState, useEffect } from 'react'
import './Comment.css'
import CommentUpdateForm from '../CommentUpdateForm/CommentUpdateForm'

import useAuthContext from '../../hooks/useAuthContext'
import useCommentsContext from '../../hooks/useCommentsContext'

const Comment = ({profileImg, firstName, body, _id, userId }) => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [doEdit, setDoEdit] = useState(false)
  const [haveAuth, setHaveAuth] = useState(false)
  const { user } = useAuthContext()
  const { dispatch } = useCommentsContext()

  const toggleEdit = () => setDoEdit(!doEdit)

  const handleDelete = async () => {

    setIsLoading(true)
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tweet/comment/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user.token
      }
    })

    const json = await response.json()

    if (!response.ok){
      setError(json.error)
      setIsLoading(false)
    }
    if (response.ok){
      setError('')
      setIsLoading(false)
      dispatch({type: 'DELETE_COMMENT', payload: json})
    }
  }

  useEffect(()=> {
    if(userId === user._id){
      setHaveAuth(true)
    }else {
      setHaveAuth(false)
    }

  }, [user._id, userId])

  return (
    <>
      <div className='row my-1'>
        <div className='col-md-10 mx-auto'>
          <div className="card comment-card">
            <div className="card-header comment-header">
              <img src={profileImg} alt='profile' className='rounded-circle' style={{width: '30px'}}/>
              <p><strong>@{firstName}</strong></p>
            </div>
            <div className="card-body">
              {haveAuth && doEdit ? <CommentUpdateForm _id={_id} initalBody={body} toggleEdit={toggleEdit}/>
              :
              <p className="card-text text-start">{body}</p>
              }
              {haveAuth && <button className=' btn-con btn-sm mx-1' disabled={isLoading} onClick={handleDelete}><i className="bi bi-trash3"></i></button>}
              {haveAuth && (!doEdit ?
                <button className='btn-con btn-sm mx-1' onClick={toggleEdit}><i className="bi bi-pencil-square"></i></button>
                :
                <button className='btn-con btn-sm mx-1' onClick={toggleEdit}><i className="bi bi-x"></i></button>)}
            </div>
            {error && <div className="error">
              {error}
            </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Comment
