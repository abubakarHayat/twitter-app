import { createContext, useReducer } from "react";

const CommentsContext = createContext()

const commentsReducer = (state, action) => {
  switch(action.type){
    case 'SET_COMMENTS':
      return { comments: action.payload }
    case 'CREATE_COMMENT':
      return {
        comments: [...state.comments, action.payload]
      }
    case 'UPDATE_COMMENT':
      const index = state.comments.findIndex(t => (t._id === action.payload._id))
      const result = [...state.comments]
      result[index] = action.payload
      return { comments: result }
    case 'DELETE_COMMENT':
      return {
        comments: state.comments.filter((t) => ( t._id !== action.payload._id))
      }
    default:
      return state
  }
}


const CommentsContextProvider = ({ children }) => {
  const  [state, dispatch] = useReducer(commentsReducer, { comments: null })

  return (
    <CommentsContext.Provider value={{...state, dispatch}}>
      { children }
    </CommentsContext.Provider>
  )
}

export { CommentsContext, CommentsContextProvider, commentsReducer }
