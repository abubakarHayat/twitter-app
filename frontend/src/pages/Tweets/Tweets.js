import React from 'react'
import Container from '../../components/Container/Container'
import TweetForm from '../../components/TweetForm/TweetForm'
import Tweet from '../../components/Tweet/Tweet'

const Tweets = () => {

  return (
    <Container>
      <TweetForm />
      <Tweet />
    </Container>
  )
}

export default Tweets
