import React from 'react'

const Header = ({timeout, onOpenArticle}) => (
  <header id="header" style={timeout ? { display: 'none' } : {}}>
    <div className="logo">
      <span className="icon fa-bullseye"></span>
    </div>
    <div className="content">
      <div className="inner">
        <h1>Dart Vador</h1>
        <p>
          A dart counter by{' '}
          <a href="https://github.com/sinsedrix">sinsedrix</a> and released
          <br />
          for free under the{' '}
          <a href="https://cecill.info/">CeCILL</a> license.
        </p>
      </div>
    </div>
    <nav>
      <ul>
        <li>
          <button onClick={() => onOpenArticle('intro')}>
            Intro
          </button>
        </li>
        <li>
          <button onClick={() => onOpenArticle('players')}>
            Players
          </button>
        </li>
        <li>
          <button onClick={() => onOpenArticle('game-x01')}>
            X01
          </button>
        </li>
        <li>
          <button onClick={() => onOpenArticle('game-cricket')}>
            Cricket
          </button>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
