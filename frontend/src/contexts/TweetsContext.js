import { createContext, useReducer } from "react";

const TweetsContext = createContext()

const tweetsReducer = (state, action) => {
  switch(action.type){
    case 'SET_TWEETS':
      return { tweets: action.payload }
    case 'CREATE_TWEET':
      return {
        tweets: [action.payload, ...state.tweets]
      }
    case 'UPDATE_TWEET':
      const index = state.tweets.findIndex(t => t._id === action.payload._id)
      const result = [...state.tweets]
      result[index] = action.payload
      return { tweets: result }
    case 'DELETE_TWEET':
      return {
        tweets: state.tweets.filter((t) => ( t._id !== action.payload._id))
      }
    default:
      return state
  }
}


const TweetsContextProvider = ({ children }) => {
  const  [state, dispatch] = useReducer(tweetsReducer, { tweets: null })

  return (
    <TweetsContext.Provider value={{...state, dispatch}}>
      { children }
    </TweetsContext.Provider>
  )
}

export { TweetsContext, TweetsContextProvider, tweetsReducer }
