import React from 'react'
import target01 from '../images/target01.jpg'
import target02 from '../images/target02.jpg'

const Intro = ({article, timeout, onClose}) => {

    return (
        <article id="intro" className={`${article === 'intro' ? 'active' : ''} ${
            timeout ? 'timeout' : ''
          }`}
          style={{ display: 'none' }}>
            <h2 className="major">Intro</h2>
            <span className="image main">
              <img src={target01} alt="" />
            </span>
            <p>
            Need to restore my grand father's target.
            </p>
            <span className="image main">
              <img src={target02} alt="" />
            </span>
            <div className="bar">
                <button aria-label="Close" className="icon fa-times" onClick={onClose}></button>
            </div>
        </article>
    )
}

export default Intro
