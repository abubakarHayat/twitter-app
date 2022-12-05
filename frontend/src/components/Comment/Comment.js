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
          <div className="card comment-card">
            <div className="card-body">
              <div className="row">
                <div className='col-md-1 col-sm-2'>
                  <img src={profileImg} alt='profile' className='rounded-circle' style={{width: '40px'}}/>
                </div>
                <div className='col-md-10'>
                  <p>@{firstName}</p>
                </div>
              </div>
              <div className='row my-1'>
                <div className='col-md-12'>
                {haveAuth && doEdit ? <CommentUpdateForm _id={_id} initalBody={body} toggleEdit={toggleEdit}/>
                :
                <h6>{body}</h6>
                }
                </div>
              </div>
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
    </>
  )
}

export default Comment
