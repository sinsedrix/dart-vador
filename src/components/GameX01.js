import React, { useCallback, useEffect, useState } from 'react'

const GameX01 = ({article, timeout, onClose, players, x, showModal}) => {
    const points = [25, 20, 19, 18, 17, 16, 15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]
    
    const [hits, setHits] = useState({})
    const [playerIndex, setPlayerIndex] = useState(0)
    const [turnIndex, setTurnIndex] = useState(0)

    const initHits = useCallback(() => {
        players.forEach((ply,i) => 
            setHits(prev => ({...prev, [ply.id]: [0]})))
    }, [players])

    useEffect(initHits, [players])

    const addTurn = () => {
        setTurnIndex(prevt => {
            players.forEach((ply,i) => 
                setHits(prevh => { 
                    var newHits = {...prevh}
                    newHits[ply.id][prevt+1] = 0
                    return newHits
                }))
            return prevt+1
        })
    }

    const resetGame = () => {
        setHits({})
        initHits()
        setPlayerIndex(0)
        setTurnIndex(0)
    }

    const nextPlayer = () => {
        setPlayerIndex(prev => {
            if(prev+1 === players.length) addTurn()
            return (prev+1)%(players.length)
        })
    }

    const addHit = (ply, pt, nb) => {
        setHits(prev => { 
            var newHits = {...prev}
            var newHit = newHits[ply.id][turnIndex] + pt*nb
            if(newHit <= x) newHits[ply.id][turnIndex] = newHit
            if (newHit === x) {
                showModal('info', `${ply.name} wins!`)
            }
            if (newHit > x) {
                showModal('warn', `Too big!`)
            }           
            return newHits
        })
    }

    return (
        <article id="game-x01" className={`${article === 'game-x01' ? 'active' : ''} ${
            timeout ? 'timeout' : ''
        }`}
        style={{ display: 'none' }}>
            <h2>X01</h2>
            <h3>#{turnIndex+1}</h3>
            <table>
                <thead><tr>
                    {players.map((ply, idx) => { 
                        return [
                            <th key={`x01_${ply.id}`}>{ply.name}</th>,
                            idx === playerIndex ?
                                <th key={`nx01_${ply.id}`}>
                                    <button className='action' aria-label="Next player" onClick={nextPlayer}><span className="icon fa-angle-double-right"></span></button>
                                </th> : null
                        ]
                    })}
                </tr></thead>
                <tbody>
                    {[...Array(Math.max(turnIndex+1, points.length))].map((_,i) => {
                        return <tr key={`turn_${i}`}>
                            {players.map((ply, idx) => { 
                                return [ 
                                    i <= turnIndex ? <td key={`hit_${ply.id}_${i}`}>{hits[ply.id] ? hits[ply.id][i] : 0}</td> : <td key={`nohit_${ply.id}_${i}`}></td>,
                                    idx === playerIndex ?
                                        i < points.length ? <td key={`pt_${ply.id}_${i}`}>
                                            <button className='action' onClick={() => addHit(ply, points[i], 1)}>{points[i] === 25 ? <span className='icon fa-bullseye'/> : points[i]}</button>
                                            <button className='action' onClick={() => addHit(ply, points[i], 2)}>x2</button>
                                            {points[i] === 25 ? null : <button className='action' onClick={() => addHit(ply, points[i], 3)}>x3</button>}
                                        </td> : <td key={`npt_${ply.id}_${i}`}></td> : null
                                ]
                            })}
                        </tr>
                    })}
                    <tr key="x01_total">
                        {players.map((ply, idx) => { 
                            return [
                                <th key={`score_${ply.id}`} className="score">{hits[ply.id] ? x - hits[ply.id].reduce((sum, hit) => sum + hit, 0) : x}</th>,
                                idx === playerIndex ? <th key={`nscore_${ply.id}`}></th> : null
                            ]
                        })}
                    </tr>
                </tbody>
            </table>

            <div className="bar">
                <button aria-label="Close" className="icon fa-times" onClick={onClose}></button>
                <button aria-label="Redo" className="icon fa-redo" onClick={()=>{}}></button>
                <button aria-label="Undo" className="icon fa-undo" onClick={()=>{}}></button>
                <button aria-label="Reset game" className="icon fa-refresh" onClick={resetGame}></button>
            </div>
        </article>
    )
}

export default GameX01
