import { useContext } from 'react'
import { CommentsContext } from '../contexts/CommentsContext'

const useCommentsContext = () => {
  const context = useContext(CommentsContext)

  if (!context) {
    throw Error('useCommentsContext must be used inside an CommentsContextProvider!')
  }

  return context;
}

export default useCommentsContext
