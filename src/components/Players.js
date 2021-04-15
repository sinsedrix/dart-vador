import React, { createRef } from 'react'
import _uniqueId from 'lodash/uniqueId';

const Players = ({article, timeout, onClose, players, setPlayers}) => {
    const newPlayer = createRef()
    
    const addPlayer = (player) => {
        setPlayers(prev => [...prev, {
            id: _uniqueId('p-'),
            name: player
        }])
    }

    const removePlayer = (plyId) => {
        setPlayers(prev => {return prev.filter((ply, idx) => ply.id !== plyId)})
    }

    return (
        <article id="players" className={`${article === 'players' ? 'active' : ''} ${
            timeout ? 'timeout' : ''
        }`}
        style={{ display: 'none' }}>
            <h2>Players</h2>
            <table>
                <tbody>
                    {players.map((ply,idx) => {
                        return <tr key={ply.id}>
                            <td>{ply.name}</td>
                            <td>
                                <button className='action' aria-label="Remove player" onClick={() => removePlayer(ply.id)}><span className="icon fa-trash"></span></button>
                            </td>
                        </tr>
                    })}
                    <tr>
                        <td><input type="text" ref={newPlayer}></input></td>
                        <td>
                            <button className='action' aria-label="Add player" onClick={() => addPlayer(newPlayer.current.value)}><span className="icon fa-plus"></span></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="bar">
                <button tabIndex={-1} aria-label="Close" className="icon fa-times" onClick={onClose}></button>
            </div>
        </article>
    )
} 
export default Players
