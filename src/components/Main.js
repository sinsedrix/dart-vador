import React from 'react'

import Players from './Players.js'
import GameX01 from './GameX01.js'
import Cricket from './Cricket.js'
import Intro from './Intro.js'


const Main = ({timeout, article, articleTimeout, players, setPlayers, onCloseArticle, showModal}) => {

  return (
    <div id="main"
      style={timeout ? { display: 'flex' } : { display: 'none' }}
    >
      <Intro article={article} timeout={articleTimeout} onClose={onCloseArticle} />
      
      <Players article={article} timeout={articleTimeout} onClose={onCloseArticle} players={players} setPlayers={setPlayers} showModal={showModal} />

      <GameX01 article={article} timeout={articleTimeout} onClose={onCloseArticle} players={players} x={301} showModal={showModal} />

      <Cricket article={article} timeout={articleTimeout} onClose={onCloseArticle} players={players} showModal={showModal} />

    </div>
  )
}

export default Main
