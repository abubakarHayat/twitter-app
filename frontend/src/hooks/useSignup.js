import { useState } from "react";
import useAuthContext from './useAuthContext'

const useSignup = (firstName, lastName, email, password, dob) => {
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (firstName, lastName, email, password, dob, image) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({firstName, lastName, email, password, dob, image})
    })
    const json = await response.json()

    if (!response.ok){
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({type: 'LOGIN', payload: json})
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error}

}

export default useSignup
