import { createContext, useReducer, useEffect } from "react";

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch(action.type){
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    case 'UPDATE_EMAIL':
      return { user: action.payload }
    default:
      return state
  }
}


const AuthContextProvider = ({ children }) => {
  const  [state, dispatch] = useReducer(authReducer, { user: JSON.parse(localStorage.getItem('user')) })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user){
      dispatch({type: 'LOGIN', payload: user})
    }
  }, [])

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider, authReducer }
