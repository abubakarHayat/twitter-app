import { createContext, useReducer, useEffect } from "react";

const TweetsContext = createContext()

const tweetsReducer = (state, action) => {
  switch(action.type){
    case 'SET_TWEETS':
      return { tweets: action.payload }
    case 'CREATE_TWEET':
      return { tweets: null }
    case 'UPDATE_TWEET':
      return { tweets: action.payload }
    case 'DELETE_TWEET':
      return { tweets: action.payload }
    default:
      return state
  }
}


const TweetsContextProvider = ({ children }) => {
  const  [state, dispatch] = useReducer(tweetsReducer, { tweets: null })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user){
      dispatch({type: 'LOGIN', payload: user})
    }
  }, [])

  return (
    <TweetsContext.Provider value={{...state, dispatch}}>
      { children }
    </TweetsContext.Provider>
  )
}

export { TweetsContext, TweetsContextProvider, tweetsReducer }
