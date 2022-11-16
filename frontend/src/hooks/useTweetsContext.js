import { useContext } from 'react'
import { TweetsContext } from '../contexts/TweetsContext'

const useTweetsContext = () => {
  const context = useContext(TweetsContext)

  if (!context) {
    throw Error('useTweetsContext must be used inside an TweetsContextProvider!')
  }

  return context;
}

export default useTweetsContext
