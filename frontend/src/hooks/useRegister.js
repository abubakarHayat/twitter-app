import React, { useState } from "react";
import { useAuthContext } from './useAuthContext'

const useRegister = (email, firstName, lastName, password, dob) => {
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)

  const register = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({firstName, lastName, email, password, dob})
    })
    const json = await response.json()

    if (!response.ok){
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      console.log('signup successful')
      // localStorage.setItem('user', JSON.stringify(json))
    }
  }

}
